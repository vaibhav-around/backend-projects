const express = require('express');
const { hitLog } = require('./utils/serverHit');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// environment variable config file
dotenv.config();

const app = express();
// middlwares

//// 1
app.use(hitLog);

/// 2
// data conversion
app.use(bodyParser.json());

// Routings
app.use('', userRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`app listening on port ${process.env.PORT}`);
  } else {
    console.log(`There's some issue with server startup, ${error}`);
  }
});
