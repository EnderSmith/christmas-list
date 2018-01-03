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
  $('#login').hide();
  // the function takes an array of pathname segments, split at "/"
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
  const currentMemberIndex = findMemberIndex(_g.family.members, memberId);
  const list = _g.family.members[currentMemberIndex].list;
  const listHtml = createListHtml(list);
  $(`#memberlist-${currentMemberIndex}`).html(listHtml);
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

function createListHtml(list) {
  let html = 'your list: <br>';
  for (const itemNumber in list) {
    const item = list[itemNumber];
    html += `<div id="listitem-${itemNumber}" class="listitem purchased-${item.purchased} locked-${item.locked}  deleted-${item.deleted}">
    <span class="listitem-title">${item.title}</span>
    <button class="purchased-button">✔</button>
    <button class="edited-button">✏️</button>
    <button class="locked-button">🔒</button>
    <button class="deleted-button">❌</button>
    </div>`;
  };
  html += '<div id="listitem-new"><input type="text" class="listitem-new-title"  placeholder="new list item"><button class="new-button">➕</button></div>'
  return html;
};



// event listeners
function addItemListeners(itemId) {
  const buttonNames = ['purchased', 'locked', 'deleted'];
  for (const index in buttonNames) {
    $(`#${itemId} .${buttonNames[index]}-button`).on('click', () => {
    listPost(itemId, `${buttonNames[index]}`);
    });
  };
};

function removeItemListeners(itemId) {
  $(`#${itemId} button`).off('click');
};

function addListListeners(itemNumber, memberlistId) {

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
  lookBusy('list-holder', true);
  setTimeout(() => { lookBusy('list-holder', false) }, 5000);
  setTimeout(() => { notification(`${action}`) }, 5700);
};

// notifications
function notification(message) {
  $('#notifications').html(`<div class="notification" style="display:none">${message}</div>`);
  $('.notification')
  .slideDown(300)
  .delay(3000)
  .slideUp(300); 
};

function lookBusy(id, set) {
  if ($(`#${id}`).attr('data-busy') === 'true' || set === false) {
    $(`#${id}`).attr('data-busy', 'false');
    // to-do: handle this with css later
    $(`#${id} .spinner`).fadeOut(200);
    $(`#${id} *:not(.spinner)`).delay(200).fadeIn(500);
  } else if ($(`#${id}`).attr('data-busy') !== 'true' || set === true) {
    $(`#${id}`).attr('data-busy', 'true');
    // to-do: handle this with css later
    $(`#${id} *:not(.spinner)`).fadeOut(200);
    $(`#${id} .spinner`).delay(200).fadeIn(500);
  };
};