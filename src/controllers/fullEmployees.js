var FullEmployees = require('../models/fullEmployees');

exports.btp = function (req,res) {
    FullEmployees.btp(function (err, btp_count) {
        if (err) res.send(err);
        console.log('btp_count', btp_count);
        res.json({'btp_count': btp_count});
    })
}

exports.sip = function (req,res) {
    FullEmployees.sip(function (err, sip_count) {
        if (err) res.send(err);
        console.log('sip_count', sip_count);
        res.json({'sip_count': sip_count});
    })
}

exports.parapharmaceutique = function (req,res) {
    FullEmployees.parapharmaceutique(function (err, parapharmaceutique_count) {
        if (err) res.send(err);
        console.log('parapharmaceutique_count', parapharmaceutique_count);
        res.json({'parapharmaceutique_count': parapharmaceutique_count});
    })
}