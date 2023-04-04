from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.svm import SVC, SVR



def get_algorithms(task):
    """
    Get appropriate machine learning algorithms for the given task.
    :param task: str, either "classification" or "regression"
    :return: list of algorithms
    """
    if task == "classification":
        algorithms = [
            LogisticRegression(),
            DecisionTreeClassifier(),
            RandomForestClassifier(),
            KNeighborsClassifier(),
            SVC(),
        ]
    elif task == "regression":
        algorithms = [
            LinearRegression(),
            DecisionTreeRegressor(),
            RandomForestRegressor(),
            KNeighborsRegressor(),
            SVR(),
        ]
    else:
        raise ValueError("Invalid task. Task must be 'classification' or 'regression'.")

    return algorithms
