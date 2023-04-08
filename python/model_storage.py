import pickle
import firebase_admin
from firebase_admin import credentials, storage, firestore

# The path to your Firebase service account key file
cred = credentials.Certificate('env\FirebaseKey.json')

# Initialize the Firebase Admin SDK
firebase_admin.initialize_app(cred, {
    'storageBucket': 'gs://ml-website-5ae7a.appspot.com'
})


def save_model_to_firebase(model, model_name):
    serialized_model = pickle.dumps(model)

    bucket = storage.bucket()
    blob = bucket.blob(f'models/{model_name}.pkl')
    blob.upload_from_string(serialized_model, content_type='application/octet-stream')


def load_model_from_firebase(model_name):
    bucket = storage.bucket()
    blob = bucket.blob(f'models/{model_name}.pkl')
    serialized_model = blob.download_as_text()

    model = pickle.loads(serialized_model)
    return model

def read_model_counter(model_type):
    db = firestore.client()
    counter_ref = db.collection('model_counters').document(model_type)
    counter_doc = counter_ref.get()
    if counter_doc.exists:
        return counter_doc.to_dict()['count']
    else:
        counter_ref.set({'count': 0})
        return 0


def update_model_counter(model_type):
    db = firestore.client()
    counter_ref = db.collection('model_counters').document(model_type)
    counter = read_model_counter(model_type)
    counter_ref.update({'count': counter + 1})
