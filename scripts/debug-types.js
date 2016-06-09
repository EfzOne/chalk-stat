var _ = require('lodash');
var debug = require('debug')("chalk:stat:types");
var Const = require('../Const');

module.exports = function(err, students) {
  var cnt = _.size(
    _(_.groupBy(students, "types")).forEach((students, types) => {
      var type_string = _
        .chain(_.split(types, ','))
        .map((dat) => { return Const.type[dat]; })
        .reduce((result, dat) => { return result + " " + dat; }).value();
      console.log("%d students select %s", students.length, type_string);
    })
  );
  console.log("Total: %d", cnt);
  this(null, students);
};
