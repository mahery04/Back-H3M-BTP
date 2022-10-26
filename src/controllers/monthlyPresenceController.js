const MonthlyPresence = require('../models/monthlyPresenceModel')

exports.action = function (req, res) {
    const newPresence = new MonthlyPresence(req.body)
    MonthlyPresence.action(req.params.id, newPresence, function (err, presence) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Presence successfully updated' });
    })
}