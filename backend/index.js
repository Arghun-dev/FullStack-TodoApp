import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const todosPath = "./data/todos.json";

const todos = JSON.parse(fs.readFileSync(todosPath));

const port = 3000;

const app = express();

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/api/todos", (req, res) => {
  res.status(200).json({
    status: "success",
    totalCount: todos.length,
    data: {
      todos,
    },
  });
});

app.post("/api/todos", (req, res) => {
  const newId = todos[todos.length - 1].id + 1;
  const newTodo = { ...req.body, id: newId };
  todos.push(newTodo);

  fs.writeFile(todosPath, JSON.stringify(todos), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        message: "new todo created",
        newTodo,
      },
    });
  });
});

app.listen(port, () => {
  console.log(`server started running on port ${port}...`);
});
