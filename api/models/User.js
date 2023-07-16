const mongoose = require('mongoose');
// const Schema = mongoose;

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  seller: {
    unsolved: Boolean,
    
  },
 


});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
