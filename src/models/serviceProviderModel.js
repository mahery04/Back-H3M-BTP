var connection = require('./../../config/db.config')

var ServiceProvider = function (serviceprovider) {
    this.provider_id = serviceprovider.provider_id
    this.firstname =  serviceprovider.firstname
    this.lastname = serviceprovider.lastname
    this.cin = serviceprovider.cin
    this.address = serviceprovider.address
    this.contact = serviceprovider.contact
    this.start_contract = serviceprovider.start_contract
    this.end_contract = serviceprovider.end_contract
    this.post_occupe = serviceprovider.post_occupe
    this.salary = serviceprovider.salary
}

ServiceProvider.create = function(newServiceProvider, result) {
    connection.query(`SELECT DATEDIFF(?,?) as number from service_provider `,[newServiceProvider.end_contract,newServiceProvider.start_contract], function (err,number) {
        if (err) {
            result(null,err)
        } else {
            connection.query("INSERT INTO service_provider set provider_id=?,start_contract=?,end_contract=?,number_days=?",[newServiceProvider.provider_id, newServiceProvider.start_contract,newServiceProvider.end_contract,number[0].number], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err)
                } else {
                    console.log(res);
                    result(null, res)
                }
            })

            // console.log("NUMBER OF DAYS ", number);
        }
    })
}

ServiceProvider.findById = function (id, result) {
    connection.query("SELECT * FROM service_provider WHERE provider_id =?",id,function (err,res) {
        if(err) {
            console.log("error: ", err);
            result(null,res);
        }
        else{
            result(null, res);
        }
    })
}

ServiceProvider.findAll = function (result) {
    connection.query("SELECT * FROM service_provider", function (err, res) {
        if (err) {
            console.log("Error while fetching provider: ", err);
            result(null, err)
        } else {
            console.log("Provider fetched successfully");
            result(null, res)
        }
    })
}

ServiceProvider.update = function (id, serviceprovider, result) {
    connection.query("UPDATE service_provider SET firstname=?, lastname=?,cin=?,address=?,contact=?,start_contract=?,end_contract=?,post_occupe=?,salary=?", [serviceprovider.firstname,serviceprovider.lastname,serviceprovider.cin,serviceprovider.address,serviceprovider.contact,serviceprovider.start_contract,serviceprovider.end_contract,serviceprovider.post_occupe,serviceprovider.salary,id], function (err,res) {
        if (err) {
            console.log("error: ",err);
            result(null,err)
        } else {
            result(null,err)
        }
    })
}

ServiceProvider.delete = function (id, result) {
    connection.query("DELETE FROM service_provider WHERE provider_id =?", [id], function (err,res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

module.exports = ServiceProvider;
