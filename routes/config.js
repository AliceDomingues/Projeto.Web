module.exports = function(app){

    var indexRouter = require('./index');
    var usersRouter = require('./users');
    var loginRouter = require('./login');

    let middlewareAutorization = function (req, resp, next){
        console.log('AUTH =>>> '+ req.isAuthenticated())
        if(req.isAuthenticated()) return next()
        else resp.redirect('/')
    }

    app.use('/', loginRouter);
    app.use('/users', middlewareAutorization, usersRouter);
     app.use('/index', indexRouter );

}