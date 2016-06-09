var _ = require('lodash');

module.exports = function(err, results) {
    this(err, _.map(results, (data) => { return data[0]; }));
};
