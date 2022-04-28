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
