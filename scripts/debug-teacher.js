var _ = require('lodash');
var debug = require('debug')("chalk:stat:teacher");

module.exports = function(err, teachers) {
  if(err) console.error(err);
  _(teachers).forEach((teacher) => {
    console.log("Teacher %s has %d organizations of %d lessons",
      teacher.teacher.name,
      _.size(teacher.org),
      _.sum(_.map(teacher.org, (org) => { return org.times; }))
    );
  });
  this(null);
};
