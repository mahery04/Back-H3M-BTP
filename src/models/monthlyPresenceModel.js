var connection = require('./../../config/db.config')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var MonthlyPresence = function (monthlypresence) {
    this.monthlypresence_id     = monthlypresence.monthlypresence_id
    this.monthlyweekpresence_id = monthlypresence.monthlyweekpresence_id
    this.date                   = monthlypresence.date
    this.status                 = monthlypresence.status
    this.advance                = monthlypresence.advance
    this.presence_salary        = monthlypresence.presence_salary
    this.monthlyemployee_id     = monthlypresence.monthlyemployee_id
}

MonthlyPresence.action = function (id, monthlypresence, result) {
    connection.query('SELECT MAX(monthlyweekpresence_id)id FROM monthlyweek_presence WHERE monthlyemployee_id = ?', id, function (err, last_id) {
        connection.query('SELECT salary FROM monthly_employee me JOIN post p ON me.post_id=p.`post_id` WHERE monthlyemployee_id = ?', id, function (err, salary) {
            if (monthlypresence.status=='1') {
                const newSalary = salary[0].salary - monthlypresence.advance
                connection.query(`INSERT INTO monthly_presence SET monthlyweekpresence_id=${last_id[0].id},date="${monthlypresence.date}",status=${monthlypresence.status},advance=${monthlypresence.advance},presence_salary=${newSalary},monthlyemployee_id=${id}`, function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    } else {
                        result(null, res);
                    }
                })
            } else if(monthlypresence.status=='0.5') {
                const newSalary = (salary[0].salary /2) - monthlypresence.advance
                connection.query(`INSERT INTO monthly_presence SET monthlyweekpresence_id=${last_id[0].id},date="${monthlypresence.date}",status=${monthlypresence.status},advance=${monthlypresence.advance},presence_salary=${newSalary},monthlyemployee_id=${id}`, function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    } else {
                        result(null, res);
                    }
                })
            } else if (monthlypresence.status=='0') {
                connection.query(`INSERT INTO monthly_presence SET monthlyweekpresence_id=${last_id[0].id},date="${monthlypresence.date}",status=${monthlypresence.status},advance=${monthlypresence.advance},presence_salary=0,monthlyemployee_id=${id}`, function (err, res) {
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