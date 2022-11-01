var connection = require('../../config/db.config')

var DailyContrat = function (dailycontrat) {
    this.id = dailycontrat.id;
    this.contrat_id = dailycontrat.contrat_id;
    this.type_contrat = dailycontrat.type_contrat;
    this.evaluation = dailycontrat.evaluation;
    this.start_date = dailycontrat.start_date;
    this.start_motif = dailycontrat.start_motif;
    this.sanction = dailycontrat.sanction;
};

DailyContrat.findById = function (id, result) {
    connection.query("SELECT * FROM contrat WHERE contrat_id = ?", id, function(err,res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    })
}

DailyContrat.findAll = function (id,result) {
    connection.query("SELECT * FROM contrat WHERE id=?", id, function (err,res) {
        if (err) {
            console.log("Error while fetching contrat: ", err);
            result(null, err)
        } else {
            console.log("Contrat fetched successfully: ");
            result(null, res)
        }
    })
}

DailyContrat.update = function (id,dailycontrat,result) {
    connection.query("UPDATE contrat SET type_contrat=?,evaluation=?,start_date=?,start_motif=?,sanction=? WHERE contrat_id=?", [dailycontrat.type_contrat, dailycontrat.evaluation,dailycontrat.start_date,dailycontrat.start_motif,dailycontrat.sanction,id], function (err,res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err)
        } else {
            console.log("Contrat updated successfully: ");
            result(null, res)
        }
    })
}

DailyContrat.create = function (newDailyContrat, result) {
    connection.query("INSERT INTO contrat set ?", newDailyContrat, function (err,res) {
        if (err) {
            console.log("error", err);
            result(null,err)
        } else {
            console.log(res);
            result(null,res)
        }
    })
}

DailyContrat.delete = function (id, result) {
    connection.query("DELETE FROM contrat WHERE contrat_id = ?",[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = DailyContrat;


