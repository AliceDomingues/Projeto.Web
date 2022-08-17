var express = require('express');
const app = require('../app');
const { render } = require('../app')
var router = express.Router();
var dao = require('../database/dao')

router.get('/', function (request, response){
    dao.list().then( ([rows]) => {
        response.render('produtos/list', { produtos: rows})
    }).catch( err => {
        console.log(err)
        response.render('produtos/list', { produtos: [] })
    })
});

router.post('/delete', function (request, response){
    dao.remove(request.body.id)
    .then( ( [result] ) => {
        console.log(result)
        if (result.affectedRows > 0)
            request.flash('success', 'Produto excluido com sucesso.')
        else
            request.flash('success', `Não foi encontrado no banco aluno com id = ${request.body.id}`)
        response.redirect('/produtos')
    }).catch(err => {
        console.log(err)
        request.flash('error', 'Ocorreu um erro na exclusão do produto.')
        response.redirect('/produtos')
    })
});

router.get('/form', async function (request, response){

    let row = {
        id: '',
        nomeProdutos: '',
        categoria: '',
        preco_venda: '',
        preco_compra: '',
        dtValidade: ''
    }
    if( request.query.id ){
        [result] = await dao.findById(request.query.id)
        console.log(result)
        row = result[0]
        console.log(row)
    }

    response.render('produtos/form', { produto: row})
});

router.post('/save', function(request, response) {

    
    if(request.body.id){
        operacao = dao.update
        success = `Dados do produto atualizado com sucesso`
    }else{
        operacao = dao.save
        success = `Produto cadastrado com sucesso`
    }

    operacao(request.body)
    .then( ([result]) => {
        request.flash('success', success)
        response.redirect('/produtos')
    }).catch(err => {
        console.log(err)
        request.flash('error', `Não foi possível cadastrar o produto`)
        response.redirect('/produtos')
    })
})

router.get('/search', function(request, response) {

    if(request.query.nomeProdutos){
        dao.search(request.query.nomeProdutos)
        .then( ([rows]) => {
            response.render('produtos/list', { produtos: rows })
        }).catch( err => {
            console.log(err)
            request.flash('error', 'Não foi possivel efetuar a buscar por nome')
            response.redirect('/produtos')
        })
    }else{
        response.redirect('/produtos')
    }

})


module.exports = router;
