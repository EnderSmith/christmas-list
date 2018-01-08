const $v = {
  page: {
    login: function() {
      return `
        <div id="login">
          enter your email to start a wish list: <br>
          <input type="email" name="email" id="email" placeholder="example@email.com">
          <button id="emailSend"><img src="/resource/img/redQuill.jpg"></button>
        </div>`;
    },
    list: function(model) {
      return `
        <div id="list-holder" data-busy="false">
          <div class="spinner" style="display:none">spinning...</div>
          <div id="memberlist-0" class="memberlist">
            ${model.list}
          </div>
        </div>`;
    },
    chart: function(model) {
      return `
      <div id="chart">
        <canvas id="myChart"></canvas>
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
      <div class="logo"><img src="/resource/img/redLogo.jpg">Check-It-Twice</div>
      <button onclick="$mainCtrl.linkRouter('${model.list}')" class="headerbutton">List</button>
      <button onclick="$mainCtrl.linkRouter('${model.progress}')" class="headerbutton">Progress</button>
      <button onclick="$mainCtrl.linkRouter('${model.about}')" class="headerbutton about">About</button>
      <div id="notifications"></div>`
    },
    item: function(model) { 
      return `
        <div id="listitem-${model.itemIndex}" class="listitem purchased-${model.purchased}">
          <span class="listitem-title">${model.title}</span>
          <div class="list-buttons">
            <button class="purchased-button"><img src="/resource/img/redCheck.jpg"></button>
            <button class="edited-button"><img src="/resource/img/redQuill.jpg"></button>
            <button class="search-button"><img src="/resource/img/redSearch.jpg"></button>
            <button class="deleted-button"><img src="/resource/img/redDelete.jpg"></button>
          </div>
          <div class="searchResults" style="display:none;"></div>
        </div>`;
    },
    itemInput: function(model) {
      return `
        <div id="listitem-new">
          <input type="text" class="listitem-new-title" placeholder="${model.placeholder}">
          <div class="new-button">
            <button class="new-button"><img src="/resource/img/redAdd.jpg"></button>
          </div>`;
    },
    notification: function(model) {
      return `
        <div class="notification" style="display:none;">
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