var connection = require('./../../config/db.config')

var Dailyemployee = function (dailyemployee) {
    this.dailyemployee_id   = dailyemployee.dailyemployee_id;
    this.matricule          = dailyemployee.matricule;
    this.firstname          = dailyemployee.firstname;
    this.lastname           = dailyemployee.lastname;
    this.cin                = dailyemployee.cin;
    this.address            = dailyemployee.address;
    this.post_id            = dailyemployee.post_id;
    this.code_chantier      = dailyemployee.code_chantier;
    this.group              = dailyemployee.group;
    this.contact            = dailyemployee.contact;
    this.category           = dailyemployee.category;
    this.hiring_date        = dailyemployee.hiring_date;
    this.status             = dailyemployee.status
    // this.salary             = dailyemployee.salary;
    this.remarque           = dailyemployee.remarque;
};

Dailyemployee.create = function (newDailyemployee, result) {
    connection.query("INSERT INTO daily_employee set ?", newDailyemployee, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    });
};

Dailyemployee.findById = function (id, result) {
    connection.query("SELECT * FROM daily_employee de JOIN post p ON de.`post_id`=p.`post_id` WHERE dailyemployee_id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, res);
        }
        else {
            result(null, res);
        }
    });
};

Dailyemployee.findAll = function (result) {
    connection.query("SELECT * FROM daily_employee JOIN post ON daily_employee.post_id = post.post_id", function (err, res) {
        if (err) {
            console.log("Error while fetching employees: ", err);
            result(null, err);
        }
        else {
            console.log('Employees fetched successfully: ');
            result(null, res);
        }
    });
};

Dailyemployee.update = function (id, dailyemployee, result) {
    // if (dailyemployee.start_date == "Invalid date" && dailyemployee.hiring_date == "Invalid date") {
    //     dailyemployee.start_date == null
    //     dailyemployee.hiring_date == null
    // }
    connection.query("UPDATE daily_employee SET matricule=?,firstname=?,lastname=?,cin=?,address=?,post_id=?,code_chantier=?,`group`=?,contact=?,category=?,hiring_date=?,status=?,remarque=? WHERE dailyemployee_id = ? ", [dailyemployee.matricule, dailyemployee.firstname, dailyemployee.lastname, dailyemployee.cin, dailyemployee.address, dailyemployee.post_id, dailyemployee.code_chantier, dailyemployee.group, dailyemployee.contact, dailyemployee.category, dailyemployee.hiring_date , dailyemployee.status, dailyemployee.remarque,id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Dailyemployee.delete = function (id, result) {
    connection.query("DELETE FROM daily_employee WHERE dailyemployee_id = ?",[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Dailyemployee.getcount = function (result) {
    connection.query("SELECT COUNT(dailyemployee_id) AS count_dailyemployee FROM daily_employee",function(err,res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res[0].count_dailyemployee); 
        }
    })
}

module.exports = Dailyemployee;