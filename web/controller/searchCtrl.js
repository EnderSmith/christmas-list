const $searchCtrl = {
  searchGet: async (query) => {
    const uri = new $m.GoogleCustomSearch(query).uri;
    const response = await $.get(uri);
    const searchResults = response.items;
    return searchResults;
  },
  createSearchResultsView: (searchResults) => {
    let searchResultsView = '';
    for (const resultIndex in searchResults) {
      const resultModel = new $m.SearchResult(searchResults[resultIndex]);
      searchResultsView += $v.component.searchResult(resultModel);
    };
    return searchResultsView;
  },
  loadSearchResultsView: async (query, selector) => {
    const searchResults = await $searchCtrl.searchGet(query);
    const searchResultsView = $searchCtrl.createSearchResultsView(searchResults);
    $(`${selector}`).html(searchResultsView);
  }
}