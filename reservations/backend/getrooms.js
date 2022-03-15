require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.DynamoDB_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  sessionToken: process.env.SESSION_TOKEN
});

var docClient = new AWS.DynamoDB.DocumentClient();

function getrooms(userData, callback) {
  var params = {
    TableName: "rooms",
    //   ExpressionAttributeValues: {
    //     ":roomnumber": 100,
    // }
    KeyConditionExpression: "roomnumber=:rno",
    ExpressionAttributeValues: {
      ":rno": 100,
    },
  };

  docClient.query(params, function (err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log("Query succeeded.");
      //   cancelIdleCallback data;
      callback(data);
      //   data.Items.forEach(function (item) {
      //     console.log("ROOMS ", item.roomnumber);
      //   });
    }
  });
}
module.exports.getrooms = getrooms;
