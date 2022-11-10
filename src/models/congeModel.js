var connection = require('./../../config/db.config')

var Conge = function (conge) {
    this.conge_id =     conge.conge_id
    this.monthlyemployee_id = conge.monthlyemployee_id
    this.conge_motif = conge.conge_motif
    this.start_conge =  conge.start_conge
    this.end_conge =    conge.end_conge
    this.number_days = conge.number_days
    this.conge_before_request = conge.conge_before_request
    this.new_solde_conge = conge.new_solde_conge
    this.visa_rh = conge.visa_rh
    this.approval_direction = conge.approval_direction
}

Conge.getEmployee = function (result) {
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

Conge.findById = function (id,result) {
    connection.query("SELECT * FROM conge JOIN monthly_employee me ON conge.monthlyemployee_id=me.monthlyemployee_id WHERE conge_id = ? ",id, function (err, res) {
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
    connection.query(`SELECT DATEDIFF(?,?) as number `,[newConge.end_conge,newConge.start_conge], function (err,number) {
        if (err) {
            result(null,err)
        } else {
            var numberRestConge = parseInt(newConge.conge_before_request) - (number[0].number-1)
            connection.query("INSERT INTO conge set monthlyemployee_id=?,conge_motif=?,start_conge=?,end_conge=?,number_days=?,conge_before_request=?,new_solde_conge=?,visa_rh=?,approval_direction='NON VALIDE'",[newConge.monthlyemployee_id, newConge.conge_motif, newConge.start_conge,newConge.end_conge,number[0].number-1, parseInt(newConge.conge_before_request), numberRestConge, newConge.visa_rh,newConge.approval_direction], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err)
                } else {
                    console.log(res);
                    result(null, res)
                }
            })

            // console.log("NUMBER OF DAYS ", number[0].number-1);
            // console.log("SUBSTRACT ", newConge.conge_before_request - (number[0].number-1));
        }
    })
}

Conge.update = function (id, conge, result) {
    connection.query(`SELECT DATEDIFF(?,?) as number `,[conge.end_conge,conge.start_conge], function (err,number) {
        if (err) {
            result(null,err)
        } else {
            var numberRestConge = parseInt(conge.conge_before_request) - (number[0].number-1)
            connection.query("UPDATE conge set conge_motif=?,start_conge=?,end_conge=?,number_days=?,conge_before_request=?,new_solde_conge=?,visa_rh=?,approval_direction='NON VALIDE' WHERE conge_id=?",[conge.monthlyemployee_id, conge.conge_motif, conge.start_conge,conge.end_conge,number[0].number-1, parseInt(conge.conge_before_request), numberRestConge, conge.visa_rh,conge.approval_direction,id], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err)
                } else {
                    console.log(res);
                    result(null, res)
                }
            })

            // console.log("NUMBER OF DAYS ", number[0].number-1);
            // console.log("SUBSTRACT ", newConge.conge_before_request - (number[0].number-1));
        }
    })
}

Conge.validation = function (id, result) {
    connection.query("UPDATE conge SET approval_direction = 'VALIDE' WHERE conge_id=?", id, function (err, res) {
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
    connection.query("SELECT * FROM conge JOIN monthly_employee me ON conge.monthlyemployee_id=me.monthlyemployee_id", function (err, res) {
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