import os
import json
import numpy as np
from scipy.special import expit as sigmoid
from ..registry import register_model

@register_model('bert')
def predict_bert(input_data):
    try:
        import torch
        from transformers import AutoTokenizer, AutoModelForSequenceClassification
    except ImportError:
        raise ImportError("Please install torch and transformers: pip install torch transformers")
    
    text = input_data['text']
    rules = input_data.get('rules', '')
    
    model_dir = 'E:/Lesson/2568-1/040613702_ML/ML-rulecheck/backend/ml_models/model/bert_model_rule_violation'
    calib_path = os.path.join(model_dir, 'calibration_meta.json')
    
    if not os.path.exists(calib_path):
        raise FileNotFoundError(f"BERT model not found at {model_dir}")
    
    with open(calib_path, 'r') as f:
        meta = json.load(f)
    
    temperature = meta.get('temperature', 1.0)
    threshold = meta.get('threshold', 0.5)
    max_len = meta.get('max_len', 512)
    
    tokenizer = AutoTokenizer.from_pretrained(model_dir, use_fast=False)
    model = AutoModelForSequenceClassification.from_pretrained(model_dir)
    model.eval()
    
    combined = f"{text} [SEP] [RULE] {rules}"
    
    inputs = tokenizer(
        combined,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=max_len
    )
    
    with torch.no_grad():
        logits = model(**inputs).logits
        
        if logits.shape[1] == 2:
            logit = (logits[:, 1] - logits[:, 0]).item()
        else:
            logit = logits.squeeze().item()
    
    prob = float(sigmoid(logit / temperature))
    pred = int(prob >= threshold)
    
    return {
        'is_compliant': bool(pred == 0),
        'confidence': float(prob) if pred == 1 else float(1 - prob),
        'threshold': threshold,
        'temperature': temperature,
        'raw_logit': float(logit),
        'raw_probability': float(prob),
        'prediction': pred,
        'details': ''
    }