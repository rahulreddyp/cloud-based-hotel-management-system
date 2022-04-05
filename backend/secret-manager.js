const AWS = require("aws-sdk");

// Create a Secrets Manager client
const client = new AWS.SecretsManager({
  region: process.env.SECRET_MANAGER_REGION,
});

exports.storeUserInSecretManager = (data) => {
  var params = {
    Description: "User Token secret created with the CLI",
    Name: process.env.SECRET_NAME,
    SecretString: `{"token":"${data.token}","email":"${data.email}"}`,
  };

  client.createSecret(params, function (err, data) {
    if (err) {
    }
    // console.log(err, err.stack);
    console.log(data);
  });
};

exports.getUserInSecretManager = async () => {
  // Reference: https://stackoverflow.com/questions/57618689/how-do-i-use-aws-secret-manager-with-nodejs-lambda

  const res = await client
    .getSecretValue({
      SecretId: process.env.SECRET_NAME,
    })
    .promise()
    .then((data) => {
      return JSON.parse(data.SecretString);
    });
  return res;
};
