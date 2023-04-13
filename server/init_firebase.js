// server/init_firebase.js

const { join } = require('path');
const jsonfile = require('jsonfile');

const keyPath = join(__dirname, 'env', 'FirebaseKey.json');
const firebaseKeyStrPath = join(__dirname, 'env', 'FIREBASE_KEY_STR.txt');

console.log("HFOHSAOHSAOFHSAOFHOSAHFOISAHFOASHFOASHFOIHFSOAHFSOh");

jsonfile.readFile(keyPath)
  .then(jsonData => {
    const firebaseKeyStr = JSON.stringify(jsonData);
    console.log(firebaseKeyStr);
    return jsonfile.writeFile(firebaseKeyStrPath, firebaseKeyStr);
  })
  .then(() => console.log('FIREBASE_KEY_STR.txt file has been saved successfully'))
  .catch(err => console.error(err));
