var connection = require('./../../config/db.config')
var moment = require('moment')

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

var Permission = function (permission) {
    this.permission_id = permission.permission_id
    this.date_permission = permission.date_permission
    this.permission_reason = permission.permission_reason
    this.start_hour_time = permission.start_hour_time
    this.return_hour_time = permission.return_hour_time
    this.start_minute_time = permission.start_minute_time
    this.return_minute_time = permission.return_minute_time
    this.number_time_permission = permission.number_time_permission
    this.permission_hour_before_request = permission.permission_hour_before_request
    this.permission_minute_before_request = permission.permission_minute_before_request
    this.new_solde_permission = permission.new_solde_permission
    this.visa_rh = permission.visa_rh
    this.approval_direction = permission.approval_direction
    this.par = permission.par
    this.monthlyemployee_id = permission.monthlyemployee_id
}

Permission.getEmployee = function (result) {
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

// Permission.create = function (newPermission, result) {
//     connection.query(`SELECT TIMEDIFF(?,?) as number `, [newPermission.return_time, newPermission.start_time], function (err, number) {
//         if (err) {
//             result(null, err)
//         } else {
//             connection.query(`SELECT TIMEDIFF(?,?) as solde`, [newPermission.permission_before_request, number[0].number], function (err, solde) {
//                 if (err) {
//                     result(null,err)
//                 } else {
//                     console.log("NS ", solde[0].solde);
//                     connection.query("INSERT INTO permission set monthlyemployee_id=?,permission_reason=?,start_time=?,return_time=?,number_time_permission=?,permission_before_request=?, new_solde_permission=?, visa_rh=?,approval_direction='NON VALIDE'", [newPermission.monthlyemployee_id, newPermission.permission_reason, newPermission.start_time, newPermission.return_time, number[0].number,newPermission.permission_before_request, solde[0].solde, newPermission.visa_rh], function (err, res) {
//                         if (err) {
//                             console.log("error: ", err);
//                             result(null, err)
//                         } else {
//                             console.log(res);
//                             // result(null, res)
//                             if (parseInt(number[0].number.split(':')[0]) > 2) {
//                                 connection.query(`INSERT INTO conge SET monthlyemployee_id=${newPermission.monthlyemployee_id},conge_motif='Excès de permission',visa_rh='En attente',approval_direction='NON VALIDE'`)
//                             }
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }

Permission.create = function (newPermission, result) {
    connection.query("INSERT INTO permission set monthlyemployee_id=?,date_permission=?, permission_reason=?,start_hour_time=?,start_minute_time=?,return_hour_time=?,return_minute_time=?,number_time_permission=?,permission_hour_before_request=80, permission_minute_before_request=00, new_solde_permission=?, visa_rh=?,approval_direction='NON VALIDE',par=?", [newPermission.monthlyemployee_id, newPermission.date_permission, newPermission.permission_reason, newPermission.start_hour_time, newPermission.start_minute_time, newPermission.return_hour_time, newPermission.return_minute_time, `${newPermission.return_hour_time-newPermission.start_hour_time} ${newPermission.return_minute_time-newPermission.start_minute_time}`,  `${(newPermission.permission_hour_before_request - (newPermission.return_hour_time-newPermission.start_hour_time))} ${(newPermission.permission_minute_before_request - (newPermission.return_minute_time-newPermission.start_minute_time))}`, newPermission.visa_rh,newPermission.par], function (err, res) {
        var date = new Date(newPermission.date_permission);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        var dateTomorrow = new Date(date.getFullYear(), date.getMonth() + 1, 1);console.log(dateTomorrow)

        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);        

            if (parseInt(`${newPermission.return_hour_time-newPermission.start_hour_time} ${newPermission.return_minute_time-newPermission.start_minute_time}`.split(':')[0]) > 2) {
               
                if (date.getDate() === lastDay.getDate()) {
                    connection.query(`INSERT INTO conge SET monthlyemployee_id=${newPermission.monthlyemployee_id},conge_motif='Excès de permission',start_conge="${newPermission.date_permission}",end_conge="${moment(dateTomorrow).format("YYYY-MM-DD")}",number_days=0.5,visa_rh='En attente',approval_direction='En attente'`)
                    result(null, res)
                    
                } else {
                    connection.query(`INSERT INTO conge SET monthlyemployee_id=${newPermission.monthlyemployee_id},conge_motif='Excès de permission',start_conge="${newPermission.date_permission}",end_conge="${new Date(newPermission.date_permission).getFullYear()}-${new Date(newPermission.date_permission).getMonth()+1}-${new Date(newPermission.date_permission).getDate()+1}",number_days=0.5,visa_rh='En attente',approval_direction='En attente'`)
                    result(null, res)
                }
            } 
        }
    })     
}

Permission.findById = function (id, result) {
    connection.query("SELECT * FROM permission JOIN monthly_employee me ON permission.monthlyemployee_id=me.monthlyemployee_id WHERE permission_id = ? ", id, function (err, res) {
        if (err) {
            console.log("error ", err);
            result(null, err);
        }
        else {
            console.log('List permission fetched successfully: ');
            result(null, res);
        }
    })
}

Permission.update = function (id, permission, result) {
    connection.query("UPDATE permission set date_permission=?, permission_reason=?,start_hour_time=?,start_minute_time=?,return_hour_time=?,return_minute_time=?,number_time_permission=?, visa_rh=?,approval_direction='NON VALIDE' WHERE permission_id=?", [permission.date_permission, permission.permission_reason, permission.start_hour_time, permission.start_minute_time, permission.return_hour_time, permission.return_minute_time, `${permission.return_hour_time-permission.start_hour_time} ${permission.return_minute_time-permission.start_minute_time}`,permission.visa_rh, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
            // if (parseInt(`${permission.return_hour_time-permission.start_hour_time} ${permission.return_minute_time-permission.start_minute_time}`.split(':')[0]) > 2) {
            //     connection.query(`INSERT INTO conge SET monthlyemployee_id=${permission.monthlyemployee_id},conge_motif='Excès de permission',visa_rh='En attente',approval_direction='NON VALIDE'`)
            // }
        }
    })     
}

Permission.validation = function (id, result) {
    connection.query("UPDATE permission SET approval_direction = 'VALIDE' WHERE permission_id=?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    })
}

Permission.findAll = function (result) {
    connection.query("SELECT * FROM permission JOIN monthly_employee me ON permission.monthlyemployee_id=me.monthlyemployee_id", function (err, res) {
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

Permission.delete = function (id, result) {
    connection.query("DELETE FROM permission WHERE permission_id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}



module.exports = Permission