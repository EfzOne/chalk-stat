var mongoose = require('mongoose');
var Step = require('step');
var _ = require('lodash');
var debug = require('debug')("chalk:stat:courses");
var Chalk = require('../Chalk');
var Const = require('../const');

module.exports = (name, cb) => {
  var id = Const.course[name];
  Step(
    function() {
      debug("Collecting Data...");
      console.log("Show data for %s", name);
      Chalk.Course.find({courseId: id}, this);
    },
    function(err, courses) {
      if(err) console.log(err);
      var group = this.group();
      _(courses).forEach((course) => {
        Chalk.Student.find({studentId: course.studentId}, group());
      });
    },
    require('./reduce-result'),
    require('./debug-student'),
    require('./debug-course')(name),
    function(err) {
      debug("Complete");
      if(err) console.log(err);
      this();
    },
    cb
  );
};
