// src/utils/csvUtils.js
import { getDownloadURL } from "firebase/storage";
import Papa from "papaparse";

export const fetchCSV = async (storagePath) => {
  try {
    const url = await getDownloadURL(storagePath);
    const response = await fetch(url);
    const csvText = await response.text();
    const parsedData = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
    });

    if (parsedData.errors.length > 0) {
      throw new Error("Error parsing CSV data");
    }

    return parsedData.data;
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    return null;
  }
};
