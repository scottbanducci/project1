from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from algorithm_selection import get_algorithms
from parameter_grids import param_grids

def optimize_hyperparameters(model_name, X_train, y_train, search_method="grid", cv=5, n_iter=None, n_jobs=-1):
    model = get_algorithms(model_name)
    param_grid = param_grids[model_name]
    
    if search_method == "grid":
        search = GridSearchCV(model, param_grid, cv=cv, n_jobs=n_jobs)
    elif search_method == "random":
        if n_iter is None:
            raise ValueError("n_iter must be provided for random search.")
        search = RandomizedSearchCV(model, param_grid, n_iter=n_iter, cv=cv, n_jobs=n_jobs)
    else:
        raise ValueError("Invalid search method. Search method must be 'grid' or 'random'.")

    search.fit(X_train, y_train)
    best_estimator = search.best_estimator_

    return best_estimator
