const ServiceProvider = require('../models/serviceProviderModel')

exports.create = function (req, res) {
    const newServiceProvider = new ServiceProvider(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        ServiceProvider.create(newServiceProvider, function (err, dailyemployee) {
            if (err) res.send(err);
            res.json({ error: false, message: "Service Provider added successfully!" });
        });
    }
}