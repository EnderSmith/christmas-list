$(() => {
  //register listeners
  $('#emailSend').click(emailPost);
  // figure out what should be visible
  const currentRoute = router(window.location, {
    'root' : emailPage,
    'family' : listPage
  });

});

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

function emailPage() {

};

async function listPage(seg) {
  const familyId = seg[2];
  const memberId = seg[3];
  let family = {};
  try {
    family = await findFamily(familyId, memberId);
  } catch (err) {
    if (family.status === 404) {
      familyNotFound();
    } else {
      notification(JSON.stringify(err));
    }
  }
  const memberIndex = findMemberIndex(family.members, memberId);
  const list = family.members[memberIndex].list;
  const htmlList = createHtmlList(list);
  $(`#memberlist-${memberIndex}`).html(htmlList);
};

function emailPost() {
  const recipient = $('#email')[0].value;
  if (!!recipient) {
    $.post('/api/email', { 'email': recipient });
    notification(`your link is being sent to ${recipient}`);
  };
};

async function findFamily(familyId, memberId) {
  return await $.get(`/api/family/${familyId}/${memberId}`);
};

function familyNotFound() {
  const seg = window.location.href.split('/');
  window.location.replace(`${seg[0]}//${seg[2]}/`);
};

function findMemberIndex(membersArray, memberId) {
  let memberIndex = -1;
  for (const index in membersArray) {
    if (membersArray[index].memberId === memberId) {
      memberIndex = index
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
    <button class="purchased-button">✔</button>
    <button class="lock-button">🔒</button>
    <button class="delete-button">❌</button>
    </div>`
  };
  return html;
};

function notification(message) {
  $('#notification').html(`<div class="notification">${message}</div>`);  
}