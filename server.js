const client = require('./db/client.js');
client.connect();

const express = require('express');
const app = express();
app.use(express.json());

const { createEmployee, getEmployees, deleteEmployee, editEmployee } = require('./db/employees.js');
const { getDepartments } = require('./db/departments.js');

app.get('/', (req, res) => {
  res.send('Employee Directory');
});

app.get('/api/departments', async(req, res) => {
  const departments = await getDepartments();
  res.send(departments);
});

app.get('/api/employees', async(req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

app.post('/api/employees', async(req, res) => {
  const { name, department_id } = req.body;
  try {
    const newEmployee = await createEmployee(name, department_id);
    res.send(newEmployee);
  } catch(err) {
    console.log(err);
  }
});

app.delete('/api/employees/:id', async(req, res) => {
  const { id } = req.params;
  try {
    await deleteEmployee(id);
  } catch(err) {
    console.log(err);
  }
  res.send(`Termination successful.`);
});

app.put('/api/employees/:id', async(req,res) => {
  const { id } = req.params;
  const { name, department_id } = req.body;
  try {
    await editEmployee(id, name, department_id);
  } catch(err) {
    console.log(err);
  }
  res.send(`Edit successful`);
});

app.use((err, req, res) => {
  console.log(err);
  res.status(500).send(err);
});

app.listen(3000, () => {
  console.log(`listening on PORT 3000`);
});