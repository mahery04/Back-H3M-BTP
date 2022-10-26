var connection = require('../../config/db.config')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var DailyPresence = function (dailypresence) {
    this.dailypresence_id   = dailypresence.dailypresence_id
    this.weekpresence_id    = dailypresence.weekpresence_id
    this.day_id             = dailypresence.day_id
    this.status             = dailypresence.status
    this.date               = dailypresence.date
    this.presence_salary    = dailypresence.presence_salary
    this.dailyemployee_id   = dailypresence.dailyemployee_id
}

DailyPresence.action = function(id, dailypresence ,result) {
    connection.query('SELECT MAX(weekpresence_id)id FROM daily_presence WHERE dailyemployee_id=?', id, function(err, last_id) {
        connection.query('SELECT salary FROM daily_employee de JOIN post p ON de.post_id=p.`post_id` WHERE dailyemployee_id=?', id, function(err, salary) {
            if (dailypresence.status=='1') {
                connection.query('UPDATE daily_presence SET status=?,date=?,presence_salary=? WHERE weekpresence_id=? AND day_id=? ', [dailypresence.status, date, salary[0].salary, last_id[0].id, dailypresence.day_id], function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    } else {
                        result(null, res);
                    }
                })
            } else if (dailypresence.status=='0.5') {
                const newSalary = salary[0].salary / 2
                connection.query('UPDATE daily_presence SET status=?,date=?,presence_salary=? WHERE weekpresence_id=? AND day_id=? ', [dailypresence.status, date, newSalary, last_id[0].id, dailypresence.day_id], function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    } else {
                        result(null, res);
                    }
                })
            } else if (dailypresence.status=='0') {
                connection.query('UPDATE daily_presence SET status=?,date=?,presence_salary=? WHERE weekpresence_id=? AND day_id=? ', [dailypresence.status, date, 0, last_id[0].id, dailypresence.day_id], function (err, res) {
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

// DailyPresence.salary = function (id, result) {
//     connection.query('SELECT MAX(weekpresence_id)id FROM daily_presence WHERE dailyemployee_id=?', id, function(err, last_id) {
//         connection.query('SELECT SUM(presence_salary) FROM daily_presence dp JOIN days d ON d.day_id=dp.`day_id` WHERE dp.`weekpresence_id`= ? AND dp.`dailyemployee_id`= ?', [last_id[0].id ,id], function(salary, res) {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, res);
//             }
//             else {
//                 result(null, res);
//             }
//         })
//     })
// }

module.exports = DailyPresence;