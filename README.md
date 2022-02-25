# JHJ

[![CI](https://github.com/ubermanu/jhj/actions/workflows/ci.yml/badge.svg)](https://github.com/ubermanu/jhj/actions/workflows/ci.yml)

A small utility to serve and render JSX content.

This is an experiment to test out my ESM knowledge.<br>
Do not use this in production.

## Install

    npm install -g jhj

## Usage

Render JSX content:

    jhj -r '<div className="hello">Hello World</div>'

Serve files:

    jhj -S localhost:3000

## Quick Start

To render a file, it must be ES compatible and return a default export.

Example:

```jsx
// hello-world.jsx
const world = 'World'
export default <div className="hello">Hello {world}</div>
```

> Dynamic imports are not supported for the moment

Then you can render this file using:

    jhj -f ./hello-world.jsx
