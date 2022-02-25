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
