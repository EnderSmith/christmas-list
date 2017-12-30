const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListItemSchema = new Schema({
  title: String,
  purchased: Boolean,
  locked: Boolean,
  deleted: Boolean,
  updated: String,
  updatedBy: String
});

module.exports = mongoose.model('ListItem', ListItemSchema);