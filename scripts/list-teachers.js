var mongoose = require('mongoose');
var Step = require('step');
var _ = require('lodash');
var debug = require('debug')("chalk:stat:teachers");
var Chalk = require('../Chalk');

module.exports = (cb) => {
  Step(
    function() {
      debug("Collecting Data...");
      Chalk.Teacher.find({}, this);
    },
    function(err, teachers) {
      if(err) console.error(err);
      var group = this.group();
      _(teachers).forEach((teacher) => {
        var __cb = group();
        Chalk.Org.find({teacherId: teacher.teacherId}, (err, org) => {
          __cb(err, {
            teacher: teacher,
            org: org
          });
        });
      });
    },
    require('./debug-teacher'),
    function(err) {
      debug("Complete");
      if(err) console.error(err);
      this();
    },
    cb
  );
};
