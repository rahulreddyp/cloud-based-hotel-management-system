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

function housekeeping(userData, callback) {
    var housekeeper = randomstring.generate(3);
    var params = {
        TableName: "HouseKeeping",
        Item: {
        housekeeper: housekeeper,
          Bookingid: userData.bookingid,
          time: userData.time,
        },
      };
      docClient.put(params, function (err, data) {
        if (err){
            console.log(err);
            callback(data)
        } 
        else {
            callback(data);
        }
      });

}

module.exports.housekeeping = housekeeping;
