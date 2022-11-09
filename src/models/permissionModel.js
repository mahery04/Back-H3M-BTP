var connection = require('./../../config/db.config')

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

var Permission = function (permission) {
    this.permission_id = permission.permission_id
    this.permission_reason = permission.permission_reason
    this.start_time = permission.start_time
    this.return_time = permission.return_time
    this.number_time_permission = permission.number_time_permission
    this.permission_before_request = permission.permission_before_request
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

Permission.create = function (newPermission, result) {
    connection.query(`SELECT TIMEDIFF(?,?) as number `, [newPermission.return_time, newPermission.start_time], function (err, number) {
        if (err) {
            result(null, err)
        } else {
            // var newPermissionRequestHours = newPermission.permission_before_request.split(':')[0]
            // var newNumberTimePermissionHours = number[0].number.split(':')[0]
            // var newPermissionRequestMinutes = newPermission.permission_before_request.split(':')[1]
            // var newNumberTimePermissionMinutes = number[0].number.split(':')[1]
            // var newPermissionRequestSecondes = newPermission.permission_before_request.split(':')[2]
            // var newNumberTimePermissionSecondes = number[0].number.split(':')[2]

            // var newSolde = `${parseInt(newPermissionRequestHours) - parseInt(newNumberTimePermissionHours)}:${parseInt(newPermissionRequestMinutes) - parseInt(newNumberTimePermissionMinutes)}:${parseInt(newPermissionRequestSecondes) - parseInt(newNumberTimePermissionSecondes)}`
            connection.query(`SELECT TIMEDIFF(?,?) as solde`, [newPermission.permission_before_request, number[0].number], function (err, solde) {
                if (err) {
                    result(null,err)
                } else {
                    result(null,solde)
                    console.log("NS ", solde[0].solde);
                }
            })

            // connection.query("INSERT INTO permission set monthlyemployee_id=?,permission_reason=?,start_time=?,return_time=?,number_time_permission=?,permission_before_request=?, new_solde_permission=?, visa_rh=?,approval_direction='NON VALIDE'", [newPermission.monthlyemployee_id, newPermission.permission_reason, newPermission.start_time, newPermission.return_time, number[0].number,newPermission.permission_before_request, newPermission.permission_before_request - newPermission.number_time_permission, newPermission.visa_rh], function (err, res) {
            //     if (err) {
            //         console.log("error: ", err);
            //         result(null, err)
            //     } else {
            //         console.log(res);
            //         result(null, res)
            //     }
            // })

            console.log("permission ", newPermission);
            console.log("NUMBER Time ", number);

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
    connection.query(`SELECT TIMEDIFF(?,?) as number  `, [permission.return_time, permission.start_time], function (err, number) {
        if (err) {
            result(null, err)
        } else {
            connection.query("UPDATE permission set permission_reason=?,start_time=?,return_time=?,number_time_permission=?, permission_before_request=?, new_solde_permission=?, visa_rh=? WHERE permission_id=?", [permission.permission_reason, permission.start_time, permission.return_time, number[0].number, permission.permission_before_request, permission.permission_before_request - permission.number_time_permission, permission.visa_rh, id], function (err, res) {
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