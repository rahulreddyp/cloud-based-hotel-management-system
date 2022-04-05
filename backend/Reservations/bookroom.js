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

function bookroom(userData, callback) {
  var rnumber = Number(userData.roomnumber);
  var totalguests = Number(userData.guests);
  var id = randomstring.generate(7);

  var params1 = {
    TableName: "Bookings",
    Item: {
      bookingid: id,
      roomnumber: rnumber,
      guests: totalguests,
      fullname: userData.fullname,
      date: userData.date,
      idnumber: userData.idnumber,
      idname: userData.idname,
      email: userData.user
    },
    // ReturnConsumedCapacity: 'INDEXES'
  };

  docClient.put(params1, function (err, data) {
    if (err) console.log(err);
    else {
      var params2 = {
        TableName: "Rooms",
        Key: {
          roomnumber: rnumber,
        },
        UpdateExpression: "set availability = :a",
        ExpressionAttributeValues: {
          ":a": false,
        },
        ReturnValues: "UPDATED_NEW",
      };

      docClient.update(params2, function (err, data) {
        if (err) {
          console.error(
            "Unable to update item. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } 
      });
    }
    callback(id);
  
  });

}

module.exports.bookroom = bookroom;
