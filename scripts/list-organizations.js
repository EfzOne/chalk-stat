var mongoose = require('mongoose');
var Step = require('step');
var _ = require('lodash');
var debug = require('debug')("chalk:stat:types");
var Chalk = require('../Chalk');
var Const = require('../const');

module.exports = (cb) => {
  var TypeList = Const.type;
  var preType = _.size(TypeList);
  var orgcnt = {};
  Step(
    function() {
      debug("Collecting Data...");
      Chalk.Course.find({}, this.parallel());
      Chalk.Student.find({}, this.parallel());
      Chalk.Org.find({}, this.parallel());
    },
    function(err, courses, __students, orgs) {
      if(err) console.error(err);
      var students = _.chain(__students)
        .map((student) => {
          return {
            studentId: student.studentId,
            year: student.year,
            class: student.class,
            number: student.number
          };
        })
        .keyBy('studentId')
        .value();
      _(orgs).forEach((org, idx) => {
        _.chain(courses)
          .filter((course) => {
            return course.courseId == org.courseId;
          })
          .value()
          .forEach((student) => {
            if(_.includes(org.class, students[student.studentId].class)) {
              if(org.name in orgcnt) {
                orgcnt[org.name]++;
              } else {
                orgcnt[org.name] = 1;
              }
            }
          });
      });
      _.chain(orgcnt)
        .map((cnt, name) => {
          return {
            name: name,
            cnt: cnt
          };
        })
        .orderBy(['name', 'cnt'], ['asc', 'asc'])
        .value()
        .forEach((dat) => {
          console.log("Organization %s has %d students", dat.name, dat.cnt);
        });
      this();
    },
    function(err) {
      if(err) console.error(err);
      debug("Complete");
      this();
    },
    cb
  );
};
