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

function bookinghistory(userData, callback) {
    console.log(userData);
    var params = {
        TableName: "Bookings",
        FilterExpression: "email = :useremail",
        
        ExpressionAttributeValues: {
             ":useremail": "bommera@gmail.com"
        }
        
    }
    // docClient.scan(params, function(err,data){
    //     if (err) {
    //         console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    //     callback(err)

    //     } else {
    //         callback(data);

    //     }
    // });
    

}

module.exports.bookinghistory = bookinghistory;
