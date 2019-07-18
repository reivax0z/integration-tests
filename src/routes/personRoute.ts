const express = require('express');
const uuid = require('uuid');

import { getAll } from '../api/personApi';
import { logger } from '../common/logger';

const personRouter = express.Router();

const getHandler = async (req, res): Promise<void> => {

  if (!('ds-correlation-id' in req.headers)) {
    req.headers['ds-correlation-id'] = uuid.v4();
  }

  const correlationId = req.headers['ds-correlation-id'];

  try {
    const data =  await getAll({ correlationId });
    logger.info({
      correlationId,
      label: 'personRouter',
      message: `getHandler - response - ${JSON.stringify(data)}`,
    });
    return res.status(200).send({
      correlationId,
      data,
      time: new Date().toISOString(),
      status: 200,
    });
  } catch (err) {
    logger.error({
      correlationId,
      label: 'personRouter',
      message: `getHandler - error - ${err}`,
    });
    return res.status(500).send({
      correlationId,
      time: new Date().toISOString(),
      status: 500,
      errors: [{ code: '500101', message: 'Internal Server Error' }],
    });
  }
};

personRouter.get('/', getHandler);

export { personRouter };
