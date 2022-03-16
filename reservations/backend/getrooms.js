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

function getrooms(userData, callback) {
  console.log(userData);
  var bed = Number(userData.nofbedrooms);
  var guests = Number(userData.guests);
  var bookingid = randomstring.generate(7);
  var params = {
    TableName: "rooms",
    FilterExpression: "bedrooms = :bdrooms and maximumguests>=:mguests",
    KeyConditionExpression: "bedrooms=:bdrooms and maximumguests=:mguests",
    ExpressionAttributeValues: {
      ":bdrooms": bed,
      ":mguests": guests,
    },
  };

  // var params1 = {
  //   TableName: "rooms",
  //   Item: {
  //     roomnumber: 101,
  //     bedrooms: 1,
  //     maximumguests: 6,
  //     bookings: [{
  //       bookingid: randomstring.generate(7),
  //       guests: 1,
  //       fromdate: "2022-02-10",
  //       todate: "2022-02-15",
  //     },
  //     {
  //       bookingid: randomstring.generate(7),
  //       guests: 1,
  //       fromdate: "2022-03-10",
  //       todate: "2022-03-20",
  //     }],

  //   },

  // };
  docClient.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log("Query succeeded.");
      var availflag = true;
      console.log(userData)

      var d1 = userData.fromdate.split("-");
      var d2 = userData.todate.split("-");
      var from = new Date(d1[0],parseInt(d1[1]) - 1,d1[2]);
      var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
      

      for (let j = 0; j < data.Items.length; j++) {
        availflag = true;
        for (let i = 0; i < data.Items[0].bookings.length; i++) {

          var c = data.Items[j].bookings[i].fromdate.split("-");
          var c1 = data.Items[j].bookings[i].todate.split("-");

          var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);
          var check1 = new Date(c1[0], parseInt(c1[1]) - 1, c1[2]);


          if (
            (check <= from && check1 >= to) ||
            (from >= check && from <= check1) ||
            (to >= check && to <= check1)
          ) {
            availflag = false;
          }
            
        }
        if(availflag == true){
          console.log(data.Items[j].roomnumber);
        }
      }
   
      callback(data);
     
    }
  });

  // docClient.put(params1, function (err, data) {
  //   if (err) console.log(err);
  //   else console.log(data);
  // });
}
module.exports.getrooms = getrooms;
