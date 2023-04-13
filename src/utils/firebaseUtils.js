import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import  firebaseApp  from './firebase.js';


// Fetch dataset names from firebase storage
export const fetchDatasetNames = async () => {
  const storage = getStorage(firebaseApp);
  const datasetsRef = ref(storage, 'datasets');
  const res = await listAll(datasetsRef);
  const datasetNames = res.items.map((item) => item.name);
  return datasetNames; // Return the dataset names directly
};

// Fetch model names from firebase storage
export const fetchModelNames = async () => {
  const storage = getStorage(firebaseApp);
  const modelsRef = ref(storage, "models");
  const res = await listAll(modelsRef);
  const modelNames = res.items.map((item) => item.name.slice(0, -4)); // Remove the '.pkl' extension
  return modelNames;
};

export const downloadDatasetCSV = async (datasetName) => {
  const storage = getStorage(firebaseApp);
  const datasetRef = ref(storage, `${datasetName}.csv`);

  try {
    const url = await getDownloadURL(datasetRef);
    const response = await fetch(url);
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error downloading CSV file:', error);
    return null;
  }
};
