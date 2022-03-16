let mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");

const connetctToMongo = () => {
  mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }, () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = connetctToMongo;
