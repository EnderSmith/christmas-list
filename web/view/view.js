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
    },
    about: function() {
      return `
      <div id="about">
        <p>
          My name is Ender Smith. I'm a freelance composer and aspiring full-stack developer
          from Kirkland, Washington.
        </p>
        <p>
          Check-It-Twice is a holiday wish list organizer. It is
          designed to help you keep track of your holiday shopping
          and chart your success. It also allows you to search for
          items on your list in-app.
        </p>
        <p>
          While, for now only single-member families are supported,
          later versions will allow you to add members to your family,
          as children or parents. Parents will be able to see and edit
          their children's wish lists, and track how many gifts are left
          for the whole family.
        </p>
      </div>`
    }
  },
  component: {
    header: function(model) {
      return `
      <button onclick="$mainCtrl.linkRouter('${model.list}')" class="headerbutton">List</button>
      <button onclick="$mainCtrl.linkRouter('${model.progress}')" class="headerbutton">Progress</button>
      <button onclick="$mainCtrl.linkRouter('${model.about}')" class="headerbutton">About</button>`
    },
    item: function(model) { 
      return `
        <div id="listitem-${model.itemIndex}" class="listitem purchased-${model.purchased}">
          <span class="listitem-title">${model.title}</span>
          <button class="purchased-button">✔</button>
          <button class="edited-button">✏️</button>
          <button class="search-button">🔍</button>
          <button class="deleted-button">❌</button>
          <div class="searchResults" style="display:none;"></div>
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