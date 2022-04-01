const express = require("express");

const bodyParser = require("body-parser");

const Cognito = require("./UserManagement/cognito");
const getrooms = require("./Reservations/getrooms");
const bookroom = require("./Reservations/bookroom");

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

app.post("/login", async (req, res) => {
    if (!req.body) {
      console.log("Error, no JSON body");
      return res.status(422).json({
        error: "Failed to fetch JSON body",
      });
    } else {
       
      const result = await Cognito.signInUser(req.body);   
      console.log(result); 
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
  })

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
