const personApi = require('../../src/api/personApi');
const dynamoService = require('../../src/services/dynamoService');

describe('GIVEN a person getAll request', () => {
  const expectedData = [{
    name: 'John Doe',
  }];

  describe('AND the DynamoDB call succeeds', () => {
    let scanSpy;

    beforeEach(() => {
      scanSpy = jest.spyOn(dynamoService, 'scan').mockResolvedValue(expectedData);
    });

    it('THEN it should return the DB data', async () => {
      const input = {
        correlationId: '12345',
      };

      const data = await personApi.getAll(input);

      expect(data).toEqual(expectedData);
      expect(scanSpy).toHaveBeenCalledTimes(1);
      expect(scanSpy).toHaveBeenCalledWith('12345', 'Person');
    });
  });

});
