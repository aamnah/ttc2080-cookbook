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

## Unnecessary commas with `map`

Use `.join('')` on the result of `.map()`

https://stackoverflow.com/a/45812277