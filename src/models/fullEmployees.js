var connection = require('./../../config/db.config')

var FullEmployees = function (fullemployee) {
    this.firstname = fullemployee.firstname;
    this.lastname = fullemployee.lastname;
};

FullEmployees.btp = function (result) {
    connection.query("SELECT COUNT(`group`) AS btp_count FROM daily_employee WHERE `group`='BTP'", function (err, de_btp) {
        connection.query("SELECT COUNT(`group`) AS btp_count FROM monthly_employee WHERE `group`='BTP'", function (err, me_btp) {
            if (err) {
                console.log("error", err);
                result(null,err)
            }
            else {
                const total = de_btp[0].btp_count + me_btp[0].btp_count
                result(null, total);
            }
        })
    })
}

FullEmployees.sip = function (result) {
    connection.query("SELECT COUNT(`group`) AS sip_count FROM daily_employee WHERE `group`='SIP'", function (err, de_sip) {
        connection.query("SELECT COUNT(`group`) AS sip_count FROM monthly_employee WHERE `group`='SIP'", function (err, me_sip) {
            if (err) {
                console.log("error", err);
                result(null,err)
            }
            else {
                const total = de_sip[0].sip_count + me_sip[0].sip_count
                result(null, total);
            }
        })
    })
}

FullEmployees.parapharmaceutique = function (result) {
    connection.query("SELECT COUNT(`group`) AS parapharmaceutique_count FROM daily_employee WHERE `group`='Parapharmaceutique'", function (err, de_parapharmaceutique) {
        connection.query("SELECT COUNT(`group`) AS parapharmaceutique_count FROM monthly_employee WHERE `group`='Parapharmaceutique'", function (err, me_parapharmaceutique) {
            if (err) {
                console.log("error", err);
                result(null,err)
            }
            else {
                const total = de_parapharmaceutique[0].parapharmaceutique_count + me_parapharmaceutique[0].parapharmaceutique_count
                result(null, total);
            }
        })
    })
}

module.exports = FullEmployees;