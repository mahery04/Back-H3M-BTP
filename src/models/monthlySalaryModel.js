var connection = require('../../config/db.config')

var MonthlySalary = function (monthlysalary) {
    this.monthlysalary_id = monthlysalary.monthlysalary_id
    this.monthlypresence_id = monthlysalary.monthlypresence_id
    this.monthlyemployee_id = monthlysalary.monthlyemployee_id
    this.heure_supplementaire = monthlysalary.heure_supplementaire
    this.minute_supplementaire = monthlysalary.minute_supplementaire
    this.prime = monthlysalary.prime
    this.conge = monthlysalary.conge
    this.indeminite_transport = monthlysalary.indeminite_transport
    this.autres_indeminités = monthlysalary.autres_indeminités
    this.heure_non_imposable = monthlysalary.heure_non_imposable
    this.minute_non_imposable = monthlysalary.minute_non_imposable
    this.avance_quinzaine = monthlysalary.avance_quinzaine
    this.avance_speciale = monthlysalary.avance_speciale
    this.enfant_charge = monthlysalary.enfant_charge
    this.autres_deductions = monthlysalary.autres_deductions
}

MonthlySalary.getEmployees = function (result) {
    connection.query("SELECT * FROM monthly_employee", function (err, res) {
        if (err) {
            console.log("Error while fetching employees: ", err);
            result(null, err);
        }
        else {
            console.log('Employees fetched successfully: ');
            result(null, res);
        }
    })
}

MonthlySalary.create = function (newMonthlySalary, result) {
    connection.query('INSERT INTO monthly_salary set ?', newMonthlySalary, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    })
}

MonthlySalary.findById = function (id, result) {
    connection.query("SELECT * FROM monthly_salary ms JOIN monthly_presence mp ON ms.monthlypresence_id = mp.monthlypresence_id JOIN monthly_employee me ON ms.monthlyemployee_id = me.monthlyemployee_id WHERE monthlysalary_id = ?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
        
    })
}

MonthlySalary.findAll = function (result) {
    connection.query("SELECT * FROM monthly_salary ms JOIN monthly_presence mp ON ms.monthlypresence_id = mp.monthlypresence_id JOIN monthly_employee me ON ms.monthlyemployee_id = me.monthlyemployee_id", function (err, res) {
        if (err) {
            console.log("Error while fetching employees: ", err);
            result(null, err);
        }
        else {
            console.log('Monthly Salary fetched successfully: ');
            result(null, res);
        }
    })
}

MonthlySalary.update = function (id,monthlysalary, result) {
    connection.query("UPDATE monthly_salary set heure_supplementaire=?, minute_supplementaire=?,prime=?,conge=?,indeminite_transport=?,autres_indeminités=?,heure_non_imposable=?,minute_non_imposable=?,avance_quinzaine=?,avance_speciale=?,enfant_charge=?,autres_deductions=?",[monthlysalary.heure_supplementaire,monthlysalary.minute_supplementaire,monthlysalary.prime,monthlysalary.conge,monthlysalary.indeminite_transport,monthlysalary.autres_indeminités,monthlysalary.heure_non_imposable,monthlysalary.minute_non_imposable,monthlysalary.avance_quinzaine,monthlysalary.avance_speciale,monthlysalary.enfant_charge,monthlysalary.autres_deductions,id],function (err,res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

MonthlySalary.delete = function (id,result) {
    connection.query("DELETE FROM monthly_salary WHERE monthlysalary_id = ?",[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

module.exports = MonthlySalary;
