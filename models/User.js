const mongoose = require('mongoose');
// Create Schema
const UserSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required:true
  },
  lastName:{
    type: String,
    required:true
  },
  dob:{
    type: String,
    required:true
  },
  gender:{
    type: String,
    required:true
  },
  email:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required:true
  },
  accountType:{
    type: String,
    required:true
  },
  address:{
    type: String,
    required:true
  },
  city:{
    type: String,
    required:true
  },
  province:{
    type: String,
    required:true
  },
  Country:{
    type: String,
    required:true
  },
  telephoneNumber:{
    type: String,
    required:true
  },
  PostalCode:{
    type: String,
    required:true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);