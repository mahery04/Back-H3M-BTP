var connection = require('./../../config/db.config')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var MonthlyPresence = function (monthlypresence) {
    this.monthlypresence_id     = monthlypresence.monthlypresence_id
    this.monthlyweekpresence_id = monthlypresence.monthlyweekpresence_id
    this.week_id                = monthlypresence.week_id
    this.day_id                 = monthlypresence.day_id
    this.status                 = monthlypresence.status
    this.advance                = monthlypresence.advance
    this.date                   = monthlypresence.date
    this.presence_salary        = monthlypresence.presence_salary
    this.monthlyemployee_id     = monthlypresence.monthlyemployee_id
}

MonthlyPresence.action = function (id, monthlypresence, result) {
    connection.query('SELECT MAX(monthlyweekpresence_id)id FROM monthly_presence WHERE monthlyemployee_id = ?', id, function (err, last_id) {
        connection.query('SELECT salary FROM monthly_employee me JOIN post p ON me.post_id=p.`post_id` WHERE monthlyemployee_id = ?', id, function (err, salary) {
            if (monthlypresence.status=='1') {
                const newSalary = salary[0].salary - monthlypresence.advance
                connection.query('UPDATE monthly_presence SET status=?,date=?,advance=?,presence_salary=? WHERE monthlyweekpresence_id=? AND week_id=? AND day_id=?', [monthlypresence.status, date, monthlypresence.advance, newSalary, last_id[0].id, monthlypresence.week_id, monthlypresence.day_id], function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    } else {
                        result(null, res);
                    }
                })
            } else if(monthlypresence.status=='0.5') {
                const newSalary = (salary[0].salary /2) - monthlypresence.advance
                connection.query('UPDATE monthly_presence SET status=?,date=?,advance=?,presence_salary=? WHERE monthlyweekpresence_id=? AND week_id=? AND day_id=?', [monthlypresence.status, date, monthlypresence.advance, newSalary, last_id[0].id, monthlypresence.week_id, monthlypresence.day_id], function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    } else {
                        result(null, res);
                    }
                })
            } else if (monthlypresence.status=='0') {
                connection.query('UPDATE monthly_presence SET status=?,date=?,advance=?,presence_salary=? WHERE monthlyweekpresence_id=? AND week_id=? AND day_id=?', [monthlypresence.status, date, monthlypresence.advance, 0, last_id[0].id, monthlypresence.week_id, monthlypresence.day_id], function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    } else {
                        result(null, res);
                    }
                })
            }
        })
    })
}

module.exports = MonthlyPresence