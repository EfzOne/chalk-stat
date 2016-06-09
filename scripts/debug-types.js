var _ = require('lodash');
var debug = require('debug')("chalk:stat:types");

module.exports = (TypeList) => {
  return function(err, students) {
    var cnt = _.size(
      _(_.groupBy(students, "types")).forEach((students, types) => {
        var type_string = _
          .chain(_.split(types, ','))
          .map((dat) => { return TypeList[dat]; })
          .reduce((result, dat) => { return result + " " + dat; }).value();
        console.log("%s: %d", type_string, students.length);
      })
    );
    console.log("Total: %d", cnt);
    this(null, students);
  };
};
