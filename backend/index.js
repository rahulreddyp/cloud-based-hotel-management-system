const express = require("express");

const bodyParser = require("body-parser");

const Cognito = require("./UserManagement/cognito");
const SM = require("./secret-manager");
const getrooms = require("./Reservations/getrooms");
const bookroom = require("./Reservations/bookroom");
const bookfood = require("./OrderFood/bookfood");
const confirmorder = require("./OrderFood/confirmorder");
const housekeeping = require("./HouseKeeping/housekeeping");
const bookinghistory = require("./BookingHistory/bookinghistory");
const cors = require("cors");
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  if (!req.body) {
    console.log("Error, no JSON body");
    return res.status(422).json({
      error: "Failed to fetch JSON body",
    });
  } else {
    const response = await Cognito.registerUser(req.body);
    return res.status(response.statusCode).json(response);
  }
});

app.post("/signin", async (req, res) => {
  if (!req.body) {
    console.log("Error, no JSON body");
    return res.status(422).json({
      error: "Failed to fetch JSON body",
    });
  } else {
    const result = await Cognito.signInUser(req.body);

    if(result.response) {
      SM.storeUserInSecretManager(result.response);
    }

    // localStorage.setItem("user", result.response);
    // res.cookie('token', result.response.token.idToken, result.response.exp);
    return res.status(result.statusCode).json(result);
  }
});

app.post("/fetchdata", async (req, res) => {
  if (!req.body) {
    console.log("Error, no JSON body");

    return res.status(422).json({
      error: "Failed to fetch JSON body",
    });
  } else {
    getrooms.getrooms(req.body, function (result) {
      res.status(200).json({
        message: "success",
        body: result,
      });
      return res;
    });
  }
});

app.get("/getuser", async (req, res) => {
  SM.getUserInSecretManager()
    .then((user) => {
      return res.status(200).json({user
      });
    })
    .catch((err) => {
      return res.status(422).json({
        error: "Failed to fetch JSON body",
        err,
      });
    });
});

app.post("/bookroom", async (req, res) => {
  if (!req.body) {
    console.log("Error, no JSON body");

    return res.status(422).json({
      error: "Failed to fetch JSON body",
    });
  } else {
    bookroom.bookroom(req.body, function (result) {
      return res.status(200).json({
        message: "success",
        body: result,
      });
    });
  }
});

app.post("/confirmorder", async (req, res) => {
  if (!req.body) {
    console.log("Error, no JSON body");

    return res.status(422).json({
      error: "Failed to fetch JSON body",
    });
  } else {
    confirmorder.confirmorder(req.body, function (result) {
      return res.status(200).json({
        message: "success",
        body: result,
      });
    });
  }
});

app.post("/housekeeping", async (req, res) => {
  if (!req.body) {
    console.log("Error, no JSON body");

    return res.status(422).json({
      error: "Failed to fetch JSON body",
    });
  } else {
    housekeeping.housekeeping(req.body, function (result) {
      return res.status(200).json({
        message: "success",
        body: result,
      });
    });
  }
});

app.get("/bookfood", (req, res) => {
  if (!req.body) {
    console.log("Error, no JSON body");

    res.status(422).json({
      error: "Failed to fetch JSON body",
    });
  } else {
    bookfood.bookfood(req.body, function (result) {
      res.status(200).json({
        body: result,
      });
    });
  }
  return res;
});

app.get("/bookinghistory", (req, res) => {
  if (!req.body) {
    console.log("Error, no JSON body");

    res.status(422).json({
      error: "Failed to fetch JSON body",
    });
  } else {
    bookinghistory.bookinghistory(req.body, function (result) {
      res.status(200).json({
        body: result,
      });
    });
  }
  return res;
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
