var _ = require('lodash');
var debug = require('debug')("chalk:stat:lesson");

module.exports = (name) => {
  return function(err, courses) {
    console.log("%d students attend %s including", courses.length, name);
    _(_.countBy(courses, "class")).forEach((count, cls) => {
      console.log("%d students from class %d", count, cls);
    });
    this(null, courses);
  };
};
