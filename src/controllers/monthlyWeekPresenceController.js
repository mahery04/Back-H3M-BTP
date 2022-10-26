const Monthlyweekpresence = require('../models/monthlyWeekPresenceModel')

exports.getMonth = function (req,res) {
    Monthlyweekpresence.getMonth(function (err, monthlyweekpresence) {
        if (err) res.send(err)
        console.log('res', monthlyweekpresence)
        res.send(monthlyweekpresence)
    })
}

exports.globalView = function (req, res) {
    const newMonthlyeekpresence = new Monthlyweekpresence(req.body)
    Monthlyweekpresence.globalView(newMonthlyeekpresence, function (err, monthlyweekpresence) {
        if (err) res.send(err)
        console.log('res', monthlyweekpresence);
        res.send(monthlyweekpresence);
    })
}

exports.create = function (req, res) {
    const newMonthlyweekpresence = new Monthlyweekpresence(req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Monthlyweekpresence.create(req.params.id, newMonthlyweekpresence, function (err, monthlyweekpresence) {
            if (err) res.send(err)
            res.json({ error: false, message: "Week presence added successfully!" })
        })
    }
}

exports.update = function (req, res) {
    Monthlyweekpresence.update(req.params.id, function (err, conge) {
        if (err) res.send(err);
        res.json({ error: false, message: "Validation changed successfully!" });
    });
};

exports.getById = function (req, res) {
    Monthlyweekpresence.getById(req.params.id, function (err, monthlyweekpresence) {
        if (err) res.send(err)
        res.send(monthlyweekpresence)
    })
}

exports.setPresence = function (req, res) {
    Monthlyweekpresence.setPresence(req.params.id, function (err, monthlyweekpresence) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Presence successfully updated' });
    })
}

exports.nbPresence = function (req, res) {
    Monthlyweekpresence.nbPresence(req.params.id, function (err, nb_presence) {
        if (err) res.send(err)
        res.send(nb_presence[0])
    })
}

exports.setAbsence = function (req, res) {
    Monthlyweekpresence.setAbsence(req.params.id, function (err, monthlyweekpresence) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Absence successfully updated' });
    })
}

exports.nbAbsence = function (req, res) {
    Monthlyweekpresence.nbAbsence(req.params.id, function (err, nb_absence) {
        if (err) res.send(err)
        res.send(nb_absence[0])
    })
}

exports.salary = function (req, res) {
    Monthlyweekpresence.salary(req.params.id, function (err, monthlyweekpresence) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Salary successfully updated' });
    })
}

exports.getSalary = function (req, res) {
    Monthlyweekpresence.getSalary(req.params.id, function (err, total_salary) {
        if (err) res.send(err)
        res.send(total_salary[0])
    })
}

exports.advance = function (req, res) {
    Monthlyweekpresence.advance(req.params.id, function (err, monthlyweekpresence) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Advance successfully updated' });
    })
}

exports.getAdvance = function (req, res) {
    Monthlyweekpresence.getAdvance(req.params.id, function (err, total_advance) {
        if (err) res.send(err)
        res.send(total_advance[0])
    })
}

exports.history = function (req, res) {
    Monthlyweekpresence.history(req.params.id, function (err, monthlyweekpresence) {
        if (err) res.send(err)
        console.log('res', monthlyweekpresence);
        res.send(monthlyweekpresence);
    })
}
