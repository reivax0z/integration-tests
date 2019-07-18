require('dotenv');
const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

const dynamodb = new AWS.DynamoDB();

const insertSampleData = async (data = []) => {
  try {
    await Promise.all(
      data.map(async datum => await dynamodb.putItem(require(datum)).promise()),
    );
    console.log('Inserted in table');
  } catch (err) {
    console.error(`Unable to insert in table: ${err}`);
    throw err;
  }
};

const cleanSampleData = async () => {
  try {
    const scanParams = {
      TableName: 'Person',
    };
    const data = await dynamodb.scan(scanParams).promise();
    await Promise.all(
      data.Items.map(async item => {
        return dynamodb.deleteItem({
          TableName: scanParams.TableName,
          Key: { PK: item.PK, SK: item.SK },
        }).promise();
      }));
  } catch (err) {
    console.error(`Unable to clear table: ${err}`);
    throw err;
  }
};

module.exports = {
  insertSampleData,
  cleanSampleData,
};
