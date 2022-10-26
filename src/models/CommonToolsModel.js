var connection = require('./../../config/db.config')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

var Commontools = function (commontools) {
    this.purchase_date          = commontools.purchase_date;
    this.identification_number  = commontools.identification_number;
    this.article_name           = commontools.article_name;
    this.assignation_place      = commontools.assignation_place;
    this.statue                 = commontools.statue;
    this.historical             = commontools.historical;
    this.material_number        = commontools.material_number;
    this.tooling_id             = commontools.tooling_id;
    this.created_at             = dateTime;
};

Commontools.create = function (newCommonTools, result) {
    connection.query("INSERT INTO common_tools set ?", newCommonTools, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    });
};

Commontools.findById = function (id, result) {
    connection.query("SELECT * FROM common_tools WHERE tool_id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    });
};

Commontools.findAll = function (result) {
    connection.query("SELECT * FROM common_tools", function (err, res) {
        if (err) {
            console.log("Error while fetching tools: ", err);
            result(null, err);
        }
        else {
            console.log('Tools fetched successfully: ');
            result(null, res);
        }
    });
};

Commontools.update = function (id, commontools, result) {
    connection.query("UPDATE common_tools SET purchase_date=?,identification_number=?,article_name=?,assignation_place=?,statue=?,historical=?,material_number=?,tooling_id=? WHERE tool_id = ? ", [commontools.purchase_date, commontools.identification_number, commontools.article_name, commontools.assignation_place, commontools.statue, commontools.historical, commontools.material_number, commontools.tooling_id, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Commontools.delete = function (id, result) {
    connection.query("DELETE FROM common_tools WHERE tool_id = ?",[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Commontools;