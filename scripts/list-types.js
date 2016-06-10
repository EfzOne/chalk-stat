var mongoose = require('mongoose');
var Step = require('step');
var _ = require('lodash');
var debug = require('debug')("chalk:stat:types");
var Chalk = require('../Chalk');
var Const = require('../const');

module.exports = (cb) => {
  var TypeList = Const.type;
  var preType = _.size(TypeList);
  Step(
    function() {
      debug("Collecting Data...");
      Chalk.Type.find({}, this);
    },
    function(err, types) {
      if(err) console.log(err);
      var group = this.group();
      _(types).forEach((type) => {
        var __cb = group();
        Chalk.Student.find({studentId: type.studentId}, (err, __student) => {
          var student = __student[0];
          var __typeId = preType + student.class;
          TypeList[__typeId] = ("Class" + student.class);
          __cb(err, {
            studentId: student.studentId,
            types: _.concat([__typeId], type.types)
          });
        });
      });
    },
    require('./debug-types')(TypeList),
    function(err) {
      if(err) console.log(err);
      debug("Complete");
      this();
    },
    cb
  );
};
