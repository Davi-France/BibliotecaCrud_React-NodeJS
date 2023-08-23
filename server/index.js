const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "biblioteca",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  let SQL = "INSERT INTO livros (name, cost, category) VALUES (?,?,?)";

  db.query(SQL, [name, cost, category], (err, result) => console.log(err));
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  let SQL =
    "UPDATE livros SET name = ?, cost = ?, category = ? WHERE idlivro = ?";

  db.query(SQL, [name, cost, category, id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  let SQL = "DELETE FROM livros WHERE idlivro = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let SQL = "SELECT * from livros";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Rodando Servidor");
});
