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
  .option('--lt', 'Show types information')
  .option('-t, --types', 'Show type information')
  .option('-o, --orgs', 'Show organization information')
  .option('--teachers', 'Show teacher information')
  .parse(process.argv);

Step(
  function() {
    var group = this.group();
    if(program.ls) require('./scripts/list-students')(group());
    if(program.student) require('./scripts/list-student')(program.student, group());
    if(program.lc) require('./scripts/list-courses')(group());
    if(program.course) require('./scripts/list-course')(program.course, group());
    if(program.types) require('./scripts/list-type')(group());
    if(program.lt) require('./scripts/list-types')(group());
    if(program.orgs) require('./scripts/list-organizations')(group());
    if(program.teachers) require('./scripts/list-teachers')(group());
  },
  function(err) {
    if(err) console.error(err);
    process.exit(0);
  }
);
