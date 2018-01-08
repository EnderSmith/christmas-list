const $v = {
  page: {
    login: function() {
      return `
        <div id="notifications"></div>
        <div id="login">
          enter your email: <br>
          <input type="email" name="email" id="email">
          <button id="emailSend">send</button>
        </div>`;
    },
    list: function(model) {
      return `
        <div id="notifications"></div>
        <div id="list-holder" data-busy="false">
          <div class="spinner" style="display:none">spinning...</div>
          <div id="memberlist-0" class="memberlist">
            ${model.list}
          </div>
        </div>`;
    }
  },
  component: {
    item: function(model) { 
      return `
        <div id="listitem-${model.itemIndex}" class="listitem purchased-${model.purchased}">
          <span class="listitem-title">${model.title}</span>
          <button class="purchased-button">✔</button>
          <button class="edited-button">✏️</button>
          <button class="search-button">🔍</button>
          <button class="deleted-button">❌</button>
          <div class="searchResults" style="display: none"></div>
        </div>`;
    },
    itemInput: function(model) {
      return `
        <div id="listitem-new">
          <input type="text" class="listitem-new-title" placeholder="${model.placeholder}">
          <button class="new-button">➕</button>
        </div>`;
    },
    notification: function(model) {
      return `
        <div class="notification" style="display:none">
          ${model.message}
        </div>`;
    },
    serverError: function(model) {
      return `
        <div class="error">${model.err}</div>`;
    },
    searchResult: function(model) {
      return `
        <a href="${model.href}">
          <div class="searchResult">
            <div class="search-img"><img src="${model.img}"></div>
            <span class="search-title">${model.title}</span>
          </div>
        </a>`;
    },
  }
};