import sys
import json

# Import models to register them
from .models import bert, gru, ls
from .registry import MODEL_REGISTRY

def main():
    if len(sys.argv) != 4:
        print("Usage: python3 dispatcher.py <model_name> <input_file> <output_file>")
        sys.exit(1)

    model_name = sys.argv[1]
    input_path = sys.argv[2]
    output_path = sys.argv[3]

    try:
        with open(input_path, 'r') as f:
            input_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error reading input file: {e}")
        sys.exit(1)

    predictor = MODEL_REGISTRY.get(model_name)

    if not predictor:
        print(f"Unknown model: {model_name}")
        sys.exit(1)

    try:
        result = predictor(input_data)
        with open(output_path, 'w') as f:
            json.dump(result, f)
    except Exception as e:
        # Create an error output file for Rails to read
        error_result = {'error': str(e)}
        with open(output_path, 'w') as f:
            json.dump(error_result, f)
        # Exit with a non-zero status to indicate failure
        sys.exit(1)

if __name__ == '__main__':
    main()