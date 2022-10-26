var connection = require('./../../config/db.config')

var Monthlyweekpresence = function (monthlyweekpresence) {
    this.monthlyweekpresence_id = monthlyweekpresence.monthlyweekpresence_id
    this.month                  = monthlyweekpresence.month
    this.first_date             = monthlyweekpresence.first_date
    this.last_date              = monthlyweekpresence.last_date
    this.nb_present             = monthlyweekpresence.nb_present
    this.nb_absent              = monthlyweekpresence.nb_absent
    this.total_advance          = monthlyweekpresence.total_advance
    this.total_salary           = monthlyweekpresence.total_salary
    this.validation             = monthlyweekpresence.validation
    this.monthlyemployee_id     = monthlyweekpresence.monthlyemployee_id
}


Monthlyweekpresence.globalView = function (month, result) {
    connection.query('SELECT * FROM `monthlyweek_presence` mwp JOIN monthly_employee me ON mwp.`monthlyemployee_id`=me.`monthlyemployee_id` JOIN post p ON me.post_id=p.post_id WHERE mwp.`month`=?', month.month, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    })
}

Monthlyweekpresence.getMonth = function (result) {
    connection.query('SELECT MIN(monthlyweekpresence_id) AS id, MONTH FROM monthlyweek_presence GROUP BY MONTH', function (err, res) {
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

Monthlyweekpresence.create = function (id, newMonthlyweekpresence, result) {
    newMonthlyweekpresence.validation = 'NON VALIDE'
    connection.query('INSERT INTO monthlyweek_presence SET ?', newMonthlyweekpresence, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res)
            result(null, res)
            connection.query(`SELECT * FROM monthlyweek_presence ORDER BY monthlyweekpresence_id DESC LIMIT 0,1`, function (err, last_id) {
                connection.query('SELECT * FROM weeks', function (err, weeks) {
                    weeks.forEach(week => {
                        connection.query('SELECT * FROM days', function(err, days) {
                            days.forEach(day => {
                                connection.query('INSERT INTO monthly_presence SET monthlyweekpresence_id=?,date=NULL,week_id=?,day_id=?,status=NULL,advance=NULL,presence_salary=NULL,monthlyemployee_id=?', [last_id[0].monthlyweekpresence_id, week.week_id, day.day_id, id])
                            })
                        })
                    });
                })
            })
        }
    })
}

Monthlyweekpresence.update = function (id, result) {
    connection.query("UPDATE monthlyweek_presence SET validation= 'VALIDE' WHERE monthlyweekpresence_id=?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    })
}

Monthlyweekpresence.getById = function (id, result) {
    connection.query('SELECT MAX(monthlyweekpresence_id)id FROM monthly_presence WHERE monthlyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT monthlypresence_id, day_text, week_text, `status`, date, advance, presence_salary FROM monthly_presence mp JOIN days d ON d.day_id=mp.day_id JOIN weeks w ON w.week_id=mp.week_id WHERE mp.monthlyweekpresence_id=? AND mp.monthlyemployee_id=?', [last_id[0].id, id], function (err, res) {
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

Monthlyweekpresence.setPresence = function (id, result) {
    connection.query('SELECT MAX(monthlyweekpresence_id)id FROM monthly_presence WHERE monthlyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT COUNT(STATUS) AS nb_presence FROM monthly_presence mp WHERE mp.monthlyweekpresence_id= ? AND mp.monthlyemployee_id= ? AND mp.status=1', [last_id[0].id, id], function (err, presence) {
            connection.query(`UPDATE monthlyweek_presence SET nb_present=${presence[0].nb_presence} WHERE monthlyweekpresence_id=${last_id[0].id}`, function (err, res) {
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

Monthlyweekpresence.nbPresence = function (id, result) {
    connection.query('SELECT MAX(monthlyweekpresence_id)id FROM monthly_presence WHERE monthlyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT COUNT(STATUS) AS nb_presence FROM monthly_presence mp WHERE mp.monthlyweekpresence_id= ? AND mp.monthlyemployee_id= ? AND mp.status=1', [last_id[0].id, id], function (err, res) {
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

Monthlyweekpresence.setAbsence = function (id, result) {
    connection.query('SELECT MAX(monthlyweekpresence_id)id FROM monthly_presence WHERE monthlyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT COUNT(STATUS) AS nb_absence FROM monthly_presence mp WHERE mp.monthlyweekpresence_id= ? AND mp.monthlyemployee_id= ? AND mp.status=0', [last_id[0].id, id], function (err, absence) {
            connection.query(`UPDATE monthlyweek_presence SET nb_absent=${absence[0].nb_absence} WHERE monthlyweekpresence_id=${last_id[0].id}`, function (err, res) {
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

Monthlyweekpresence.nbAbsence = function (id, result) {
    connection.query('SELECT MAX(monthlyweekpresence_id)id FROM monthly_presence WHERE monthlyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT COUNT(STATUS) AS nb_absence FROM monthly_presence mp WHERE mp.monthlyweekpresence_id= ? AND mp.monthlyemployee_id= ? AND mp.status=0', [last_id[0].id, id], function (err, res) {
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

Monthlyweekpresence.salary = function (id, result) {
    connection.query('SELECT MAX(monthlyweekpresence_id)id FROM monthly_presence WHERE monthlyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT SUM(presence_salary) AS total_salary FROM monthly_presence mp JOIN weeks w ON w.week_id=mp.week_id JOIN days d ON d.day_id=mp.`day_id` WHERE mp.`monthlyweekpresence_id`= ? AND mp.`monthlyemployee_id`= ?', [last_id[0].id, id], function (err, salary) {
            connection.query(`UPDATE monthlyweek_presence SET total_salary = ${salary[0].total_salary} WHERE monthlyweekpresence_id=${last_id[0].id}`, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, res);
                }
                else {
                    result(null, res);
                }
            })
        })
        // console.log(last_id)
    })
}

Monthlyweekpresence.getSalary = function (id, result) {
    connection.query('SELECT MAX(monthlyweekpresence_id)id FROM monthly_presence WHERE monthlyemployee_id=?', id, function (err, last_id) {
        connection.query(`SELECT total_salary FROM monthlyweek_presence WHERE monthlyweekpresence_id=${last_id[0].id}`, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, res);
            }
            else {
                result(null, res);
            }
            // console.log(res)
        })
    })
}

Monthlyweekpresence.advance = function (id, result) {
    connection.query('SELECT MAX(monthlyweekpresence_id)id FROM monthly_presence WHERE monthlyemployee_id=?', id, function (err, last_id) {
        connection.query('SELECT SUM(advance) AS total_advance FROM monthly_presence mp JOIN weeks w ON w.week_id=mp.week_id JOIN days d ON d.day_id=mp.`day_id` WHERE mp.`monthlyweekpresence_id`= ? AND mp.`monthlyemployee_id`= ?', [last_id[0].id, id], function (err, advance) {
            connection.query(`UPDATE monthlyweek_presence SET total_advance = ${advance[0].total_advance} WHERE monthlyweekpresence_id=${last_id[0].id}`, function (err, res) {
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

Monthlyweekpresence.getAdvance = function (id, result) {
    connection.query('SELECT MAX(monthlyweekpresence_id)id FROM monthly_presence WHERE monthlyemployee_id=?', id, function (err, last_id) {
        connection.query(`SELECT total_advance FROM monthlyweek_presence WHERE monthlyweekpresence_id=${last_id[0].id}`, function (err, res) {
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

Monthlyweekpresence.history = function (id, result) {
    connection.query('SELECT * FROM monthlyweek_presence mwp JOIN monthly_employee me ON mwp.monthlyemployee_id=me.monthlyemployee_id WHERE mwp.monthlyemployee_id=?', id, function (err, res) {
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

module.exports = Monthlyweekpresence