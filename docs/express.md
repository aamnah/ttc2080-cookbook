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