
from ..registry import register_model

@register_model('ls')
def predict_ls(input_data):
    """Predict using the Logistic Regression model."""
    print("Warning: Logistic Regression model is a placeholder.")
    text = input_data['text']
    is_compliant = len(text) % 2 == 0
    confidence = 0.90
    return {
        'is_compliant': is_compliant,
        'confidence': confidence,
        'details': 'Prediction from Logistic Regression model (placeholder)'
    }
