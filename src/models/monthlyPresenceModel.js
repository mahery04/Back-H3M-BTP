var connection = require('./../../config/db.config')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var MonthlyPresence = function (monthlypresence) {
    this.monthlypresence_id     = monthlypresence.monthlypresence_id
    this.absence_reason                   = monthlypresence.absence_reason
    this.start_date                 = monthlypresence.start_date
    this.return_date                = monthlypresence.return_date
    this.number_days_absence        = monthlypresence.number_days_absence
    this.visa_rh        = monthlypresence.visa_rh
    this.approval_direction        = monthlypresence.approval_direction
    this.monthlyemployee_id     = monthlypresence.monthlyemployee_id
}

MonthlyPresence.getEmployee = function (result) {
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

MonthlyPresence.create = function (newPresence, result) {
    connection.query(`SELECT DATEDIFF(?,?) as number `,[newPresence.return_date,newPresence.start_date], function (err,number) {
        if (err) {
            result(null,err)
        } else {
            connection.query("INSERT INTO monthly_presence set monthlyemployee_id=?,absence_reason=?,start_date=?,return_date=?,number_days_absence=?,visa_rh=?,approval_direction='NON VALIDE'",[newPresence.monthlyemployee_id, newPresence.absence_reason, newPresence.start_date,newPresence.return_date,number[0].number-1,newPresence.visa_rh], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err)
                } else {
                    console.log(res);
                    result(null, res)
                }
            })

            console.log("PRESENCE ", newPresence);
            console.log("NUMBER DAYS ", number);

        }
    })
}

MonthlyPresence.findById = function (id,result) {
    connection.query("SELECT * FROM monthly_presence JOIN monthly_employee me ON monthly_presence.monthlyemployee_id=me.monthlyemployee_id WHERE monthlypresence_id = ? ",id, function (err, res) {
        if (err) {
            console.log("error ", err);
            result(null, err);
        }
        else {
            console.log('List presences fetched successfully: ');
            result(null, res);
        }
    })
}

MonthlyPresence.update = function (id, presence, result) {
    connection.query(`SELECT DATEDIFF(?,?) as number  `,[presence.return_date,presence.start_date], function (err,number) {
        if (err) {
            result(null,err)
        } else {
            connection.query("UPDATE monthly_presence set monthlyemployee_id=?,absence_reason=?,start_date=?,return_date=?,number_days_absence=?,visa_rh=? WHERE monthlypresence_id=?",[presence.monthlypresence_id, presence.absence_reason, presence.start_date,presence.return_date,number[0].number - 1, presence.visa_rh, id], function (err, res) {
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

MonthlyPresence.findAll = function (result) {
    connection.query("SELECT * FROM monthly_presence JOIN monthly_employee me ON monthly_presence.monthlyemployee_id=me.monthlyemployee_id", function (err, res) {
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

MonthlyPresence.delete = function (id, result) {
    connection.query("DELETE FROM monthly_presence WHERE monthlypresence_id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}



module.exports = MonthlyPresence