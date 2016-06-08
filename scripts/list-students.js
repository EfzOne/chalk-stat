var mongoose = require('mongoose');
var Step = require('step');
var _ = require('lodash');
var debug = require('debug')("chalk:stat");
var Chalk = require("chalk-schema")(mongoose);

module.exports = () => {
  mongoose.connect('mongodb://localhost/test');
  Step(
    function() {
      debug("Collecting Data...");
      Chalk.Student.find({}, this);
    },
    function(err, students) {
      if(err) console.error(err);
      _(students).forEach((student) => {
        debug(student);
      });
      process.exit(0);
    }
  );
};
