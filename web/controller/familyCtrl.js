const $familyCtrl = {
  run: async () => {
    const pathSeg = $mainCtrl.splitPath(window.location);
    $mainCtrl.context.familyId = pathSeg[2];
    $mainCtrl.context.memberId = pathSeg[3];
    try {
      $mainCtrl.context.family = await $familyCtrl.familyGet($mainCtrl.context.familyId, $mainCtrl.context.memberId);
    } catch(err) {
      $mainCtrl.serverError(err);
      return err;
    };
    $mainCtrl.context.currentMemberIndex = $familyCtrl.findMemberIndex($mainCtrl.context.family.members, $mainCtrl.context.memberId)
  },
  findMemberIndex: (membersArray, memberId) => {
    let memberIndex = -1;
    for (const index in membersArray) {
      if (membersArray[index].memberId === memberId) {
        memberIndex = index;
      };
    };
    return memberIndex;
  },
  familyGet: async (familyId, memberId) => {
    return await $.get(`/api/family/${familyId}/${memberId}`);     
  },
  familyPut: async (familyId, memberId) => {
    const familyStringified = JSON.stringify($mainCtrl.context.family);
    return await $.ajax({
      url: `/api/family/${familyId}/${memberId}`,
      type: 'PUT',
      data: familyStringified,
      body: familyStringified,
      headers: {
        "Content-Type": "JSON",
        "TextBody": familyStringified
      },
      dataType: 'json'
    });
  }
}