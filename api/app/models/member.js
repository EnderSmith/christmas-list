const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: String,
  email: String,
  parent: Boolean,
  deleted: Boolean,
  list: Object
});

module.exports = mongoose.model('Member', MemberSchema);