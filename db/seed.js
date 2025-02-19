const client = require('./client.js');

const syncAndSeed = async () => {
  await client.connect();
  console.log('Connected to the Database');
}

syncAndSeed();