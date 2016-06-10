var mongoose = require('mongoose');
var Step = require('step');
var _ = require('lodash');
var debug = require('debug')("chalk:stat:types");
var Chalk = require('../Chalk');
var Const = require('../const');

module.exports = (cb) => {
  var TypeList = Const.type;
  Step(
    function() {
      debug("Collecting Data...");
      Chalk.Type.find({}, this);
    },
    require('./debug-types')(TypeList),
    function(err) {
      debug("Complete");
      if(err) console.log(err);
      this();
    },
    cb
  );
};
