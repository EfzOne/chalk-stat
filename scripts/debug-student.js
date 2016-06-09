var _ = require('lodash');
var debug = require('debug')("chalk:stat:student");

module.exports = function(err, students) {
  _(students).forEach((student) => {
    debug({
      id: student.id,
      year: student.year,
      class: student.class,
      number: student.number
    });
  });
  this();
};
