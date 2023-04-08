import os
from flask import Flask, request, jsonify
import google.colab
import json
import requests
from pathlib import Path
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for the app

# Replace this with the ID of your Colab notebook
colab_notebook_url  = "https://http://679a-35-236-144-191.ngrok.io/train_best_model"

@app.route('/preprocess-csv')
def process_csv():

    dataset_name = request.args.get('dataset')
    algorithm_name = request.args.get('algorithm')

    # Call the Colab notebook to train the best model
    try:
        colab_output = google.colab.notebook.invoke_function('train_best_model', [dataset_name, algorithm_name])
        best_model = colab_output["result"]
        return jsonify(best_model)
    except Exception as e:
        return jsonify({"error": f"An error occurred while training the model: {str(e)}"})

def initialize_firebase():
    key_path = Path('env/FirebaseKey.json')
    firebase_key_str_path = Path('env/FIREBASE_KEY_STR.txt')

    print("HFOHSAOHSAOFHSAOFHOSAHFOISAHFOASHFOASHFOIHFSOAHFSOh")

    try:
        with open(key_path, 'r') as f:
            jsonData = json.load(f)
        
        firebase_key_str = json.dumps(jsonData)

        print(firebase_key_str)

        with open(firebase_key_str_path, 'w') as f:
            f.write(firebase_key_str)

        print('FIREBASE_KEY_STR.txt file has been saved successfully')

    except Exception as e:
        print(f"An error occurred while initializing Firebase: {str(e)}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 8080))
