const client = require('./client.js');
const { createDepartment } = require('./departments.js');
const { createEmployee } = require('./employees.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS employees;
      DROP TABLE IF EXISTS departments;
    `)
  } catch(err) {
    console.log(err);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) UNIQUE NOT NULL
      );
      
      CREATE TABLE employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        department_id INTEGER REFERENCES departments(id)
      );
    `);
  } catch(err) {
    console.log(err);
  }
}

const syncAndSeed = async () => {
  try{
    await client.connect();
    await dropTables();
    await createTables();
    const engineering = await createDepartment('Engineering');
    const accounting = await createDepartment('Accounting');
    const sales = await createDepartment('Sales');
    const management = await createDepartment('Management');
    const humanResources = await createDepartment('HR');
    await createEmployee('Michael', management.id);
    await createEmployee('Jim', sales.id);
    await createEmployee('Toby', humanResources.id);
    await createEmployee('Stanley', accounting.id);
    await createEmployee('Joe', engineering.id);
    await client.end();
  } catch(err) {
    console.log(err);
  }
}

syncAndSeed();