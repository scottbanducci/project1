import { getStorage } from 'firebase/storage';


// Fetch dataset names from firebase storage
export const fetchDatasetNames = async () => {
  const storage = getStorage(firebaseApp);
  const datasetsRef = ref(storage, 'datasets');
  const res = await listAll(datasetsRef);
  const datasetNames = res.items.map((item) => item.name);
  setDatasets(datasetNames);
};
