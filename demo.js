let bcrypt = require ('bcryptjs')

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("alice123", salt);

console.log(bcrypt.compareSync('alice123', hash)); //true
console.log(bcrypt.compareSync('julio123', hash)); //false

//console.log(hash)

