var admin = require("firebase-admin");

var serviceAccount = require("../config/config_firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyDgYMhSObRScWV_AorSbH5VNnHztxEDBw4",
    authDomain: "famous-d549c.firebaseapp.com",
    projectId: "famous-d549c",
    storageBucket: "famous-d549c.appspot.com",
    messagingSenderId: "866195288429",
    appId: "1:866195288429:web:b4093c47da10e8a123aa64",
    measurementId: "G-7CQYW4K66R"
  };

firebase.initializeApp(firebaseConfig);

module.exports = {firebase, admin};