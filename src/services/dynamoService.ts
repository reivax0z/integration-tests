import { DynamoDB } from 'aws-sdk';
import { logger } from '../common/logger';

const dynamodb = new DynamoDB.DocumentClient({
  endpoint: process.env.DYNAMODB_ENDPOINT,
});

enum Tables {
  Person = 'Person',
}

const scan = async (correlationId: string, table: Tables): Promise<any> => {
  try {
    return await dynamodb.scan({
      TableName: table,
    }).promise();
  } catch (e) {
    logger.error({
      correlationId,
      label: 'dynamoService',
      message: `scan - cannot scan table - ${e}`,
    });
  }
};

export {
  scan,
  Tables,
};
