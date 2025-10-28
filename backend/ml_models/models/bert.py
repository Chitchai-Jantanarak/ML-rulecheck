
import os
import json
from ..registry import register_model

@register_model('bert')
def predict_bert(input_data):
    """Predict using the BERT model."""
    try:
        import torch
        from transformers import BertTokenizer, BertForSequenceClassification
    except ImportError:
        raise ImportError("Please install torch and transformers: pip install torch transformers")

    text = input_data['text']
    rules = input_data['rules']
    
    model_path = '/rails/ml_models/bert_model.bin'
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}. Make sure the model was merged correctly.")

    # This is a simplified example. You need to adapt this to your actual model's logic.
    # For a real scenario, you would load the model and tokenizer and perform inference.
    # tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    # model = BertForSequenceClassification.from_pretrained(model_path)
    # model.eval()
    
    # Dummy prediction logic
    is_compliant = "not compliant" not in text.lower()
    confidence = 0.85 if is_compliant else 0.60
    
    return {
        'is_compliant': is_compliant,
        'confidence': confidence,
        'details': 'Prediction from BERT model (dummy)'
    }
