var connection = require('../../config/db.config')

var MonthlyContrat = function (monthlycontrat) {
    this.id = monthlycontrat.id;
    this.contrat_id = monthlycontrat.contrat_id;
    this.type_contrat = monthlycontrat.type_contrat;
    this.evaluation = monthlycontrat.evaluation;
    this.start_date = monthlycontrat.start_date;
    this.start_motif = monthlycontrat.start_motif;
    this.sanction = monthlycontrat.sanction;
};

MonthlyContrat.findById = function (id, result) {
    connection.query("SELECT * FROM contrat_monthly WHERE contrat_id = ?", id, function(err,res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    })
}

MonthlyContrat.findAll = function (id,result) {
    connection.query("SELECT * FROM contrat_monthly WHERE id=?", id, function (err,res) {
        if (err) {
            console.log("Error while fetching contrat: ", err);
            result(null, err)
        } else {
            console.log("Contrat fetched successfully: ");
            result(null, res)
        }
    })
}

MonthlyContrat.update = function (id,monthlycontrat,result) {
    connection.query("UPDATE contrat_monthly SET type_contrat=?,evaluation=?,start_date=?,start_motif=?,sanction=? WHERE contrat_id=?", [monthlycontrat.type_contrat, monthlycontrat.evaluation,monthlycontrat.start_date,monthlycontrat.start_motif,monthlycontrat.sanction,id], function (err,res) {
        if (err) {
            console.log("Error: ", err);
            result(null, err)
        } else {
            console.log("Contrat monthly updated successfully: ");
            result(null, res)
        }
    })
}

MonthlyContrat.create = function (newMonthlyContrat, result) {
    connection.query("INSERT INTO contrat_monthly set ?", newMonthlyContrat, function (err,res) {
        if (err) {
            console.log("error", err);
            result(null,err)
        } else {
            console.log(res);
            result(null,res)
        }
    })
}

MonthlyContrat.delete = function (id, result) {
    connection.query("DELETE FROM contrat_monthly WHERE contrat_id = ?",[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = MonthlyContrat;


