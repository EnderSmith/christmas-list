const $chartCtrl = {
  run: async () => {
    try {
      await $familyProvider.run();
    } catch (error) {
      $loginCtrl.run();
      return;
    }
    $mainCtrl.loadHeader($mainCtrl.context.familyId, $mainCtrl.context.memberId);
    const members = $mainCtrl.context.family.members;
    $chartCtrl.loadView(members);
  },
  loadView: (members) => {
    const chartModel = new $m.Chart(members);
    const chartHtml = $v.page.chart(chartModel);
    $('#app').html(chartHtml);
    $chartCtrl.chart = new Chart('myChart', chartModel.chart);
  }
}