var connection = require('./../../config/db.config')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

var Personnaltools = function (personnaltools) {
    this.purchase_date          = personnaltools.purchase_date
    this.identification_number  = personnaltools.identification_number
    this.vendor                 = personnaltools.vendor
    this.invoice_number         = personnaltools.invoice_number
    this.article_name           = personnaltools.article_name
    // this.assignation_place      = personnaltools.assignation_place
    this.statue                 = personnaltools.statue
    // this.historical             = personnaltools.historical
    this.material_number        = personnaltools.material_number
    this.created_at             = dateTime
};

Personnaltools.create = function (newPersonnalTools, result) {
    connection.query("INSERT INTO personnal_tools set ?", newPersonnalTools, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    });
};

Personnaltools.findById = function (id, result) {
    connection.query("SELECT * FROM personnal_tools WHERE tool_id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    });
};

Personnaltools.findAll = function (result) {
    connection.query("SELECT * FROM personnal_tools", function (err, res) {
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

Personnaltools.update = function (id, personnaltools, result) {
    connection.query("UPDATE personnal_tools SET purchase_date=?,identification_number=?,vendor=?,invoice_number=?,article_name=?,statue=?,material_number=? WHERE tool_id = ? ", [personnaltools.purchase_date, personnaltools.identification_number, personnaltools.vendor, personnaltools.invoice_number, personnaltools.article_name, personnaltools.statue, personnaltools.material_number, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Personnaltools.delete = function (id, result) {
    connection.query("DELETE FROM personnal_tools WHERE tool_id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Personnaltools;