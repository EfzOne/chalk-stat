#!/usr/bin/env node
var mongoose = require('mongoose');
var program = require('commander');
var Step = require('step');

mongoose.connect('mongodb://localhost/test');

program
  .version(require("./package.json").version)
  .option('--ls', 'List all students')
  .option('-s, --student <n>', 'Show student information', parseInt)
  .parse(process.argv);



Step(
  function() {
    var group = this.group();
    if(program.ls) require('./scripts/list-students')(group());
    if(program.student) require('./scripts/list-student')(program.student, group());
  },
  function() {
    process.exit(0);
  }
);
