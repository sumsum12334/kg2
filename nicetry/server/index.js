const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//const fileUpload = require('express-fileupload');

//middleware
app.use(cors());
app.use(express.json()); //req.body
//app.use(fileUpload());

//ROUTES//

app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

//create a todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM record order by date");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { sonumber, awh, qty, weight, length, width, height, companyname } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO record (sonumber, awh, qty, weight, length, width, height, companyname) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [sonumber, awh, qty, weight, length, width, height, companyname]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//create a company profile

// app.post("/company",async (req, res) => {
//   try {
//     const {companyname} = req.body;
//     const newTodo = await pool.query(
//       "CREATE TABLE ?? (SOnumber varchar(10), awh varchar(20), qty numeric(5,0), weight numeric(10,2), length numeric(5,0), width numeric(5,0), height numeric(5,0), companyname character varying(100)) ",
//       [companyname]
//     );

//     res.json(newTodo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//get all todos

app.get("/companyname", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT distinct companyname FROM record order by companyname");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM record WHERE aid = $1", [
      id
    ]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos/company/:company", async (req, res) => {
  try {
    const { company } = req.params;
    const todo = await pool.query("SELECT * FROM record WHERE companyname = $1", [
      company
    ]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/:sonumber",async(req,res) => {
  try {
    const { sonumber } = req.params;
    const todo = await pool.query("SELECT * FROM record WHERE sonumber = $1", [
      sonumber
    ]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// app.get("/companyname", async (req, res) => {
//   try {
//     const todo = await pool.query("SELECT * FROM test");
//     res.json(todo.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });


app.get("/:company/:sonumber",async(req,res) => {
  try {
    const { company,sonumber } = req.params;
    const todo = await pool.query("SELECT * FROM record WHERE sonumber = $1 and companyname = $2", [
      sonumber,
      company
    ]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { sonumber, weight, width, length, height, qty, awh, companyname } = req.body;
    const updateTodo = await pool.query(
      "UPDATE record SET sonumber = $1, awh = $2, qty = $3, weight = $4, length = $5,  width = $6, height = $7, companyname = $8 WHERE aid = $9",
      [sonumber, awh, qty, weight, length, width, height, companyname, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM record WHERE aid = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
//get all client

app.get("/client", async (req, res) => {
  try {
    const allClient = await pool.query("SELECT * FROM client");
    res.json(allClient.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a client 

app.get("/client/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const allClient = await pool.query("SELECT * FROM client WHERE username = $1",
    [username]
    );

    res.json(allClient.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all staff

app.get("/staff", async (req, res) => {
  try {
    const allStaff = await pool.query("SELECT * FROM staff");
    res.json(allStaff.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a staff
app.get("/staff/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const allClient = await pool.query("SELECT * FROM staff WHERE username = $1",
    [username]
    );

    res.json(allClient.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// Upload Endpoint
/*app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
*/
app.listen(5000, () => {
  console.log("server has started on port 5000");
});