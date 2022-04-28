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
