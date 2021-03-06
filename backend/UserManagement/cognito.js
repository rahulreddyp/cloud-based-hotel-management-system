require("dotenv").config();

const AWS = require("aws-sdk");
const jwt_decode = require('jwt-decode');

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

AWS.config.update({
  region: process.env.AWS_COGNITO_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  sessionToken: process.env.SESSION_TOKEN,
});

AWS.config.apiVersions = {
  AmazonCognitoIdentity: "2014-06-30",
};

const poolData = {
  UserPoolId: process.env.AWS_COGNITO_USERPOOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID,
};

const attributes = (key, value) => {
  return {
    Name: key,
    Value: value,
  };
};

// AWS Cognito SDK Reference: https://www.npmjs.com/package/amazon-cognito-identity-js
exports.registerUser = async (data) => {
  return new Promise((resolve, reject) => {
    let attributeList = [];
    let cognitoAttributeList = [];

    attributeList.push(attributes("email", data.email));
    attributeList.push(attributes("phone_number", data.phone));
    // attributeList.push(attributes("name", name));

    attributeList.forEach((element) => {
      cognitoAttributeList.push(
        new AmazonCognitoIdentity.CognitoUserAttribute(element)
      );
    });

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    console.log(data.password);

    userPool.signUp(
      data.email,
      data.password,
      cognitoAttributeList,
      null,
      (err, result) => {
        if (err) {
          if(err.name == "InvalidPasswordException")  {
          
          return resolve({
            statusCode: 400,
            error: err,
            message: "Password must contain only numbers, special Characters, lowercase and upper case letters "  
          });
          }
          return resolve({
            statusCode: 400,
            error: err,
            message: "Error Occurred!"  
          });
        }

        const resp = {
          username: result.user.username,
          userConfirmed: result.userConfirmed,
          userAgent: result.user.client.userAgent,
        };

        resolve({
          statusCode: 200,
          response: resp,
          message: "User successfully registered! Please confirm your email",
        });
      }
    );
  });
};

exports.signInUser = async (data) => {
  return new Promise((resolve) => {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
      Username: data.email,
      Pool: userPool,
    };

    const authDetails = {
      Username: data.email,
      Password: data.password,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(
      new AmazonCognitoIdentity.AuthenticationDetails(authDetails),
      {
        onSuccess: (result) => {
          const token = {
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          };
          return resolve({ statusCode: 200, response: decodeToken(token) });
        },

        onFailure: (err) => {
          return resolve({
            statusCode: 422,
            error: err.message || JSON.stringify(err),
          });
        },
      }
    );
  });
};

const decodeToken = (token) => {
  const { email, exp, auth_time, token_use, sub } = jwt_decode(token.idToken);
  return { token, email, exp, uid: sub, auth_time, token_use };
};
