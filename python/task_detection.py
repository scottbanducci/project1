import pandas as pd

def determine_task(df, target_column):
    target = df[target_column]
    
    # Check if the target variable is binary or has a limited number of unique values
    unique_values = target.nunique()
    
    if unique_values <= 20:  # Threshold for unique values
        return "classification"
    else:
        return "regression"
