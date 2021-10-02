const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/api");
var cors = require("cors");
var fs = require("fs");
const { addAllClient } = require("./controllers/clientController");

try {
  var data = fs.readFileSync("SampleData.txt", "utf8");
  let obj = [];
  let { firstName, lastName, id, phone, ip } = obj;
  let splitted = data.toString().split("\n");
  for (let i = 0; i < splitted.length; i++) {
    let splitLine = splitted[i].split(",");
    fullName = splitLine[0].split(" ");
    console.log(fullName);
    console.log(firstName, lastName, id, phone, ip);
    obj[splitLine[0]] = splitLine[1].trim();
    addAllClient({
      firstName: fullName[0],
      lastName: fullName[1],
      id: splitLine[1],
      ip: splitLine[2],
      phone: splitLine[3].replace(/['"]+/g, ""),
    });
  }
  console.log(obj);
} catch (e) {
  console.log("Error:", e.stack);
}

app.use(bodyParser.json());
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.DB_CONNECT, connectionParams)
  .then(() => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use("/", router);
const PORT = process.env.PORT || 5000;
app.listen(4200, () => {
  console.log(` listening on ${PORT}..`);
});
