---
title: Express notes
date: 2024-12-04
---

## rendering HTML files on routes

```js
app.use(express.static('public')) // define your dir where files are

app.get(endpoints.collection, (req, res) => {
  res.sendFile(__dirname + "/collections.html");
});
```

https://expressjs.com/en/starter/static-files.html

## Error handling
Handling errors early on will save you troubleshooting headaches

https://stackoverflow.com/a/23708903

[Google JSON Guide](https://google.github.io/styleguide/jsoncstyleguide.xml)

Success response return `data`

```json
{
  "data": {
    "id": 1001,
    "name": "Wing"
  }
}
```

Error response return `error`

```json
{
  "error": {
    "code": 404,
    "message": "ID not found"
  }
}
```

and if your client is JS, you can use `if ("error" in response) {}` to check if there is an error.