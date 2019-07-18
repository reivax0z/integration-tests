const myTable = require('./createTable');
const samples = require('./insertSampleData');
const services = require('./checkServiceStatus');

const setupServices = () => Promise.all([
  myTable.createTable(),
]);

const run = async () => {
  try {
    console.log('---\nStep 1 - Checking AWS services');
    await services.checkServiceStatus();

    console.log('---\nStep 2 - Initialising service configuration');
    await setupServices();

    console.log('---\nStep 3 - Starting seed data');
    await samples.insertSampleData([
      './sample-001/entry',
    ]);

    console.log('---\nAll done');
  } catch (e) {
    console.error(`Unable to seed data: ${e}`);
    process.exit(1);
  }
};

return run();
