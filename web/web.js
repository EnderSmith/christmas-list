// global obj
let _g = { 
  family : {}
};

// onload
$(() => {
  // figure out which should be visible
  const currentRoute = router(window.location, {
    'root' : emailPage,
    'family' : listPage
  });

});

// router() takes location (eg window.location), and an object of routing functions.
// it splits location.pathname into an array that looks like ["", "family", "uuid-1", "uuid-2"] or ["", ""]
// it then evaluated whether the appropriate part of the pathname matches one of the keyvalue pairs provided in the routes obj
// and returns the appropriate root
function router(location, routes) {
  const pathSeg = location.pathname.split('/');
  let routeName = 'root';
  if (pathSeg.length > 1) {
    routeName = pathSeg[1];
  }
  let route = routes[routeName];
  if (!route) {
    route = routes['root'];
  }
  return route.call(this, pathSeg);
};

// landing page displays only an email bar
function emailPage() {
  //register email bar listeners
  $('#emailSend').click(emailPost);
  $('#email').keypress((event) => {
    if (event.which === 13) {
      emailPost();
    };
  });
  // don't worry about removing listeners here, 
  // bc the user must follow their emailed link to navigate to the page proper
};

// this is the "single page" of this SPA
async function listPage(seg) {
  // the function takes an array of pathname segments, split at "/"
  notification('test');
  const familyId = seg[2];
  const memberId = seg[3]; 
  try {
    _g.family = await familyGet(familyId, memberId);
  } catch (err) {
    if (_g.family.status === 404) {
      familyNotFound();
    } else {
      notification(JSON.stringify(err));
    }
  }
  // memberIndex is the index of the current member
  const memberIndex = findMemberIndex(_g.family.members, memberId);
  const list = _g.family.members[memberIndex].list;
  const htmlList = createHtmlList(list);
  $(`#memberlist-${memberIndex}`).html(htmlList);
  // adds button listeners for each item row in the list
  for (const itemNumber in list) {
    addItemListeners(`listitem-${itemNumber}`);
  };
};

function findMemberIndex(membersArray, memberId) {
  let memberIndex = -1;
  for (const index in membersArray) {
    if (membersArray[index].memberId === memberId) {
      memberIndex = index;
    };
  };
  return memberIndex;
};

function createHtmlList(list) {
  let html = 'your list: <br>';
  for (const itemNumber in list) {
    const item = list[itemNumber];
    html += `<div id="listitem-${itemNumber}" class="listitem purchased-${item.purchased} locked-${item.locked}  deleted-${item.deleted}">
    <span class="listitem-title">${item.title}</span>
    <button class="purchase-button">✔</button>
    <button class="edit-button">✏️</button>
    <button class="lock-button">🔒</button>
    <button class="delete-button">❌</button>
    </div>`;
  };
  html += '<div id="listitem-new"><input type="text" class="listitem-new-title"  placeholder="new list item"><button class="new-button">➕</button></div>'
  return html;
};

// event listeners
function addItemListeners(itemId) {
  const buttonNames = ['purchase', 'lock', 'delete'];
  for (const index in buttonNames) {
    $(`#${itemId} .${buttonNames[index]}-button`).on('click', () => {
    listPost(itemId, 'purchased');
    });
  };
};

function removeItemListeners(itemId) {
  $(`#${itemId} button`).off('click');
};

// API calls
function emailPost() {
  const recipient = $('#email')[0].value;
  if (!!recipient) {
    $.post('/api/email', { 'email': recipient });
    notification(`your link is being sent to ${recipient}`);
  };
};

async function familyGet(familyId, memberId) {
  return await $.get(`/api/family/${familyId}/${memberId}`);
};

function familyNotFound() {
  const seg = window.location.href.split('/');
  window.location.replace(`${seg[0]}//${seg[2]}/`);
};

function listPost(itemId, action) {
  console.log(`listPost('${itemId}' ,'${action}') called`);
  removeItemListeners(itemId);
};

// html notifications
function notification(message) {
  $('#notifications').html(`<div class="notification">${message}</div>`)
  .delay(1000)
  .slideUp(300); 
}

