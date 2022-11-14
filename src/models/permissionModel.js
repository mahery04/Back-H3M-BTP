var connection = require('./../../config/db.config')

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

var Permission = function (permission) {
    this.permission_id = permission.permission_id
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
//                                 connection.query(`INSERT INTO conge SET monthlyemployee_id=${newPermission.monthlyemployee_id},conge_motif='Exces de permission',visa_rh='En attente',approval_direction='NON VALIDE'`)
//                             }
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }

Permission.create = function (newPermission, result) {
    connection.query("INSERT INTO permission set monthlyemployee_id=?,permission_reason=?,start_hour_time=?,start_minute_time=?,return_hour_time=?,return_minute_time=?,number_time_permission=?,permission_hour_before_request=?, permission_minute_before_request=?, new_solde_permission=?, visa_rh=?,approval_direction='NON VALIDE'", [newPermission.monthlyemployee_id, newPermission.permission_reason, newPermission.start_hour_time, newPermission.start_minute_time, newPermission.return_hour_time, newPermission.return_minute_time, `${newPermission.return_hour_time-newPermission.start_hour_time} ${newPermission.return_minute_time-newPermission.start_minute_time}`,newPermission.permission_hour_before_request, newPermission.permission_minute_before_request,  `${(newPermission.permission_hour_before_request - (newPermission.return_hour_time-newPermission.start_hour_time))} ${(newPermission.permission_minute_before_request - (newPermission.return_minute_time-newPermission.start_minute_time))}`, newPermission.visa_rh], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            // result(null, res)
            if (parseInt(`${newPermission.return_hour_time-newPermission.start_hour_time} ${newPermission.return_minute_time-newPermission.start_minute_time}`.split(':')[0]) > 2) {
                connection.query(`INSERT INTO conge SET monthlyemployee_id=${newPermission.monthlyemployee_id},conge_motif='Exces de permission',visa_rh='En attente',approval_direction='NON VALIDE'`)
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

// Permission.update = function (id, permission, result) {
//     connection.query(`SELECT TIMEDIFF(?,?) as number `, [permission.return_time, permission.start_time], function (err, number) {
//         if (err) {
//             result(null, err)
//         } else {
//             connection.query(`SELECT TIMEDIFF(?,?) as solde`, [permission.permission_before_request, number[0].number], function (err, solde) {
//                 if (err) {
//                     result(null,err)
//                 } else {
//                     console.log("NS ", solde[0].solde);
//                     connection.query("UPDATE permission set permission_reason=?,start_time=?,return_time=?,number_time_permission=?,permission_before_request=?, new_solde_permission=?, visa_rh=?,approval_direction='NON VALIDE' WHERE permission_id=?", [ permission.permission_reason, permission.start_time, permission.return_time, number[0].number,permission.permission_before_request, solde[0].solde, permission.visa_rh,id], function (err, res) {
//                         if (err) {
//                             console.log("error: ", err);
//                             result(null, err)
//                         } else {
//                             console.log(res);
//                             result(null, res)
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }

Permission.update = function (id, permission, result) {
    connection.query("UPDATE permission set permission_reason=?,start_hour_time=?,start_minute_time=?,return_hour_time=?,return_minute_time=?,number_time_permission=?,permission_hour_before_request=?, permission_minute_before_request=?, new_solde_permission=?, visa_rh=?,approval_direction='NON VALIDE'", [permission.permission_reason, permission.start_hour_time, permission.start_minute_time, permission.return_hour_time, permission.return_minute_time, `${permission.return_hour_time-permission.start_hour_time} ${permission.return_minute_time-permission.start_minute_time}`,permission.permission_hour_before_request, permission.permission_minute_before_request, permission.new_solde_permission, permission.visa_rh,id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            // result(null, res)
            if (parseInt(`${permission.return_hour_time-permission.start_hour_time} ${permission.return_minute_time-permission.start_minute_time}`.split(':')[0]) > 2) {
                connection.query(`INSERT INTO conge SET monthlyemployee_id=${permission.monthlyemployee_id},conge_motif='Exces de permission',visa_rh='En attente',approval_direction='NON VALIDE'`)
            }
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