const $familyProvider = {
  run: async () => {
    const pathSeg = $mainCtrl.splitPath(window.location);
    $mainCtrl.context.familyId = pathSeg[2];
    $mainCtrl.context.memberId = pathSeg[3];
    try {
      $mainCtrl.context.family = await $familyProvider.familyGet($mainCtrl.context.familyId, $mainCtrl.context.memberId);
    } catch(err) {
      $mainCtrl.serverError(err);
      return err;
    };
    $mainCtrl.context.currentMemberIndex = $familyProvider.findMemberIndex($mainCtrl.context.family.members, $mainCtrl.context.memberId)
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
    return new Promise((resolve, reject) => $.ajax({
      url: `/api/family/${familyId}/${memberId}`,
      type: 'PUT',
      data: familyStringified,
      headers: {
        "Content-Type": "application/json"
      },
      dataType: 'json',
      success: resolve,
      error: (xhr, options, error) => reject(error)
    }));
  }
}