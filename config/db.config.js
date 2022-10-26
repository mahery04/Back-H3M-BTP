const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  database : 'gestion_personnels',
  user     : 'root',
  password : ''
});
connection.connect(function(err) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Database Connected...");
    }
});
module.exports = connection;