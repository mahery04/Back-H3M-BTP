var connection = require('./../../config/db.config')

var Weekpresence = function (weekpresence) {
    this.weekpresence_id    = weekpresence.weekpresence_id
    this.month              = weekpresence.month
    this.first_date         = weekpresence.first_date
    this.last_date          = weekpresence.last_date
    this.nb_present         = weekpresence.nb_present
    this.total_salary       = weekpresence.total_salary
    this.validation         = weekpresence.validation
    this.dailyemployee_id   = weekpresence.dailyemployee_id
}

Weekpresence.getMonth = function (result) {
    connection.query('SELECT MIN(weekpresence_id) AS id, MONTH FROM week_presence GROUP BY MONTH', function (err,res) {
        if (err) {
            console.log("Error on fetch month",err);
            result(null,err)
        } 
        else {
            console.log(res);
            result(null,res)
        }
    }) 
}

Weekpresence.globalView = function (month, result) {
    connection.query('SELECT * FROM `week_presence` wp JOIN daily_employee de ON wp.`dailyemployee_id`=de.`dailyemployee_id` JOIN post p ON de.post_id=p.`post_id` WHERE wp.`month`=?', month.month, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    })
}

Weekpresence.create = function (id, newWeekpresence, result) {
    newWeekpresence.validation = 'NON VALIDE'
    connection.query('INSERT INTO week_presence SET ?', newWeekpresence, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res)
            result(null, res)
            connection.query(`SELECT * FROM week_presence ORDER BY weekpresence_id DESC LIMIT 0,1`, function (err, last_id) {
                // connection.query('SELECT * FROM days', function (err, days) {
                //     days.forEach(day => {
                //         connection.query('INSERT INTO daily_presence SET weekpresence_id=?,day_id=?,status=NULL,date=NULL,presence_salary=NULL,dailyemployee_id=?', [last_id[0].weekpresence_id, day.day_id, id])
                //     });
                // })
                
            })
        }
    })
}

Weekpresence.update = function (id, result) {
    connection.query("UPDATE week_presence SET validation= 'VALIDE' WHERE weekpresence_id=?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    })
}

Weekpresence.getById = function (id, result) {
    connection.query('SELECT MAX(weekpresence_id)id FROM daily_presence WHERE dailyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT dailypresence_id, day_text, `status`, date, presence_salary FROM daily_presence dp JOIN days d ON d.day_id=dp.`day_id` WHERE dp.`weekpresence_id`= ? AND dp.`dailyemployee_id`= ?', [last_id[0].id, id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, res);
            }
            else {
                result(null, res);
            }
        })
    })
}

Weekpresence.salary = function (id, result) {
    connection.query('SELECT MAX(weekpresence_id)id FROM daily_presence WHERE dailyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT SUM(presence_salary) AS total_salary FROM daily_presence dp JOIN days d ON d.day_id=dp.`day_id` WHERE dp.`weekpresence_id`= ? AND dp.`dailyemployee_id`= ?', [last_id[0].id, id], function (err, salary) {
            connection.query(`UPDATE week_presence SET total_salary = ${salary[0].total_salary} WHERE weekpresence_id=${last_id[0].id}`, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, res);
                }
                else {
                    result(null, res);
                }
            })
        })
    })
}

Weekpresence.getSalary = function (id, result) {
    connection.query('SELECT MAX(weekpresence_id)id FROM daily_presence WHERE dailyemployee_id=?', id, function (err, last_id) {
        connection.query(`SELECT total_salary FROM week_presence WHERE weekpresence_id=${last_id[0].id}`, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, res);
            }
            else {
                result(null, res);
            }
        })
    })
}

Weekpresence.setPresence = function (id, result) {
    connection.query('SELECT MAX(weekpresence_id)id FROM daily_presence WHERE dailyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT COUNT(STATUS) AS nb_presence FROM daily_presence dp WHERE dp.weekpresence_id= ? AND dp.dailyemployee_id= ? AND dp.status=1', [last_id[0].id, id], function (err, presence) {
            connection.query(`UPDATE week_presence SET nb_present=${presence[0].nb_presence} WHERE weekpresence_id=${last_id[0].id}`, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, res);
                }
                else {
                    result(null, res);
                }
            })
        })
    })
}

Weekpresence.nbPresence = function (id, result) {
    connection.query('SELECT MAX(weekpresence_id)id FROM daily_presence WHERE dailyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT COUNT(STATUS) AS nb_presence FROM daily_presence dp WHERE dp.weekpresence_id= ? AND dp.dailyemployee_id= ? AND dp.status=1', [last_id[0].id, id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, res);
            }
            else {
                result(null, res);
            }
        })
    })
}

Weekpresence.setAbsence = function (id, result) {
    connection.query('SELECT MAX(weekpresence_id)id FROM daily_presence WHERE dailyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT COUNT(STATUS) AS nb_absence FROM daily_presence dp WHERE dp.weekpresence_id= ? AND dp.dailyemployee_id= ? AND dp.status=0', [last_id[0].id, id], function (err, absence) {
            connection.query(`UPDATE week_presence SET nb_absent=${absence[0].nb_absence} WHERE weekpresence_id=${last_id[0].id}`, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, res);
                }
                else {
                    result(null, res);
                }
            })
            // console.log(absence)
        })
    })
}

Weekpresence.nbAbsence = function (id, result) {
    connection.query('SELECT MAX(weekpresence_id)id FROM daily_presence WHERE dailyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT COUNT(STATUS) AS nb_absence FROM daily_presence dp WHERE dp.weekpresence_id= ? AND dp.dailyemployee_id= ? AND dp.status=0', [last_id[0].id, id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, res);
            }
            else {
                result(null, res);
            }
        })
    })
}

Weekpresence.history = function (id, result) {
    connection.query('SELECT * FROM week_presence wp JOIN daily_employee de ON wp.dailyemployee_id=de.dailyemployee_id WHERE wp.dailyemployee_id=?',id , function (err, res) {
        if (err) {
            console.log("Error while fetching weeks: ", err);
            result(null, err);
        }
        else {
            console.log('Weeks fetched successfully: ');
            result(null, res);
        }
    })
}


module.exports = Weekpresence;