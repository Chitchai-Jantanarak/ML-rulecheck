
MODEL_REGISTRY = {}

def register_model(name):
    """A decorator to register a new model predictor."""
    def decorator(fn):
        if name in MODEL_REGISTRY:
            raise ValueError(f"Model '{name}' is already registered.")
        MODEL_REGISTRY[name] = fn
        return fn
    return decorator
