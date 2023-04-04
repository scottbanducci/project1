from sklearn.metrics import accuracy_score, f1_score, mean_squared_error
from sklearn.model_selection import train_test_split

def evaluate_models(models, X, y, task, metric='accuracy', test_size=0.2, random_state=42):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)
    
    best_score = -1
    best_model = None

    for model in models:
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)

        if task == 'classification':
            if metric == 'accuracy':
                score = accuracy_score(y_test, y_pred)
            elif metric == 'f1':
                score = f1_score(y_test, y_pred, average='weighted')
            else:
                raise ValueError("Invalid metric for classification. Choose 'accuracy' or 'f1'.")
        elif task == 'regression':
            if metric == 'mse':
                score = -mean_squared_error(y_test, y_pred)
            else:
                raise ValueError("Invalid metric for regression. Choose 'mse'.")
        else:
            raise ValueError("Invalid task. Task must be 'classification' or 'regression'.")

        if score > best_score:
            best_score = score
            best_model = model

    return best_model
