import os
import sys
import joblib
import pandas as pd
from pathlib import Path
import importlib.util
from ..registry import register_model

def _load_lr_module():
    lr_path = Path(__file__).parent.parent / "_modeling_lr.py"
    if lr_path.exists():
        spec = importlib.util.spec_from_file_location("_modeling_lr", lr_path)
        lr_module = importlib.util.module_from_spec(spec)
        sys.modules["_modeling_lr"] = lr_module
        spec.loader.exec_module(lr_module)

        main_mod = sys.modules["__main__"]
        for name, val in lr_module,__dict__.items():
            if callable(val) or isinstance(val, type):
                setattr(main_mod, name, val)
        return True
    return False

@register_model('ls')
def predict_ls(input_data):
    text = input_data['text']
    rules = input_data.get('rules', '')

    _load_lr_module()

    model_path = 'E:/Lesson/2568-1/040613702_ML/ML-rulecheck/backend/ml_models/model/lr_rule_violate_model.joblib'

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"LR model not found at {model_path}")

    bundle = joblib.load(model_path)
    model = bundle["pipeline"]
    # FIX THRESHOLD
    threshold = bundle.get("threshold", 0.5)

    # REQ as pandas for pipeline validations
    df = pd.DataFrame({
        "body": [text],
        "rule": [rules],
        "positive_example_1": [""],
        "positive_example_2": [""],
        "negative_example_1": [""],
        "negative_example_2": [""],
        "text_with_negative": [text],
        "text_body_rule": [text]
    })

    prob = model.predict_proba(df)[:, 1][0]
    pred = int(prob >= threshold)

    return {
        'is_compliant': bool(pred == 0),
        'confidence': float(prob) if pred == 1 else float(1 - prob),
        'threshold': threshold,
        'raw_probability': float(prob),
        'prediction': pred,
        'details': ''
    }