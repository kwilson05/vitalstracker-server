require('dotenv').config();
const express = require('express');
const jsonBodyParser = require('body-parser').json();
const cors = require('cors');
const morgan = require('morgan');
const config = require('../config/config');

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
