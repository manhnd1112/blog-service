const mongoose = require('mongoose');

const getMongoURI = options => options.uri;

const connect = options => new Promise((resolve, reject) => {
  mongoose.connect(getMongoURI(options), {
    useNewUrlParser: true,
    useCreateIndex: true,
  }, (err) => {
    if (err) {
      reject(err);
    }
    resolve(mongoose.connection);
  });
});

module.exports = { connect };
