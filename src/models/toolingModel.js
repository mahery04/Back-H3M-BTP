var connection = require('./../../config/db.config')

var Tooling = function (tooling) {
    this.type      = tooling.type;
};

Tooling.findById = function (id, result) {
    connection.query("SELECT * FROM tooling WHERE tooling_id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    });
};

Tooling.findAll = function (result) {
    connection.query("SELECT * FROM tooling", function (err, res) {
        if (err) {
            console.log("Error while fetching tooling: ", err);
            result(null, err);
        }
        else {
            console.log('Tooling fetched successfully: ');
            result(null, res);
        }
    });
};

module.exports = Tooling;