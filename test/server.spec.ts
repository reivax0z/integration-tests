const request = require('supertest');

import { app } from '../src/server';
import * as personApi from '../src/api/personApi';

describe('GIVEN a getAll request', () => {
  let getAllSpy;

  describe('AND the service succeeds', () => {

    beforeEach(() => {
      getAllSpy = jest.spyOn(personApi, 'getAll').mockResolvedValue([{
        name: 'John Doe',
      }]);
    });

    it('THEN it should return 200 upon success', async () => {
      const res = await request(app)
        .get('/v1/person')
        .set('ds-correlation-id', '12345');

      expect(getAllSpy).toHaveBeenCalledTimes(1);

      expect(res.statusCode).toBe(200);

      const body = res.body;
      expect(body.correlationId).toBe('12345');
      expect(body.status).toBe(200);
      expect(body.time).not.toBeNull();
      expect(body.data).toEqual([{
        name: 'John Doe',
      }]);

    });
  });

  describe('AND the service fails', () => {

    beforeEach(() => {
      getAllSpy = jest.spyOn(personApi, 'getAll').mockRejectedValue('Something happened');
    });

    it.skip('THEN it should return 500 upon error', async () => {
      const res = await request(app)
        .get('/v1/person')
        .set('ds-correlation-id', '12345');

      expect(getAllSpy).toHaveBeenCalledTimes(1);

      expect(res.statusCode).toBe(500);

      const body = res.body;
      expect(body.correlationId).toBe('12345');
      expect(body.status).toBe(500);
      expect(body.time).not.toBeNull();
      expect(body.errors.length).toBe(1);
      expect(body.errors).toEqual([{
        cause: 'Something happened',
        code: '500101',
        message: 'Internal Server Error',
      }]);

    });
  });
});
