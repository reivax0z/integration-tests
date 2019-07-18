import { logger } from '../common/logger';
import { scan, Tables } from '../services/dynamoService';

interface GetAllInput {
  correlationId: string;
}

const getAll = async ({ correlationId }: GetAllInput): Promise<any>  => {
  logger.info({
    correlationId,
    label: 'personApi',
    message: 'getAll',
  });

  return await scan(correlationId, Tables.Person);
};

export {
  getAll,
};
