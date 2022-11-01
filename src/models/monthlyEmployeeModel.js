var connection = require('./../../config/db.config')

var Monthlyemployee = function (monthlyemployee) {
    this.monthlyemployee_id = monthlyemployee.monthlyemployee_id;
    this.matricule          = monthlyemployee.matricule;
    this.firstname          = monthlyemployee.firstname;
    this.lastname           = monthlyemployee.lastname;
    this.cin                = monthlyemployee.cin;
    this.address            = monthlyemployee.address;
    this.contact            = monthlyemployee.contact;
    this.group              = monthlyemployee.group;
    this.post_id            = monthlyemployee.post_id;
    this.status             = monthlyemployee.status;
    this.code_chantier      = monthlyemployee.code_chantier;
    this.category           = monthlyemployee.category;
    this.hiring_date        = monthlyemployee.hiring_date;
    // this.motif              = monthlyemployee.motif;
    this.ostie_num          = monthlyemployee.ostie_num;
    this.cnaps_num          = monthlyemployee.cnaps_num;
}

Monthlyemployee.create = function (newMonthlyemployee, result) {
    connection.query("INSERT INTO monthly_employee set ?", newMonthlyemployee,function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null,err)
        } else {
            console.log(res);
            result(null,res)
        }
    });
};

Monthlyemployee.findById = function (id, result) {
    connection.query("SELECT * FROM monthly_employee me JOIN post p ON me.`post_id`=p.`post_id` WHERE monthlyemployee_id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(null,res);
        }
        else{
            result(null, res);
        }
    });   
};

Monthlyemployee.findAll = function (result) {
    connection.query("SELECT * FROM monthly_employee me JOIN post p ON me.`post_id`=p.`post_id`", function (err, res) {
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

Monthlyemployee.update = function (id, monthlyemployee, result) {
    connection.query("UPDATE monthly_employee SET matricule=?,firstname=?,lastname=?,cin=?,address=?,contact=?,`group`=?,post_id=?,`status`=?,code_chantier=?,category=?,hiring_date=?,ostie_num=?,cnaps_num=? WHERE monthlyemployee_id = ? ", [monthlyemployee.matricule, monthlyemployee.firstname, monthlyemployee.lastname, monthlyemployee.cin, monthlyemployee.address, monthlyemployee.contact, monthlyemployee.group, monthlyemployee.post_id, monthlyemployee.status, monthlyemployee.code_chantier, monthlyemployee.category, monthlyemployee.hiring_date, monthlyemployee.ostie_num, monthlyemployee.cnaps_num, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Monthlyemployee.delete = function (id, result) {
    connection.query("DELETE FROM monthly_employee WHERE monthlyemployee_id = ?",[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Monthlyemployee.getcount = function (result) {
    connection.query("SELECT COUNT(monthlyemployee_id) AS count_monthlyemployee FROM monthly_employee",function(err,res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res[0].count_monthlyemployee); 
        }
    })
}



module.exports = Monthlyemployee;