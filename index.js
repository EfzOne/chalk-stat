#!/usr/bin/env node
var mongoose = require('mongoose');
var program = require('commander');
var Step = require('step');
var Const = require('./const');

mongoose.connect('mongodb://localhost/test');

program
  .version(require("./package.json").version)
  .option('--ls', 'List all students')
  .option('-s, --student <n>', 'Show student information', parseInt)
  .option('--lc', 'List all courses')
  .option('-c, --course <n>', 'Show course information')
  .option('-t, --type', 'Show type information')
  .parse(process.argv);

Step(
  function() {
    var group = this.group();
    if(program.ls) require('./scripts/list-students')(group());
    if(program.student) require('./scripts/list-student')(program.student, group());
    if(program.lc) require('./scripts/list-courses')(group());
    if(program.course) require('./scripts/list-course')(program.course, group());
    if(program.type) require('./scripts/list-types')(group());
  },
  function() {
    process.exit(0);
  }
);
