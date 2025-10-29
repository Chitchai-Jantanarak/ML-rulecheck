import os
import joblib
import numpy as np
from scipy.special import expit as sigmoid
from ..registry import register_model

@register_model('gru')
def predict_gru(input_data):
    try:
        import tensorflow as tf
    except ImportError:
        raise ImportError("DO INSTALL `TENSEORFLOW`")
    
    text = input_data['text']
    rules = input_data.get('rules', '')

    model_dir = 'E:/Lesson/2568-1/040613702_ML/ML-rulecheck/backend/ml_models/model/keras_gru_logit_rule_violation'
    meta_path = 'E:/Lesson/2568-1/040613702_ML/ML-rulecheck/backend/ml_models/model/keras_textcnn_meta.joblib'

    if not os.path.exists(model_dir):
        raise FileNotFoundError(f"GRU model not found at {model_dir}")
    if not os.path.exists(meta_path):
        raise FileNotFoundError(f"GRU metadata not found at {meta_path}")

    model = tf.saved_model.load(model_dir)
    meta = joblib.load(meta_path)

    temp = meta.get("temperature", 1.0)
    threshold = meta.get("threshold", 0.5)

    model_fn = model.signatures["serving_default"]

    inputs = {
        "body": tf.constant([text]),
        "ctx": tf.constant([f"[RULE] {rules}"])
    }
    
    outputs = model_fn(**inputs)
    
    output_key = list(outputs.keys())[0]
    logit = outputs[output_key].numpy().ravel()[0]
    
    prob = float(sigmoid(logit / temp))
    pred = int(prob >= threshold)
    
    return {
        'is_compliant': bool(pred == 0),  # 0 = compliant, 1 = violation
        'confidence': float(prob) if pred == 1 else float(1 - prob),
        'threshold': threshold,
        'temperature': temp,
        'raw_logit': float(logit),
        'raw_probability': float(prob),
        'prediction': pred,
        'details': ''
    }