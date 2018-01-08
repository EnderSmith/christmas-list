const $mainCtrl = {
  context: {
    family: {},
    currentMemberIndex: -1,
  },
  run: function() {  
    $(() => {
      const currentRoute = $mainCtrl.router(window.location, {
        'root' : $loginCtrl.run,
        'family' : $listCtrl.run,
        'chart' : $chartCtrl.run,
        'about' : $aboutCtrl.run
      });
    });
  },
  router: (location, routes) => {
    const pathSeg = $mainCtrl.splitPath(location);
    let routeName = 'root';
    if (pathSeg.length > 1) {
      routeName = pathSeg[1];
    }
    if (pathSeg.length === 5) {
      routeName = pathSeg[4];
    }
    let route = routes[routeName];
    if (!route) {
      route = routes['root'];
    }
    route.call(this);
  },
  splitPath: (location) => {
    return location.pathname.split('/')
  },
  notification: (message) => {
    const notificationModel = new $m.Notification(message);
    const notificationView = $v.component.notification(notificationModel);
    $('#notifications').html(notificationView);
    $('.notification')
      .slideDown(300)
      .delay(3000)
      .slideUp(300); 
  },
  lookBusy: (id, set) => {
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
      }
  },
  serverError: (err) => {
    const errorModel = new $m.ServerError(err);
    const errorView = $v.component.serverError(errorModel);
    $('#app').html(errorView);
  },
  linkRouter: (pathName) => {
    const stateObject = { pathName: pathName };
    window.history.pushState(stateObject, pathName, `${pathName}`);
    $mainCtrl.router(window.location, {
      'root' : $loginCtrl.run,
      'family' : $listCtrl.run,
      'chart' : $chartCtrl.run,
      'about' : $aboutCtrl.run
    });
  },
  loadHeader: (familyId, memberId) => {
    const headerLinksModel = new $m.HeaderLinks(familyId, memberId);
    $(`#header`).html($v.component.header(headerLinksModel));
  }
}