var connection = require('../../config/db.config')

var SalaryServiceProvider = function (salaryprovider) {
    this.id = salaryprovider.id;
    this.salary_provider_id = salaryprovider.salary_provider_id;
    this.date_paiement         = salaryprovider.date_paiement;
    this.start_date          = salaryprovider.start_date;
    this.end_date           = salaryprovider.end_date;
    this.salary                = salaryprovider.salary;
}

SalaryServiceProvider.findById = function (id, result) {
    connection.query("SELECT * FROM salary_prestataire WHERE salary_provider_id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(null,err);
        }
        else{
            result(null, res);
        }
    });   
};

SalaryServiceProvider.findAll = function (id,result) {
    connection.query("SELECT * FROM salary_prestataire WHERE id=?",id, function (err, res) {
        if (err) {
            console.log("Error while fetching salary service provider: ", err);
            result(null, err);
        }
        else {
            console.log('salary provider fetched successfully: ');
            result(null, res);
        }
    });
};

SalaryServiceProvider.update = function (id, SalaryServiceProvider, result) {
    connection.query("UPDATE salary_prestataire SET date_paiement=?,start_date=?,end_date=?,salary=? WHERE salary_provider_id = ? ", [SalaryServiceProvider.date_paiement, SalaryServiceProvider.start_date, SalaryServiceProvider.end_date, SalaryServiceProvider.salary,id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

SalaryServiceProvider.create = function (newSalaryServiceProvider, result) {
    connection.query("INSERT INTO salary_prestataire set ?", newSalaryServiceProvider,function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null,err)
        } else {
            console.log(res);
            result(null,res)
        }
    });
};

SalaryServiceProvider.delete = function (id, result) {
    connection.query("DELETE FROM salary_prestataire WHERE salary_provider_id = ?",[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};



module.exports = SalaryServiceProvider;