const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  memberId: String,
  name: String,
  email: String,
  parent: Boolean,
  deleted: Boolean,
  list: Array
});

module.exports = mongoose.model('Member', MemberSchema);