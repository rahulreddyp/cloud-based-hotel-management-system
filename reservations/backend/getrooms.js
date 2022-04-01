require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.DynamoDB_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  sessionToken: process.env.SESSION_TOKEN,
});

var docClient = new AWS.DynamoDB.DocumentClient();

function getrooms(userData,  callback ) {

  var bed = Number(userData.nofbedrooms);
  var guests = Number(userData.guests);
  var params = {
    TableName: "Rooms",
    FilterExpression: "bedrooms = :bdrooms and maxguests>=:mguests",
    KeyConditionExpression: "bedrooms=:bdrooms and maxguests=:mguests",
    ExpressionAttributeValues: {
      ":bdrooms": bed,
      ":mguests": guests,
    },
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log("Query succeeded.");
      var finalData = [];
      for (let j = 0; j < data.Items.length; j++) {
          var eachdata = {};
        if(data.Items[j].availability === true){
          eachdata.roomnumber = data.Items[j].roomnumber;
          eachdata.bedrooms = data.Items[j].bedrooms;
          eachdata.maximumguests = data.Items[j].maxguests;
          eachdata.price = data.Items[j].price;
          finalData.push(eachdata);
        }
      }

      callback(finalData);
    }
  });

}
module.exports.getrooms = getrooms;
