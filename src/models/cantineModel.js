var connection = require('./../../config/db.config')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

var Cantine = function (cantine) {
    this.month =                    cantine.month
    this.date =                     cantine.date
    this.nb_people =                cantine.nb_people
    this.total_kapoka_vary =        cantine.total_kapoka_vary
    this.total_budget_vary =        cantine.total_budget_vary
    this.total_kapoka_voamaina =    cantine.total_kapoka_voamaina
    this.total_budget_voamaina =    cantine.total_budget_voamaina
    this.total_depense =            cantine.total_depense
}

Cantine.getAll = function (result) {
    connection.query("SELECT * FROM cantine", function (err, res) {
        if (err) {
            console.log("Error while fetching Cantine: ", err);
            result(null, err);
        }
        else {
            console.log('Cantine fetched successfully: ');
            result(null, res);
        }
    });
};

Cantine.create = function (newCantine, result) {
    connection.query("INSERT INTO cantine SET ?", newCantine, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    })
}

Cantine.delete = function (id, result) {
    connection.query("DELETE FROM cantine WHERE id_cantine = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Cantine