import { Selector, t } from "testcafe";
import util from "../Utilities/util";

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

	constructor() {
		this.contentTab = Selector("#search-tab-tab-Content");
		this.groupsTab = Selector("#search-tab-tab-Group");
		this.usersTab = Selector("#search-tab-tab-User");
		this.ACListTab = Selector("#search-tab-tab-ACList");
		this.templatesTab = Selector("#search-tab-tab-Template");
		this.workItemsTab = Selector("#search-tab-tab-WorkItem");
		this.results = Selector('#results');
		this.searchResults = Selector('#searchResults');
		this.activeTab = Selector('#search-tab').child().child('.active').child();
	}

	async validateSerch(SearchText: String) {
		let count = await this.results.childElementCount;
		let i;
		let results = [];
		const Util = new util;
		if(Util.Verbose)console.log("validateSerch: validate search count: " + count);
		for(i; i > count; i++){
			if(Util.Verbose)console.log("-- validateSerch: for loop validate search loop #: " + count + " --");
		   let name = await this.results.child(i).innerText;
		   results[i] = await name;
		   let lowerCaseResult = await results[i].toLowerCase()
		   let expectedText = await SearchText.toLocaleLowerCase();
		   await t
		   .expect(results[i].includes(expectedText));
		  console.log("validateSerch: validated search");
		}
		
	}
}