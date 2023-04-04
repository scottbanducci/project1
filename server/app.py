import os
import pandas as pd
from flask import Flask, request, send_file
from preprocessing import preprocess_data
from python.feature_engineering import automate_feature_engineering
from python.task_detection import determine_task
from python.algorithm_selection import get_algorithms
from python.model_evaluation import evaluate_models
from python.hyperparameter_optimization import optimize_hyperparameters
from sklearn.model_selection import train_test_split

app = Flask(__name__)

@app.route('/preprocess-csv')
def preprocess_csv():
    dataset_name = request.args.get('dataset')
    algorithm_name = request.args.get('algorithm')
    dataset_file = f'datasets/{dataset_name}.csv'
    
    # Preprocess the data
    preprocessed_data, target_column = preprocess_data(dataset_file)
    
    # Apply the feature engineering function
    preprocessed_data_with_features = automate_feature_engineering(preprocessed_data)
    
    # Determine the task
    task = determine_task(preprocessed_data, target_column)
    print(f"The problem is a {task} task.")

    # Select the appropriate algorithms
    algorithms = get_algorithms(task)

    # Find the selected algorithm object by its name
    selected_algorithm = None
    for algo in algorithms:
        if algo.__class__.__name__ == algorithm_name:
            selected_algorithm = algo
            break

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(preprocessed_data_with_features, target_column, test_size=0.2, random_state=42)

    # Optimize hyperparameters
    trained_models = []
    for algorithm in algorithms:
        optimized_model = optimize_hyperparameters(algorithm.__class__.__name__, X_train, y_train)
        trained_models.append(optimized_model)

    # Evaluate the models
    best_model = evaluate_models(trained_models, X_train, y_train, task)

    # Perform any further steps as needed, such as sending the results back to the frontend

    return best_model

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 8080))
