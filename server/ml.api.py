from flask import Flask, request, jsonify
import pickle
from python.model_storage import load_model_from_firebase

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    # Load the best model from Firebase
    model_name = request.args.get('model_name')
    model = load_model_from_firebase(model_name)

    # Extract the input data from the request
    input_data = request.get_json()

    # Make a prediction using the model
    prediction = model.predict(input_data)

    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 8081))
