const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('error', (error) => {
  console.error('Could not connect to DB');
})
