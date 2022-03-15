const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");
const getrooms = require("./getrooms");
const app = express();

// Middlewares

app.use(bodyParser.json());

app.use(cors());

app.post("/fetchdata", async (req, res) => {
  if (!req.body) {
    console.log("Error, no JSON body");

    return res.status(422).json({
      error: "Failed to fetch JSON body",
    });
  } else {
    getrooms.getrooms(req.body, function (result) {
      console.log(result);
      return res.status(200).json({
        message: "success",
      });
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
