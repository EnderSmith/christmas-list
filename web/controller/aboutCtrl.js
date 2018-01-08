const $aboutCtrl = {
  run: () => {
    if ($('#header').html() === '') {
      $mainCtrl.loadHeader();
    }
    $('#app').html($v.page.about());
  }
}