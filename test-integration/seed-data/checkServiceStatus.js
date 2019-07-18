require('dotenv');
const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

const dynamodb = new AWS.DynamoDB({
  endpoint: process.env.DYNAMODB_ENDPOINT,
  maxRetries: 1, // forces DynamoDB to return straight away upon error instead of retrying multiple times
});

const TIMEOUT = 2000; // 2 seconds

const callAndLog = async (serviceToCall, serviceName) => {
  try {
    await serviceToCall();
    console.log(`--> up   ${serviceName}`);
    return true;
  } catch (e) {
    console.log(`--> down ${serviceName} - ${e}`);
    return false;
  }
};

const pingDynamoDBService = () => dynamodb.listTables().promise();

const pingServices = async () => {
  try {
    const checks = await Promise.all([
      callAndLog(pingDynamoDBService, 'DynamoDB'),
    ]);
    return !checks.some(r => r === false);
  } catch (e) {
    console.log(`Error checking the services - ${e}`);
    return false;
  }
};

const delay = () => new Promise(resolve => setTimeout(resolve, TIMEOUT));

const checkServiceStatus = async () => {
  while (!await pingServices()) {
    console.log(`AWS services not ready yet, waiting ${TIMEOUT}ms...`);
    await delay();
  }
  console.log('AWS services ready');
};

module.exports = {
  checkServiceStatus,
};
