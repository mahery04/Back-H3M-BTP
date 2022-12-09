var connection = require('./../../config/db.config')

var EmployeeFamily = function(employeefamily) {
    this.family_id          = employeefamily.family_id;
    this.name_conjoint      = employeefamily.name_conjoint;
    this.number_child       = employeefamily.number_child;
    this.monthlyemployee_id = employeefamily.monthlyemployee_id;
}

EmployeeFamily.getEmployee = function (result) {
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

EmployeeFamily.create = function (newEmployeeFamily, result) {
    connection.query("INSERT INTO situation_familiale set ?", newEmployeeFamily, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    });
};

EmployeeFamily.findAll = function (result) {
    connection.query("SELECT * FROM situation_familiale sf JOIN monthly_employee me ON sf.monthlyemployee_id=me.monthlyemployee_id", function (err, res) {
        if (err) {
            console.log("Error while fetching employee family: ", err);
            result(null, err);
        }
        else {
            console.log('Employees family fetched successfully: ');
            result(null, res);
        }
    });
}

EmployeeFamily.findById = function (id, result) {
    connection.query("SELECT * FROM situation_familiale sf JOIN monthly_employee me ON sf.monthlyemployee_id=me.monthlyemployee_id WHERE sf.family_id=?", id,function (err, res) {
        if (err) {
            console.log("Error while fetching employee family: ", err);
            result(null, err);
        }
        else {
            console.log('Employees family fetched successfully: ');
            result(null, res);
        }
    });
}

EmployeeFamily.update = function (id, employeefamily, result) {
    connection.query("UPDATE situation_familiale SET name_conjoint=?,number_child=?,monthlyemployee_id=? WHERE family_id = ? ", [employeefamily.name_conjoint, employeefamily.number_child, employeefamily.monthlyemployee_id, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

EmployeeFamily.delete = function (id, result) {
    connection.query("DELETE FROM situation_familiale WHERE family_id = ?",[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = EmployeeFamily;