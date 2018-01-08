const $loginCtrl = {
  run: () => {
    if ($('#header').html() === '') {
      $mainCtrl.loadHeader();
    }
    $loginCtrl.loadView();
    $loginCtrl.addLoginListeners();
  },
  loadView: () => {
    const loginView = $v.page.login();
    $('#app').html(loginView);
  },
  addLoginListeners: () => {
    $('#emailSend').on('click', $loginCtrl.emailPost);
    $('#email').keypress((event) => {
      if (event.which === 13) {
        $loginCtrl.emailPost();
      };
    });
  },
  emailPost: () => {
    const recipient = $('#email')[0].value;
    if (!!recipient) {
      const emailPostData = new $m.EmailPostData(recipient);
      $.post('/api/email', emailPostData);
      $mainCtrl.notification(`your link is being sent to ${recipient}`);
    } else {
      $mainCtrl.notification(`please enter a valid email address`);
    };
  }
}