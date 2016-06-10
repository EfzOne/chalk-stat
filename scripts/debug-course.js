var _ = require('lodash');
var debug = require('debug')("chalk:stat:course");

module.exports = (name) => {
  return function(err, courses) {
    if(err) console.error(err);
    console.log("%d students attend %s including", courses.length, name);
    _(_.countBy(courses, "class")).forEach((count, cls) => {
      console.log("%d students from class %d", count, cls);
    });
    this(null, courses);
  };
};
