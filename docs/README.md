<h1>JHJ 🦒</h1>

A PHP-like CLI that parses and serves JSX files.

## Install

Install this package globally with your favorite package manager:

    npm install -g jhj

## Quick Start

### Render a string

    jhj -r '<h1 className="example">Hello World</h1>'

### Render a file

Create a file named `hello-world.jsx` with the following content:

```js
// hello-world.jsx
const h = "Hello"
export default <h1>{h} World</h1>
```

Render the file:

    jhj -f hello-world.jsx

### Serve a directory

The following command will serve the current working directory:

    jhj -S localhost:3000

### Use a custom router

You can specify a custom router if needed:

    jhj -S localhost:3000 ./router.js

It should return an express middleware function like the following:

```js
// router.js
export default (req, res, next) => {
    console.log(req.url)
    next()
}
```
