var _ = require('lodash');
var debug = require('debug')("chalk:stat:student");

module.exports = function(err, students) {
  _(students).forEach((student) => {
    console.log({
      id: student.studentId,
      year: student.year,
      class: student.class,
      number: student.number
    });
  });
  this(null, students);
};
