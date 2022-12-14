const Dailypresence = require('../models/dailyPresenceModel')

exports.action = function (req, res) {
    const newPresence = new Dailypresence(req.body)
    Dailypresence.action(req.params.id, newPresence, function (err, presence) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Presence successfully updated' });
    })
}

exports.getAllPresence = function (req,res) {
    Dailypresence.findAll(function (err, dailypresence) {
        if (err) res.send(err);
        console.log('res', dailypresence);
        res.send(dailypresence);
    });
}

// exports.salary = function (req, res) {
//     Dailypresence.salary(function (err, salary) {
//         if (err) res.send(err)
//         console.log('salary', salary)
//         res.json({ total_salary: salary })
//     })
// }