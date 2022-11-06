var connection = require('./../../config/db.config')

var Conge = function (conge) {
    this.conge_id =     conge.conge_id
    this.monthlyemployee_id = conge.monthlyemployee_id
    this.start_conge =  conge.start_conge
    this.end_conge =    conge.end_conge
    this.number_days = conge.number_days
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
    connection.query(`SELECT DATEDIFF(?,?) as number from conge `,[newConge.end_conge,newConge.start_conge], function (err,number) {
        if (err) {
            result(null,err)
        } else {
            connection.query("INSERT INTO conge set monthlyemployee_id=?,start_conge=?,end_conge=?,number_days=?",[newConge.monthlyemployee_id, newConge.start_conge,newConge.end_conge,number[0].number], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err)
                } else {
                    console.log(res);
                    result(null, res)
                }
            })

            console.log("NUMBER OF DAYS ", number);
        }
    })
}

Conge.update = function (id, conge, result) {
    connection.query(`SELECT DATEDIFF(?,?) as number from conge `,[conge.end_conge,conge.start_conge], function (err,number) {
        if (err) {
            result(null,err)
        } else {
            connection.query("UPDATE conge set start_conge=?,end_conge=?,number_days=? WHERE conge_id=?",[conge.start_conge,conge.end_conge,number[0].number,id], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err)
                } else {
                    console.log(res);
                    result(null, res)
                }
            })

            // console.log("NUMBER OF DAYS ", number);
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