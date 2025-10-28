#!/usr/bin/env python3
# ml_models/bert_model.py

import sys
import json
import torch
from transformers import BertTokenizer, BertForSequenceClassification

def load_model():
    """Load pre-trained BERT model"""
    model_path = "path/to/your/trained/bert/model"
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertForSequenceClassification.from_pretrained(model_path)
    model.eval()
    return tokenizer, model

def predict_compliance(text, rules, tokenizer, model):
    """
    Predict if text complies with given rules
    
    Args:
        text: Input text to check
        rules: Rules to check compliance against
        
    Returns:
        dict: {
            'is_compliant': bool,
            'confidence': float,
            'violations': list,
            'details': dict
        }
    """
    # Combine text and rules for context
    combined_input = f"Rules: {rules}\n\nText: {text}"
    
    # Tokenize
    inputs = tokenizer(
        combined_input,
        return_tensors="pt",
        truncation=True,
        max_length=512,
        padding=True
    )