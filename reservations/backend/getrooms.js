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
  
  var bed = Number(userData.nofbedrooms)
  console.log(typeof(bed))
  var params = {
    TableName: "rooms",
    IndexName: "bedrooms-index",
    //   ExpressionAttributeValues: {
    //     ":roomnumber": 100,
    // }
    KeyConditionExpression: "bedrooms=:bdrooms and availability=:av",
    // ExpressionAttributeNames: {
    //   "#num":"roomnumber",
    //   // "#brooms":"bedrooms"

    // },
    // FilterExpression: "bedrooms = :bdrooms",
    ExpressionAttributeValues: { 
      ":bdrooms":bed,
      ":av": true
    },
    "ScanIndexForward": false
    
  };

  docClient.query(params, function (err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log("Query succeeded.");
      callback(data);
      //   data.Items.forEach(function (item) {
      //     console.log("ROOMS ", item.roomnumber);
      //   });
    }
  });
}
module.exports.getrooms = getrooms;
