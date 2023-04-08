// src/init_firebase.js

const keyPath = 'env/FirebaseKey.json';
const firebaseKeyStrPath = 'env/FIREBASE_KEY_STR.txt';

console.log("HFOHSAOHSAOFHSAOFHOSAHFOISAHFOASHFOASHFOIHFSOAHFSOh");

fetch(keyPath)
  .then(response => response.json())
  .then(jsonData => {
    const firebaseKeyStr = JSON.stringify(jsonData);
    console.log(firebaseKeyStr);
    return fetch(firebaseKeyStrPath, {
      method: 'PUT',
      body: firebaseKeyStr,
    });
  })
  .then(() => console.log('FIREBASE_KEY_STR.txt file has been saved successfully'))
  .catch(err => console.error(err));
