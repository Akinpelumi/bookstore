[![Build Status](https://travis-ci.org/Akinpelumi/bookstore.svg?branch=master)](https://travis-ci.org/Akinpelumi/bookstore)
[![Coverage Status](https://coveralls.io/repos/github/Akinpelumi/bookstore/badge.svg?branch=master)](https://coveralls.io/github/Akinpelumi/bookstore?branch=master)

------------

# Bami-Bookstore

## Setup
To get started with this project follow the steps below, and subsquent instructions.

### Project

- clone this project
- create a ```.env``` file in the root directory
- set up the ```.env``` file following the ```sample.env.txt``` file format/instructions
- run `npm install` to project dependencies
- start your postgreSQL server
- create a development and test database (using the names used in the ```.env``` file you created and set up)
- run migration command below

### To run the migrations up
run the command below
```bash
$ npm run migrate:up
```

### To run the seeded migrations up
run the command below
```bash
$ npm run seed:admin
```

- start your development server by running the command
```bash
$ npm run dev
```

- to run the written test cases, run the command
```bash
$ npm run test
```
