require('dotenv').config();
const express = require('express');
const jsonBodyParser = require('body-parser').json();
const cors = require('cors');
const morgan = require('morgan');
const config = require('../config/config');
const firebase = require("firebase/app");


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

firebase.initializeApp(firebaseConfig);


const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault()
})

const app = express();
app.use(morgan('combined')); // prints logs; user agent; verbose logs

app.use(jsonBodyParser);

//setup cors
const corsMod = cors({
  origin: config.clientDomain,
  credentials: true,
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
});

app.use(corsMod);

require('./routes/index')(app);

app.listen(config.port);
console.log(`Server started on port ${config.port}`);
