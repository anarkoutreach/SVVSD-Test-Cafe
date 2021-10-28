import { Selector, t } from 'testcafe';
import Util from '../Utilities/util';

export default class SearchPage {
	contentTab: Selector;

	groupsTab: Selector;

	usersTab: Selector;

	ACListTab: Selector;

	templatesTab: Selector;

	workItemsTab: Selector;

	results: Selector;

	searchResults: Selector;

    activeTab: Selector;

    activitiesTab: Selector;

    /** @description the search page class,  */
    constructor() {
      this.activitiesTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'Activity');
      this.contentTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'Content');
      this.groupsTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'Groups');
      this.usersTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'Users');
      this.ACListTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'ACList');
      this.templatesTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'Templates');
      this.workItemsTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'WorkItem');
      this.results = Selector('div.searchItemInfo');
      this.searchResults = Selector('div.searchResults');
      this.activeTab = Selector('button.searchFilter-tab.selected.btn.btn-link');
    }

    /** @description ensure a search exists in search results based on a search text bariable */
    async validateSerch(SearchText: String) {
      const count = await this.results.childElementCount;
      let i;
      const results = [];
      const util = new Util();
      if (util.Verbose)console.log(`validateSerch: validate search count: ${count}`);
      for (i; i > count; i += 1) {
        if (util.Verbose)console.log(`-- validateSerch: for loop validate search loop #: ${count} --`);
		   const name = await this.results.child(i).innerText;
		   results[i] = await name;
		   const expectedText = await SearchText.toLocaleLowerCase();
		   await t
		   .expect(results[i].includes(expectedText));
		  console.log('validateSerch: validated search');
      }
    }

    /**
	 * @description from the search page check the active tab
	 * @returns a string containing the title of the tab that is currently active on the search page
	 */
    // eslint-disable-next-line class-methods-use-this
    async getActiveTab() {
      const activeTab = await Selector('#search-tab').child().child('.active').child().innerText;
      return activeTab;
    }

    /**
	 * @description while on the search page get and return the text of the banner as a string
	 * @returns a string containing the banner of the search page IE: "180 group(s) found!"
	 */
    // eslint-disable-next-line class-methods-use-this
    async getBannerText() {
      const bannerText = await Selector('#searchResults').child('h5').innerText;
      return bannerText;
    }
}
