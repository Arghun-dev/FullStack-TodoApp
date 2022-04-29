# FullStack-TodoApp

## PROBLEM (req body empty object)

To solve this issue you have to do this:

1. `npm i body-parser`

2.

```js
// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
```


## Request params

```js
request => /api/todos/5/2/1

app.get('/api/todos/:id/:x/:y', (req, res) => {
  console.log(req.params); ///  { id: '5', x: '2', y: '1' }
})
```

## Optional Request params

You just need to put `?` mark in front of the param.

```js
request => /api/todos/5/2/1

app.get('/api/todos/:id/:x/:y?', (req, res) => {
  console.log(req.params); ///  { id: '5', x: '2', y: '1' }
})
```


## Handling Delete Request

```js
app.delete('/api/todos/:id', (req, res) => {
  const ID = req.params.id * 1;
  if (ID > todos.length) {
    res.status(404).json({
      status: "failed",
      message: "Invalid ID"
    })
  }
  
  const newTodos = todos.filter((t) => t.id !== ID);
  fs.writeFile(todosPath, JSON.stringify(newTodos), (err) => {
    res.status(204).json({
      status: "success",
      data: {
        todo: null
      }
    })
  })
})
```


## Middleware 

In some cases you need to add a specific feature, for example `createdAt` to all of your requests. You have to do this:

```js
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  const createdAt = new Date().toISOString()
});
```
