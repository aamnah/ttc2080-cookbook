inter-op between CommonJS modules and ES modules is not happening.

I have a constants.ts file. i want to use it in the Vite+TypeScript based frontend, as well as Node+Express based backend

But the Vite+TypeScript frontend uses ES6 modules while the Node+Express backend uses CommonJS.

I can not generate the file in JS that would work for both.

Typescript generates all files with a `.js` file extension, even if it was generated with the `module: "CommonJS"` config. And Node insists on having the `.cjs` file extension because then it wouldn't try reading the wrong files. You can not do it with the `--outfile` flag either.

```js
// --outFile.
```

## Vite only building index.html and nothing in source
Turns out Vite only builds the entry point file. You have to specify the others on your own.

Easiest fix is to move your `index.html` to `src` and make `src` the new root

## Build on file change
https://vite.dev/guide/build.html#rebuild-on-files-changes
https://rollupjs.org/configuration-options/#watch

## Unnecessary commas when doing `map`

Use `.join('')` on the result of `.map()`

https://stackoverflow.com/a/45812277

## API response is HTML
Check that the endpoint URL you are calling and that it supports the `method` that you are trying to use. 95% of the time, in my case, it has been a URL that was incorrect or missing expected params

Implement a 404 default message for routes that don't exist

```js
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found", route: request.originalUrl });
})
```

[ref](https://stackoverflow.com/a/64345183)

## Getting the route that was called in Express

```js
app.use('/admin', function (req, res, next) { // GET 'http://www.example.com/admin/new?sort=desc'
  console.dir(req.originalUrl) // '/admin/new?sort=desc'
  console.dir(req.baseUrl) // '/admin'
  console.dir(req.path) // '/new'
  next()
})
```

[ref for what's available on `request` object](https://expressjs.com/en/api.html)


## Response 200 but no data
See if any data was returned from the database. Send `json` with an error message in case of failed requests

```js
data = await Recipe.find({
  title: { $regex: name, $options: "i" },
  cookbookId: cookbookId,
});
if (data) {
  console.log(`Recipes by Name and Cookbook ID: ${data}`);
  response.json(data);
} else {
  response.status(404).json({
    error: `Recipe not found with name: ${name} and Cookbook ID: ${cookbookId}`,
  });
}
```