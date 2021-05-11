const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, require: true },
  country: { type: String, require: true },
});

module.exports = mongoose.model('Zuriuser', UserSchema);
