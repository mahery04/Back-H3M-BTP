var connection = require('../../config/db.config')

var User = function(user) {
    this.login      = user.login;
    this.password   = user.password
}

User.userToLog = function (login, password, result) {
    connection.query("SELECT * FROM users JOIN role ON users.`role_id`=role.`role_id` WHERE login=? and password=?", [login, password], function (err, res) {      
        
        // if (err) throw err;
        // if (err) {
        //     console.log('Incorrect Username and/or Password!');
        // }
        // // If the account exists
        // else if (res.length > 0) {
        //     result(null, res);
        // }// else {
        // //     console.log('Incorrect Username and/or Password!');
        // // }


        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            if (res.length > 0) {
                result(null, res);
            }
        }
    });
}

module.exports = User;