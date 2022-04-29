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

const getTodos = (req, res) => {
  res.status(200).json({
    status: "success",
    totalCount: todos.length,
    data: {
      todos,
    },
  });
};

const getTodo = (req, res) => {
  const ID = req.params.id * 1;

  const foundedTodo = todos.find((t) => t.id === ID);

  if (!foundedTodo) {
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      todo: foundedTodo,
    },
  });
};

const createTodo = (req, res) => {
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
};

const deleteTodo = (req, res) => {
  const ID = req.params.id * 1;

  if (ID > todos.length) {
    res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }

  const filteredTodos = todos.filter((t) => t.id !== ID);

  fs.writeFile(todosPath, JSON.stringify(filteredTodos), (err) => {
    res.status(204).json({
      status: "success",
      data: {
        todo: null,
      },
    });
  });
};

app.route("/api/todos").get(getTodos).post(createTodo);
app.get("/api/todos/:id/:x?", getTodo);
app.delete(`/${todosPath}/:id`, deleteTodo);

app.listen(port, () => {
  console.log(`server started running on port ${port}...`);
});
