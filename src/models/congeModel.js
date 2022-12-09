var connection = require('./../../config/db.config')
var moment = require('moment')

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
    this.lastDay = conge.lastDay
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
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1); 

    if (newConge.number_days === parseInt(0.5)) {
        connection.query(`INSERT INTO conge set monthlyemployee_id=?,conge_motif=?,start_conge=?,end_conge=?,number_days=0.5,conge_before_request=30,visa_rh=?,approval_direction='NON VALIDE', lastDay="${moment(firstDay).format('YYYY-MM-DD')}"`,[newConge.monthlyemployee_id, newConge.conge_motif, newConge.start_conge,newConge.end_conge, newConge.number_days, newConge.visa_rh,newConge.approval_direction], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err)
            } else {
                console.log(res)
                result(null, res)
            }
        })
    } else {
        connection.query(`SELECT DATEDIFF(?,?) as number `,[newConge.end_conge,newConge.start_conge], function (err,number) {
            if (err) {
                result(null,err)
            } 
            else {
                connection.query(`INSERT INTO conge set monthlyemployee_id=?,conge_motif=?,start_conge=?,end_conge=?,number_days=?,conge_before_request=30,visa_rh=?,approval_direction='NON VALIDE', lastDay="${moment(firstDay).format('YYYY-MM-DD')}"`,[newConge.monthlyemployee_id, newConge.conge_motif, newConge.start_conge,newConge.end_conge,number[0].number, newConge.visa_rh,newConge.approval_direction], function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err)
                    } else {
                        console.log(res);
                        result(null, res)
                    }
                })
            } 
        })
    }
}



Conge.update = function (id, conge, result) {
    connection.query(`SELECT DATEDIFF(?,?) as number `,[conge.end_conge,conge.start_conge], function (err,number) {
        if (err) {
            result(null,err)
        } 
        else {
            if (conge.conge_motif === 'Excès de permission') {
                connection.query("UPDATE conge set conge_motif=?,start_conge=?,end_conge=?,number_days=0.5,visa_rh=?,approval_direction='En attente' WHERE conge_id=?",[ conge.conge_motif, conge.start_conge,conge.end_conge ,conge.visa_rh,id], function (err, res) {
                    console.log(res);
                    result(null, res)
                })
            }
            else {
                connection.query("UPDATE conge set conge_motif=?,start_conge=?,end_conge=?,number_days=?,visa_rh=?,approval_direction='En attente' WHERE conge_id=?",[ conge.conge_motif, conge.start_conge,conge.end_conge,number[0].number,conge.visa_rh,id], function (err, res) {
                    console.log(res);
                    result(null, res)
                })
            } 
        }
    })
}

Conge.updateLastDay = function (result) {
    connection.query('SELECT conge_id, conge_before_request, lastDay FROM conge', function (err, newSoldes) {
        if (err) {
            console.log("error: ", err);
        } else {
            
            newSoldes.forEach(newSolde => {
                var date = moment(new Date()).format("YYYY-MM-DD")
                if (date == moment(newSolde.lastDay).format("YYYY-MM-DD")) {
                    connection.query(`UPDATE conge SET conge_before_request=${parseFloat(newSolde.conge_before_request)+2.5} WHERE conge_id=${newSolde.conge_id}`, function (err, res) {                    
                        var date = new Date();
                        var firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1); 
                        connection.query(`UPDATE conge SET lastDay="${moment(firstDay).format('YYYY-MM-DD')}" WHERE conge_id=${newSolde.conge_id}`)
                        console.log(res);
                        // result(null, res)               
                    })
                    console.log("LAST DAY ", newSolde.lastDay);
                    console.log("DATE ", date);
                }
            });
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

Conge.novalidation = function (id, result) {
    connection.query("UPDATE conge SET approval_direction = 'NON VALIDE' WHERE conge_id=?", id, function (err, res) {
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