const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FamilySchema = new Schema({
  famId: String,
  members: Object
});

module.exports = mongoose.model('Family', FamilySchema);