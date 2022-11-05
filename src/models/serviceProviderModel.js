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
    connection.query("INSERT INTO service_provider set ?", newServiceProvider, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null,res)
        }
    })
}