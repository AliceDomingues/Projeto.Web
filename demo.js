let bcrypt = require ('bcryptjs')

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("lauh123", salt);

console.log(bcrypt.compareSync('lauh123', hash)); //true
console.log(bcrypt.compareSync('ellen123', hash)); //false

//console.log(hash)

