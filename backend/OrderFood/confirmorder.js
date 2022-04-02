require("dotenv").config();
const AWS = require("aws-sdk");
var randomstring = require("randomstring");

AWS.config.update({
  region: process.env.DynamoDB_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  sessionToken: process.env.SESSION_TOKEN,
});

var docClient = new AWS.DynamoDB.DocumentClient();

function confirmorder(userData, callback) {
  var params = {
    TableName: "Orders",
    Item: {
      BookingId: userData.bookingid,
      orderdetails: userData.orders,
    },
  };
  docClient.put(params, function (err, data) {
    if (err) console.log(err);
    else {
      //   callback(userData);
    }
    callback(userData);
  });
}

module.exports.confirmorder = confirmorder;
