require("dotenv").config();
const connetctToMongo = require("./db_connect");
const express = require("express");
const cors = require("cors");
const path = require("path");
connetctToMongo();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));

// Step 2 - Heroku
const port = process.env.PORT || 5000;

// ------- Deployment --------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("App is Under Maintenance, please try after some time!");
  });
}
// ------- Deployment --------------

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
