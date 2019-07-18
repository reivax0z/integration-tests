require('dotenv');
import { scanResult } from './expected/persons.mock';

const request = require('supertest');
import { app } from '../../src/server';

describe('GIVEN the person endpoint is available', () => {

  describe('WHEN get all request is received', () => {

    it('THEN it should return 200 response with the person data', async () => {
      const res = await request(app)
        .get('/v1/person')
        .set('ds-correlation-id', '12345');

      expect(res.statusCode).toBe(200);

      const body = res.body;
      expect(body.correlationId).toBe('12345');
      expect(body.status).toBe(200);
      expect(body.time).not.toBeNull();
      expect(body.data).toEqual(scanResult);
    });
  });
});
