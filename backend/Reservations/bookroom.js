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
  console.log("userdata-----------", userData);
  var rnumber = Number(userData.roomnumber);
  var totalguests = Number(userData.guests);
  var id = Number(randomstring.generate(7));
  console.log(typeof randomstring.generate(7));

  var params1 = {
    TableName: "Bookings",
    Item: {
      bookingid: randomstring.generate(7),
      roomnumber: rnumber,
      guests: totalguests,
      fullname: userData.fullname,
      date: userData.date,
    },
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
        } else {
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
      });

      console.log(data);
    }
  });

  // var bid = randomstring.generate(7)
  // var params1 = {
  //   TableName: "rooms",
  //   Key:{"roomnumber":rnumber},
  //   UpdateExpression: "set bookings.bookingid = :b",
  //   // bookings.guests = :g, bookings.fromdate=:f, bookings.todate =:to, bookings.fullname=:name",
  //   ExpressionAttributeValues:{
  //     ":b":bid
  //     // ":g":userData.guests,
  //     // ":f":userData.fromdate,
  //     // ":to":userData.todate,
  //     // ":name":userData.fullname
  //   },
  //   ReturnValues:"UPDATED_NEW"
  //   // Item: {
  //   //   roomnumber: rnumber,
  //   //   bookings: [
  //   //     {
  //   //       bookingid: randomstring.generate(7),
  //   //       guests: userData.guests,
  //   //       fromdate: userData.fromdate,
  //   //       todate: userData.todate,
  //   //       fullname: userData.fullname
  //   //     },
  //   //   ],
  //   // },
  // };

  // docClient.update(params1, function (err, data) {
  //   if (err) console.log(err);
  //   else {
  //     console.log("Data stored in dynamodb successfully")
  callback("data");
  //   }
  // });
}

module.exports.bookroom = bookroom;
