import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer


def load_dataset(file_path):
    df = pd.read_csv(file_path)
    return df

def preprocess_data(df):
    # Identify numerical and categorical columns
    numeric_columns = df.select_dtypes(include=['int64', 'float64']).columns
    categorical_columns = df.select_dtypes(include=['object', 'category']).columns

    # Create transformers for handling missing values, scaling, and encoding
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])

    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
        ('encoder', OneHotEncoder(handle_unknown='ignore'))
    ])

    # Combine transformers using ColumnTransformer
    preprocessor = ColumnTransformer(transformers=[
        ('num', numeric_transformer, numeric_columns),
        ('cat', categorical_transformer, categorical_columns)
    ])

    # Fit and transform the dataset
    df_preprocessed = pd.DataFrame(preprocessor.fit_transform(df))
    
    # Restore column names after transformation
    new_columns = preprocessor.transformers_[0][-1] + list(preprocessor.named_transformers_['cat'].named_steps['encoder'].get_feature_names_out(categorical_columns))
    df_preprocessed.columns = new_columns

    return df_preprocessed

if __name__ == "__main__":
    file_path = 'your_dataset.csv'
    df = load_dataset(file_path)
    df_preprocessed = preprocess_data(df)
    print(df_preprocessed.head())
