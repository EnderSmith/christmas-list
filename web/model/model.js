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
    this.err = err;
  },
  GoogleCustomSearch: function (query) {
    this.uri = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBnB0b8PoUk4mD7O4lfoGM2Gp7u_W_-_hg&cx=018247707825542372112:i_39t_15tja&q=${query}`
  },
  SearchResult: function (searchResultObject) {
    this.title = searchResultObject.htmlTitle;
    this.href = searchResultObject.link;
    this.img = searchResultObject.pagemap.cse_image[0].src;
  },
  SearchResultListHtml: function (searchResultListHtml) {
    this.searchResults = searchResultListHtml;
  },
  HeaderLinks: function (familyId, memberId) {
    if (!familyId || !memberId) {
      this.list = `/`;
      this.progress = `/`;
    } else {
      this.list = `/family/${familyId}/${memberId}`;
      this.progress = `/family/${familyId}/${memberId}/chart`;
    }
    this.about = `/about`;
  },
  Chart: function (members) {
    const color = Chart.helpers.color;
    this.chart = {
      type: 'bar',
      data: {
        labels: members.map((m, i) => `Member ${i + 1}`),
        datasets: [
          {
            label: 'Total',
            backgroundColor: 'rgb(255,0,0)',
            borderWidth: 5,
            data: members.map(m =>  m.list.length)
          },
          {
            label: 'Purchased',
            backgroundColor: 'rgb(0,255,0)',
            borderWidth: 5,
            data: members.map(m => m.list.reduce((count, item) => count + (!!item.purchased ? 1 : 0), 0))
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Member Lists (total v purchased)'
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }
}