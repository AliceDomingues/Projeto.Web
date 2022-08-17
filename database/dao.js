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

    findByIdLogin: function (idLogin){
        return pool.promise().query('select * from users where idLogin=?', [idLogin])
    },

    findByUsername: function(nome) {
        return pool.promise().query('select * from users where nome=?', [nome])
    },
    list: function() {
        return pool.promise().query('select * from produtos')
    },
    findById(id) {
        return pool.promise().query('select * from produtos where id=?', [id])
    },
    save: function(produto) {
        return pool.promise().execute('INSERT INTO produtos (nomeProdutos, categoria, preco_compra, preco_venda, dtValidade) VALUES (?, ?, ?, ?, ?)', [produto.nomeProdutos, produto.categoria, produto.preco_compra, produto.preco_venda, produto.dtValidade])
    },
    update: function(produto) {
        return pool.promise().execute('UPDATE produtos set nomeProdutos=?, categoria=?, preco_compra=?, preco_venda=?, dtValidade=? where id=?',
        [produto.nomeProdutos, produto.categoria, produto.preco_compra, produto.preco_venda, produto.dtValidade, produto.id])
    },
    remove: function(id){
        return pool.promise().execute("delete from produtos where id= ?" , [id]) 
    },
    search: function(nomeProdutos){
        return pool.promise().query('select * from produtos where nomeProdutos like ?', [ '%'+nomeProdutos+'%'])
    }

}