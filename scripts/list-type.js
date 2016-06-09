var mongoose = require('mongoose');
var Step = require('step');
var _ = require('lodash');
var debug = require('debug')("chalk:stat:types");
var Chalk = require('../Chalk');

module.exports = (cb) => {
  Step(
    function() {
      debug("Collecting Data...");
      if(err) console.log(err);
      var group = this.group();
      _(courses).forEach((course) => {
        Chalk.Student.find({}, group());
      });
    },
    function(err, students) {
      Chalk.Type.find({}, this);
    },
    require('./debug-types')(Const.Type),
    function(err) {
      debug("Complete");
      if(err) console.log(err);
      this();
    },
    cb
  );
};
