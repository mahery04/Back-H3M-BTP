var connection = require('./../../config/db.config')

var Conge = function (conge) {
    this.conge_id =     conge.conge_id
    this.employee =     conge.employee
    this.start_conge =  conge.start_conge
    this.end_conge =    conge.end_conge
}

Conge.getEmployee = function (result) {
    connection.query("SELECT matricule,firstname,lastname FROM daily_employee UNION SELECT matricule,firstname,lastname FROM monthly_employee", function (err, res) {
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

Conge.findById = function (id,result) {
    connection.query("SELECT * FROM conge WHERE conge_id = ? ",id, function (err, res) {
        if (err) {
            console.log("error ", err);
            result(null, err);
        }
        else {
            console.log('List conges fetched successfully: ');
            result(null, res);
        }
    })
}

Conge.create = function (newConge, result) {
    connection.query("INSERT INTO conge set ?", newConge, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    })
}

Conge.update = function (id, conge, result) {
    connection.query("UPDATE conge SET start_conge=?, end_conge=? WHERE conge_id=?", [conge.start_conge,conge.end_conge,id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    })
}

Conge.findAll = function (result) {
    connection.query("SELECT * FROM conge", function (err, res) {
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

Conge.delete = function (id, result) {
    connection.query("DELETE FROM conge WHERE conge_id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

module.exports = Conge