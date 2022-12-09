var connection = require('./../../config/db.config')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

var Trash = function (trash) {
    this.tool_id = trash.tool_id
    this.purchase_date          = trash.purchase_date
    this.identification_number  = trash.identification_number
    this.vendor                 = trash.vendor
    this.invoice_number         = trash.invoice_number
    this.article_name           = trash.article_name
    // this.assignation_place      = trash.assignation_place
    this.statue                 = trash.statue
    this.historical             = trash.historical
    this.material_number        = trash.material_number
    this.created_at             = dateTime
};

Trash.create = function (newTrash, result) {
    connection.query("INSERT INTO trash set ?", newTrash, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    });
};

Trash.findAll = function (result) {
    connection.query("SELECT * FROM trash", function (err, res) {
        if (err) {
            console.log("Error while fetching trash: ", err);
            result(null, err);
        }
        else {
            console.log('Trash fetched successfully: ');
            result(null, res);
        }
    });
};

Trash.delete = function (id, result) {
    connection.query("DELETE FROM trash WHERE trash_id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Trash;