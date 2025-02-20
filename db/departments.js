const client = require('./client.js');

const createDepartment = async(departmentName) => {
  try {
    const { rows } = await client.query(`
    INSERT INTO departments (name)
    VALUES ('${departmentName}')
    RETURNING *;
  `);
  const department = rows[0];
  return department;
} catch(err) {
  console.log(err);
}
}

const getDepartments = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM departments;
      `);
    return rows;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { createDepartment, getDepartments }