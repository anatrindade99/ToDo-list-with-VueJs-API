const { nanoid } = require("nanoid");
const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const app = express();

let todos = [];

app.use(express.json());
app.use(cors());

app.post("/todos", (req, res, next) => {
  const id = nanoid();
  const todo = { id, name: req.body.name, done: false };
  todos.push(todo);
  return res.status(200).json(todo);
});

app.get("/todos", (req, res, next) => {
  return res.status(200).json(todos);
});

app.put("/todos/:id", (req, res, next) => {
  todos = todos.map((todo) => {
    if (todo.id == req.params.id) {
      return {
        ...todo,
        done: req.body.done,
      };
    }

    return todo;
  });

  return res.status(200).json(todos);
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.app = app;
module.exports.handler = serverless(app);
