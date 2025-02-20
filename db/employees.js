const client = require('./client.js');

const createEmployee = async(employeeName, departmentId) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO employees (name, department_id)
      VALUES ('${employeeName}', ${departmentId})
      RETURNING *;
    `);
    const player = rows[0];
    return player;
  } catch(err) {
    console.log(err);
  }
}

const getEmployees = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM employees;
      `);
    return rows;
  } catch(err) {
    console.log(err);
  }
}

const deleteEmployee = async(id) => {
  try {
    await client.query(`DELETE FROM employees WHERE id=${id};`);
  } catch(err) {
    console.log(err);
  }
}

const editEmployee = async(id, name, department_id) => {
  try {
    await client.query(`UPDATE employees SET name='${name}', department_id=${department_id} WHERE id=${id};`);
  } catch(err) {
    console.log(err);
  }
}

module.exports = { createEmployee, getEmployees, deleteEmployee, editEmployee }