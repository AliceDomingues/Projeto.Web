const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password:'@Niko2021',
    database: 'login',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });


module.exports = {

    findById: function (id){
        return pool.promise().query('select * from users where id=?', [id])
    },

    findByUsername: function(nome) {
        return pool.promise().query('select * from users where nome=?', [nome])
    },
    list: function() {
        return pool.promise().query('select * from produtos')
    }

}