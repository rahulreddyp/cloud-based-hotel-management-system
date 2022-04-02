require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.DynamoDB_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  sessionToken: process.env.SESSION_TOKEN,
});

var docClient = new AWS.DynamoDB.DocumentClient();

function getrooms(userData, callback) {

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
      // console.log(data.Items.length);
      // var availflag = true;

      // var d1 = userData.fromdate.split("-");
      // var d2 = userData.todate.split("-");
      // var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);
      // var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);

      var finalData = [];
      for (let j = 0; j < data.Items.length; j++) {
      //   availflag = true;

        // for (let i = 0; i < data.Items[j].length; i++) {
          var eachdata = {};
      //     var c = data.Items[j].bookings[i].fromdate.split("-");
      //     var c1 = data.Items[j].bookings[i].todate.split("-");

      //     var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);
      //     var check1 = new Date(c1[0], parseInt(c1[1]) - 1, c1[2]);

      //     if (
      //       (check <= from && check1 >= to) ||
      //       (from >= check && from <= check1) ||
      //       (to >= check && to <= check1)
      //     ) {
      //       availflag = false;
      //     }
      //   }
      //   if (availflag == true) {
        if(data.Items[j].availability === true){
          eachdata.roomnumber = data.Items[j].roomnumber;
          eachdata.bedrooms = data.Items[j].bedrooms;
          eachdata.maximumguests = data.Items[j].maxguests;
          eachdata.price = data.Items[j].price;
          finalData.push(eachdata);
        }
        // }
      }

      callback(finalData);
    }
  });

}
module.exports.getrooms = getrooms;
