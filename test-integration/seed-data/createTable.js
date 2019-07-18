require('dotenv');
const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

const dynamodb = new AWS.DynamoDB();

// no support yet for BillingMode: PAY_PER_REQUEST
const params = {
  TableName: 'Person',
  KeySchema: [
    {
      AttributeName: 'PK',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'SK',
      KeyType: 'RANGE',
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'PK',
      AttributeType: 'S',
    },
    {
      AttributeName: 'SK',
      AttributeType: 'S',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

const createTable = async () => {
  try {
    await dynamodb.createTable(params).promise();
    console.log('Created table');
  } catch(err) {
    console.error(`Unable to create table: ${err}`);
    process.exit(1);
  }
};

module.exports = {
  createTable: createTable,
};
