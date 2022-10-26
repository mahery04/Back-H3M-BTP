const Weekpresence = require('../models/weekPresenceModel')

exports.getMonth = function (req,res) {
    Weekpresence.getMonth(function(err, weekpresence) {
        if (err) res.send(err)
        console.log('res', weekpresence);
        res.send(weekpresence);
    })
}

exports.globalView = function (req, res) {
    const newWeekpresence = new Weekpresence(req.body)
    Weekpresence.globalView(newWeekpresence, function (err, weekpresence) {
        if (err) res.send(err)
        console.log('res', weekpresence);
        res.send(weekpresence);
    })
}

exports.create = function (req, res) {
    const newWeekpresence = new Weekpresence(req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Weekpresence.create(req.params.id, newWeekpresence, function (err, weekpresence){
            if (err) res.send(err)
            res.json({ error: false, message: "Week presence added successfully!" })
        })
    }
}

exports.update = function (req, res) {
    Weekpresence.update(req.params.id, function (err, conge) {
        if (err) res.send(err);
        res.json({ error: false, message: "Validation changed successfully!" });
    });
};

exports.getById = function (req, res) {
    Weekpresence.getById(req.params.id, function (err, weekpresence) {
        if (err) res.send(err)
        res.send(weekpresence)
    })
}

exports.salary = function (req, res) {
    Weekpresence.salary(req.params.id, function (err, weekpresence) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Salary successfully updated' });
    })
}

exports.getSalary = function (req, res) {
    Weekpresence.getSalary(req.params.id, function (err, total_salary) {
        if (err) res.send(err)
        res.send(total_salary[0])
    })
}

exports.setPresence = function (req, res) {
    Weekpresence.setPresence(req.params.id, function (err, weekpresence) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Presence successfully updated' });
    })
}

exports.nbPresence = function (req, res) {
    Weekpresence.nbPresence(req.params.id, function (err, nb_presence) {
        if (err) res.send(err)
        res.send(nb_presence[0])
    })
}

exports.setAbsence = function (req, res) {
    Weekpresence.setAbsence(req.params.id, function (err, weekpresence) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Absence successfully updated' });
    })
}

exports.nbAbsence = function (req, res) {
    Weekpresence.nbAbsence(req.params.id, function (err, nb_absence) {
        if (err) res.send(err)
        res.send(nb_absence[0])
    })
}

exports.history = function (req, res) {
    Weekpresence.history(req.params.id, function (err, weekpresence) {
        if (err) res.send(err)
        console.log('res', weekpresence);
        res.send(weekpresence);
    })
}

