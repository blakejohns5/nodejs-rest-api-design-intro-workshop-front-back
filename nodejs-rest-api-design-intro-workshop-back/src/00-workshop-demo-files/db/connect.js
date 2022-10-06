const mongoose = require("mongoose");

function connect() {
  return mongoose.connect("mongodb://localhost:27017/workshop-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

module.exports = connect;
