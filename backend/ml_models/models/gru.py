
from ..registry import register_model

@register_model('gru')
def predict_gru(input_data):
    """Predict using the GRU model."""
    print("Warning: GRU model is a placeholder.")
    text = input_data['text']
    is_compliant = 'rule' in text.lower()
    confidence = 0.78
    return {
        'is_compliant': is_compliant,
        'confidence': confidence,
        'details': 'Prediction from GRU model (placeholder)'
    }
