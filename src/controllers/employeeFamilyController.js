const EmployeeFamily = require('../models/employeeFamilyModel')

exports.getEmployee = function (req, res) {
    EmployeeFamily.getEmployee(function (err, employeefamily) {
        if (err) res.send(err);
        console.log('res', employeefamily);
        res.send(employeefamily);
    })
}

exports.findAll = function (req, res) {
    EmployeeFamily.findAll(function (err, employeefamily) {
        if (err) res.send(err);
        console.log('res', employeefamily);
        res.send(employeefamily);
    });
};

exports.findById = function (req, res) {
    EmployeeFamily.findById(req.params.id, function (err, employeefamily) {
        if (err) res.send(err);
        res.json({
            family_id:          employeefamily[0].family_id,
            name_conjoint:      employeefamily[0].name_conjoint,
            number_child:       employeefamily[0].number_child,
            monthlyemployee_id: employeefamily[0].monthlyemployee_id,
        });
    });
};

exports.create = function (req, res) {
    const newEmployeeFamily = new EmployeeFamily(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        EmployeeFamily.create(newEmployeeFamily, function (err, employeefamily) {
            if (err) res.send(err);
            res.json({ error: false, message: "Employee family added successfully!" });
        });
    }
};

exports.update = function (req, res) {
    const newEmployeeFamily = new EmployeeFamily(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        EmployeeFamily.update(req.params.id, newEmployeeFamily, function (err, conge) {
            if (err) res.send(err);
            res.json({ error: false, message: "Employee family successfully updated!" });
        });
    }
};

exports.delete = function (req, res) {
    EmployeeFamily.delete(req.params.id, function (err, employeefamily) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Employee successfully deleted' });
    });
};