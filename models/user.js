const mongoose = require('mongoose');

let USER_SCHEMA = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  refresh_token: {
    type: String,
    required: true
  }
});

let USER = mongoose.model('user', USER_SCHEMA);

module.exports = { USER };
