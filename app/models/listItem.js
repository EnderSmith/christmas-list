function ListItem() {
  return {
    title: String,
    purchased: Boolean,
    locked: Boolean,
    deleted: Boolean,
    updated: String,
    updatedBy: String
  };
};

module.exports = ListItem;