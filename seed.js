const { client } = require("./common");

const seed = async () => {
  try {
    await client.connect();
    const SQL = `DROP TABLE IF EXISTS employee;
                DROP TABLE IF EXISTS department;
                CREATE TABLE department(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100)
                );
                CREATE TABLE employee(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                department_id INTEGER REFERENCES department(id) NOT NULL
                );
           INSERT INTO department(name) VALUES('Hr');
           INSERT INTO department(name) VALUES('IT');
           INSERT INTO department(name) VALUES('Data');
           INSERT INTO department(name) VALUES('Customer Service');
           INSERT INTO employee(name, department_id) VALUES('Maria', (SELECT id FROM department WHERE name='Hr'));
           INSERT INTO employee(name, department_id) VALUES('Chris', (SELECT id FROM department WHERE name='IT'));
           INSERT INTO employee(name, department_id) VALUES('Jasmine', (SELECT id FROM department WHERE name='Data'));
           INSERT INTO employee(name, department_id) VALUES('Andre', (SELECT id FROM department WHERE name='Customer Service'));
       `;
    await client.query(SQL);
    await client.end();
    console.log("We have data");
  } catch (error) {
    console.log(error);
  }
};

seed();