const express = require('express');
const authRoutes = require('./routes/auth');
const appRoutes = require("./routes/app");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// environment variable config file
dotenv.config();

const app = express();
// middlwares


/// 2
// data conversion
app.use(bodyParser.json());

// Routings
app.use('/v1/auth', authRoutes);
app.use('/v1/app', appRoutes);



app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`app listening on port ${process.env.PORT}`);
  } else {
    console.log(`There's some issue with server startup, ${error}`);
  }
});
