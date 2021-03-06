const $listCtrl = {
  run: async () => {
    await $familyProvider.run();
    $mainCtrl.loadHeader($mainCtrl.context.familyId, $mainCtrl.context.memberId);
    $listCtrl.updateListView($mainCtrl.context.family.members[$mainCtrl.context.currentMemberIndex].list)
  },
  updateListView: (list) => {
    $listCtrl.removeItemListeners();
    $familyProvider.run();
    const listView = $listCtrl.createListView(list);
    $listCtrl.loadView(listView);
    for (const itemIndex in list) {
      $listCtrl.addPurchasedListeners(`listitem-${itemIndex}`);
      $listCtrl.addSearchListeners(`listitem-${itemIndex}`);
      $listCtrl.addDeletedListeners(`listitem-${itemIndex}`);
    };
    $listCtrl.addNewItemListener();
  },
  createListView: (list) => {
    let listView = '';
    for (const itemIndex in list) {
      const itemModel = new $m.LocalItem(itemIndex, list[itemIndex].title, list[itemIndex].purchased);
      listView += $v.component.item(itemModel);
    };
    const itemInputModel = new $m.ItemInput('new list item');
    listView += $v.component.itemInput(itemInputModel);
    return listView;
  },
  loadView: (listView) => {
    const listModel = new $m.ListHtml(listView)
    const listPageView = $v.page.list(listModel);
    $('#app').html(listPageView);
  },
  addPurchasedListeners: (itemId) => {
    $(`#${itemId} .purchased-button`).on('click', () => {
      $listCtrl.purchasedItem(itemId);
    });
  },
  addSearchListeners: (itemId) => {
    $(`#${itemId} .search-button`).on('click', () => {
      $listCtrl.searchItem(itemId);
    });
  },
  addDeletedListeners: (itemId) => {
    $(`#${itemId} .deleted-button`).on('click', () => {
      $listCtrl.deletedItem(itemId);
    });
  },
  addNewItemListener: () => {
    $(`button.new-button`).on('click', () => {
      $listCtrl.newItem();
    });
    $('.listitem-new-title').keypress((event) => {
      if (event.which === 13) {
        $listCtrl.newItem();
      };
    });
  },
  removeItemListeners: () => {
    $(`#list-holder div button`).off('click');
    $(`#list-holder .listitem-new-title`).off('keypress');
  },
  purchasedItem: async (itemId) => {
    $listCtrl.lookBusyWrapperForListButtons(() => {
      const itemIndex = itemId.split('-')[1];
      let markedAs = 'purchased';
      if ($mainCtrl.context.family.members[0].list[itemIndex].purchased === 'true') {
        $mainCtrl.context.family.members[0].list[itemIndex].purchased = 'false';
        markedAs = 'not purchased'
      } else {
        $mainCtrl.context.family.members[0].list[itemIndex].purchased = 'true';
      };
      return `item marked as ${markedAs}`;
    });
  },
  searchItem: async (itemId) => {
    const results = $(`#${itemId} div.searchResults`);
    if (results.css('display') === 'none') {
      const query = $(`#${itemId} span.listitem-title`).html();
      try {
        const results = await $searchCtrl.loadSearchResultsView(query, `#${itemId} .searchResults`);
        if (results) {
          $(`#${itemId} div.searchResults`).slideDown(1000);
        } else {
          setTimeout(() => { $mainCtrl.notification('No results found. Check spelling and try again.'); }, 500);        
        }
      } catch (ex) {
        if (ex.status === 403) {
          setTimeout(() => { $mainCtrl.notification('Google search limit exceeded. Try again later'); }, 500);
        } else {
          const error = ex.responseJSON && ex.responseJSON.error && ex.responseJSON.message || 'Uknown error occurred. Try again later';
          setTimeout(() => { $mainCtrl.notification(`Error: ${error}`); }, 500);          
        }
      }
    } else {
      results.slideUp(1000);     
    }
  },
  deletedItem: async (itemId) => {
    $listCtrl.lookBusyWrapperForListButtons(() => {
      const itemIndex = itemId.split('-')[1];
      $mainCtrl.context.family.members[0].list.splice(itemIndex, 1);
      return 'item deleted';
    });
  },
  newItem: () => {
    const title = $(`.listitem-new-title`)[0].value;
    if (!title || title.replace(/^\s+|\s+$/g, '').length === 0) {
      $mainCtrl.notification('please input an item name');
      return;
    };
    $listCtrl.lookBusyWrapperForListButtons(() => {
      const item = new $m.Item(title);
      $mainCtrl.context.family.members[$mainCtrl.context.currentMemberIndex].list.push(item);
      return 'item added';
    });
  },
  lookBusyWrapperForListButtons: async (script) => {
    $mainCtrl.lookBusy('list-holder', true);
    const successNotification = script() || '';
    try {
      await $familyProvider.familyPut($mainCtrl.context.family.famId, $mainCtrl.context.family.members[$mainCtrl.context.currentMemberIndex].memberId);
    } catch(err) {
      setTimeout(() => { $mainCtrl.lookBusy('list-holder', false) }, 1000);
      setTimeout(() => { $mainCtrl.notification(`action failed`) }, 500);
    };
    $listCtrl.updateListView($mainCtrl.context.family.members[$mainCtrl.context.currentMemberIndex].list);
    setTimeout(() => { $mainCtrl.lookBusy('list-holder', false) }, 1000);
    setTimeout(() => { $mainCtrl.notification(successNotification) }, 500);
  },

}
