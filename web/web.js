$(() => {
  //register listeners
  $('#emailForm').submit(emailPost);

  //figure out what should be visible
  const currentRoute = route(window.location, {
    'root' : emailPage,
    'family' : listPage
  });

  //run the page that should be visible (make it visible)


});

function emailPost() {
  const recipient = $('#email')[0].value;
  $.post('/api/email', { 'email': recipient });
};

function findFamily(familyId, memberId) {
  return $.get(`/api/family/${familyId}/${memberId}`);
};

function route(location, routes) {
  const segments = location.pathname.split('/');
  let routeName = 'root';

  if (segments.length > 1) {
    routeName = segments[1];
  }

  let route = routes[routeName];
  if (!route) {
    route = routes['root'];
  }

  return route.call(this, segments);
}

function emailPage() {

}

async function listPage(seg) {
  const familyId = seg[2];
  const memberId = seg[3];
  console.log(await findFamily(familyId, memberId));
}

// const seg = window.location.href.split('/');
// window.location.replace(`${seg[0]}//${seg[2]}/`);