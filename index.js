#!/usr/bin/env node

var program = require('commander');

program
  .version(require("./package.json").version)
  .option('-s, --students', 'List all students')
  .parse(process.argv);

if(program.students) require("./scripts/list-students")();
