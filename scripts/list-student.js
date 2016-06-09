var mongoose = require('mongoose');
var Step = require('step');
var _ = require('lodash');
var debug = require('debug')("chalk:stat");
var Chalk = require('../Chalk');

module.exports = (id, cb) => {
  Step(
    function() {
      debug("Collecting Data...");
      Chalk.Student.find({id: id}, this);
    },
    require('./debug-student'),
    function(err) {
      debug("Complete");
      if(err) console.log(err);
      this();
    },
    cb
  );
};
