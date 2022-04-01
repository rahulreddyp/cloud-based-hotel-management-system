const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: "Rooms",
    FilterExpression: "bedrooms = :bdrooms and maxguests>=:mguests",
    KeyConditionExpression: "bedrooms=:bdrooms and maxguests=:mguests",
    ExpressionAttributeValues: {
      ":bdrooms": 3,
      ":mguests": 2,
    },
  };
  
async function getrooms(req,res){
  try {
   const data = await docClient.scan(params).promise();
  
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
      return finalData;
    
  } catch (err) {
    return err;
  }
}


exports.handler = async (event) => {
    const data = await getrooms();
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!',data.body)
    };
    return response;
};
