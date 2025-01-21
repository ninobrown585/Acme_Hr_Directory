const { express, client } = require("./common");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/api/employees", async(req,res, next) => {
    try {
        const SQL =`
        SELECT * FROM employee;`;
        const response = await client.query(SQL);
        res.status(200).json(response.rows);
    } catch (error) {
        next(error);
    }
});

app.get("/api/departments", async (req, res, next) => {
    try {
      const SQL = `
      SELECT * FROM department;
  `;
      const response = await client.query(SQL);
      res.status(200).json(response.rows);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/employees", async (req, res, next) => {
    try {
      const { name, department_id } = req.body;
      const SQL = `;
          INSERT INTO employee(name, department_id) VALUES($1, $2) RETURNING *;
      `;
      const response = await client.query(SQL, [name, department_id]);
      res.status(200).json(response.rows);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/employees/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const SQL = `
          DELETE FROM employee WHERE id = $1;
      `;
      await client.query(SQL, [id]);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  app.put("/api/employees/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, department_id } = req.body;
      const SQL = `
            UPDATE employee 
            SET name = $1, department_id = $2
            WHERE id = $3
            RETURNING *
        `;
      const response = await client.query(SQL, [name, department_id, id]);
      res.status(200).json(response.rows);
    } catch (error) {
      next(error);
    }
  });

  app.listen(PORT, async () => {
    await client.connect();
    console.log(`I am listening on port number ${PORT}`);
  });