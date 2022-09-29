const mysql = require("mysql");


var connection  = mysql.createPool({
    connectionLimit : 10,
    host: "db2.ccfnweb.com.mx",
    user: 'apisecure',
    password: '4iQ^yxj4RO2r8$U',
    database: 'securefast',
    multipleStatements: true,
    port: 3306
});

 connection.getConnection(function(err) {
        if(err) {
            console.log('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id: ' + connection.threadId);
});



module.exports = connection;