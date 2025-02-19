const client = require('./db/client.js');
client.connect();

const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/employees', (req, res) => {
  res.send('Return array of employees');
});

app.get('/api/departments', (req, res) => {
  res.send('Return array of departments');
});