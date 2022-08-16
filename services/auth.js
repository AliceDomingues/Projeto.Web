module.exports = function(passport){

  const bcrypt =  require('bcryptjs')
  
  const LocalStrategy = require('passport-local').Strategy
  const dao = require('../database/dao');
  
    
    passport.serializeUser(function (user, done){
        done(null, user.id)
    })
    passport.deserializeUser(function(id, done){
    dao.findById(id)
    .then( ([rows]) => {
      let user = rows[0]
      return done(null, user)
    }).catch( err => {
      return done(err, null)
    }) 
  })
  
  let strategyConfig ={
    usernameField: 'username',
    passwordField: 'password',
  }
  passport.use(new LocalStrategy(strategyConfig, function(username, password, done){
      
    dao.findByUsername(username)
    .then( ([rows]) => {
      if (rows.length == 0) return done(null, false)
      
      let user = rows[0]

      console.log('user.senha = ' + user.senha)
      console.log('senha = ' + password)
      if (bcrypt.compareSync( password , user.senha)) return done(null, false) 
      else return done(null, user)
    }).catch( err => {
      console.log(err)
      return done(err, null)
    } )
  
  }))

}