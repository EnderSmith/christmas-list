const $m = {
  LocalItem: function (itemIndex, title, purchased) {
    this.title = title;
    this.purchased = purchased || false;
    this.updated = new Date();
    this.updatedBy = $mainCtrl.context.memberId || null;
    this.itemIndex = itemIndex;
  },
  Item: function (title, purchased) {
    this.title = title;
    this.purchased = purchased || false;
    this.updated = new Date();
    this.updatedBy = $mainCtrl.context.memberId || null;
  },
  ItemInput: function (placeholder) {
    this.placeholder = placeholder;
  },
  ListHtml: function (listView) {
    this.list = listView;
  },
  Notification: function (message) {
    this.message = message;
  },
  EmailPostData: function (recipient) {
    this.recipient = recipient;
  },
  ServerError: function (err) {
    this.err = err
  },
}