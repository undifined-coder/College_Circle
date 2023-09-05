var mongoose = require('mongoose');


var mySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password :String
});


var User = mongoose.model('User', mySchema);

module.exports = User;
