import { Selector, t } from "testcafe";
import Conversation from "./PageComponents/conversation"
import Alerts from "./Alerts"
import WI from "./WI";
import {tabs} from "./PageComponents/tabs";
import SearchPage from "./search-page"
import util from "../Utilities/util";
import * as fs from 'fs';
import * as events from "events";

const tick = () => 
  new Promise(resolve => {
    setTimeout(() => {
      console.log('tick')
      resolve()
    }, 1000)
  })
  //using this event system, creating massive stress tests on WI items is speed up by a ton, as this ensures data for the WI persists even through new WI objects being created if it needs to,
  // due to a few places creating new WI objects when still inside the same WI, this fixes that problem
  //
  class MyClass extends events.EventEmitter {
	// ...
	Update() {
		return new Promise( resolve =>{
			let fsWait;
			const watcher = fs.watch("C:\\Users\\mmful\\Desktop\\github\\SVVSD-Test-Cafe\\matthew.fuller\\saved_data\\ActiveWI.json", (event, filename) => {
				if (filename) {
				  if (fsWait) return;
				  fsWait = setTimeout(() => {
					fsWait = false;
				  }, 100);
				  if(event === "change"){
					  resolve(true)
					  watcher.close();
				  }
				}
			  });
			this.emit("update");
		})
	  
		
	}
  }
export default class FeedPage {
	userInitialsIcon: Selector;
	firstConversation: Selector;
	firstAddCommentBtn: any;
	firstAddCommentSubmitBtn: any;
	firstAddCommentInput: any;
	addCommentCamera: Selector;
	addCommentCapture: Selector;
	commentsTextArea: Selector;
	createButton: Selector;
	createOptionsDwi: Selector;
	getSearchBar: Selector;
	getSearchSubmitBtn: Selector;
	eventEmitter = new MyClass();
	

	constructor() {
		this.getSearchSubmitBtn = Selector('#feedSearchBar .btn-default');
		this.getSearchBar = Selector('#search');
		this.createButton = Selector('div#navbarCreate.dropdown-toggle');
		this.createOptionsDwi = Selector('p.createOptionText.dwi');
		this.userInitialsIcon = Selector("#navbarUserInfo .initials");
		this.firstConversation = Selector('.newsItem[data-name]');
		this.firstAddCommentBtn = this.firstConversation.find('.addCommentButton');
		this.firstAddCommentSubmitBtn = this.firstConversation.find('#modifyButtons .btn-primary');
		this.firstAddCommentInput = this.firstConversation.find('.new-comment');
		this.firstAddCommentSubmitBtn = Selector('[data-name="ahsmzdfhn"] #modifyButtons .btn-primary');
		this.addCommentCamera = Selector('[data-name="ahsmzdfhn"] .newCommentCameraContainer');
		this.addCommentCapture = Selector('[data-name="ahsmzdfhn"] .fade.in #captureOption');
		this.commentsTextArea = Selector("#comments");
	}

	async addCommentToFirstConversation(text) {
		const Util = new util;
		let firstConversation = new Conversation(this.firstConversation);

		await firstConversation
			.addComment(text);
			if(Util.Verbose)console.log("-- addCommentToFirstConversation: added \"" + text + "\" to first conversation --");
	}

	getFirstConversation(): Conversation {
		const Util = new util;
		if(Util.Verbose)console.log("-- getFirstConversation: returning new Conversation --");
		return new Conversation(this.firstConversation);
	}

	async validateInitials() {
		const Util = new util;
		await t.
			expect(this.userInitialsIcon.textContent).eql(t.ctx.user.initials);
			if(Util.Verbose)console.log("-- validateInitals: validated user initals --");
	}

	async returnToHome() {
	const alerts = new Alerts();
	const Util = new util;
	const feedpage = new FeedPage();
		await t
			.setNativeDialogHandler(() => true)
			.click(alerts.getAnarkLogo)
			.expect(this.getSearchBar.visible).eql(true);
			if(Util.Verbose)console.log("-- returnToHome: returned to home page --")
		}

		combineStringWithRandID(title: string, length: number){
			const Util = new util;
			let result = title + "random id" + Util.randchar(length);
			if(Util.Verbose)console.log("-- combineStringWithRandID: Returning string(Title) combined with random id --")
			return result;
		}
	async createWI(workitem: WI, length) {
		
	const alerts = new Alerts();
	const Util = new util;
	const searchpage = new SearchPage;
	//???????? why
		let generinworkitem = workitem;
	
		await this.openAWICreateMenu();
		
		await this.FillallWIFields(workitem);
		await t
	
			.setNativeDialogHandler(() => true)
			.click(alerts.getAWICreateBtn)
			.expect(generinworkitem.getDWItab.visible).eql(true) ;
			 console.log('-- createWi: work instruction created --');
		await this.returnToHome();
		if(Util.Verbose) console.log(' -- createWI: returned to home page from work instruction --');
		await this.SearchFor(workitem.title, tabs.WORKITEMS);
		let searchResult = await this.findSearchResult(workitem.title, tabs.WORKITEMS);
		await t
		.click(searchResult)
		.expect(generinworkitem.wiTitle.visible).eql(true);	
		
		this.eventEmitter.on("close", async () =>{
			this.onCloseWI;
		});
		this.eventEmitter.on("update", async () =>{
			fs.writeFileSync("C:\\Users\\mmful\\Desktop\\github\\SVVSD-Test-Cafe\\matthew.fuller\\saved_data\\ActiveWI.json", JSON.stringify(generinworkitem))
		});
		
		workitem.FeedPageEventEmitter = this.eventEmitter;
		await this.eventEmitter.Update();
	}
	
	async onCloseWI(){
		fs.writeFileSync('C:\\Users\\mmful\\OneDrive\\MBEWeb - Testing\\git\\SVVSD-Test-Cafe\\matthew.fuller\\saved_data\\ActiveWI.json', "{\"CLOSED\":\"TRUE\"}")
	}

	async FillallWIFields(workitem: WI) {
		const alerts = new Alerts();
		const Util = new util;
		await alerts.FillForm(1, workitem.title, workitem);
		await alerts.FillForm(2, workitem.description, workitem);
		await alerts.FillForm(3, workitem.partnum, workitem);
		await alerts.FillForm(4, workitem.revision, workitem);
		await alerts.FillForm(5, workitem.version, workitem);
		await alerts.FillForm(7, null, workitem)
		await alerts.FillForm(8, null, workitem)
		
		if(Util.Verbose)console.log("-- FillallWIFields: Filled in all fields of a WI create form --");
	}
	async clickWIcreateBtn(){
		const alerts = new Alerts();
		let generinworkitem = new WI
		await t
			.setNativeDialogHandler(() => true)
			.click(alerts.getAWICreateBtn);
	}

	async findSearchResult (text, tab: tabs){
		const Util = new util;
		const searchpage = new SearchPage;
		let count = await searchpage.results.childElementCount;
		if(Util.Verbose)console.log("--findSearchResult: child element count: " + count + " --")
		let i = 0;
		let results = [];
		for(i; i < count; i++){
			if(Util.Verbose)console.log("--findSearchResult: find search results -  entered for loop with: " + count + " --");
		   let name = await searchpage.results.child(i).innerText;
		   results[i] = await name;
		   let lowerCaseResult = await results[i].toLowerCase()
		   let expectedText = await text.toLocaleLowerCase();
		   if(Util.Verbose)console.log(" --findSearchResult: script expected : \"" + expectedText + "\" but it recived: \"" + lowerCaseResult +"\" --");
		   await t
		   .click(searchpage.workItemsTab)
		   .expect(await lowerCaseResult.includes(expectedText)).eql(true);
		   
		  if(lowerCaseResult.includes(expectedText)){
			console.log("findSearchResult: expected text exists");
			if(Util.Verbose)console.log(" -- findSearchResult: findSearchResult has functioned properly and returns Selector of search -- ");
		   return Selector('#searchResults').child().sibling().child().child(i).child(".searchItemInfo").child();
		   
		  }
		  
	}
} 
	async SearchFor(text , tab: tabs) {
		
		const Util = new util;
		const alerts = new Alerts()
		const searchpage = new SearchPage()
		await t 
		.expect(this.getSearchBar.exists).eql(true)
		.click(this.getSearchBar)
		.typeText(this.getSearchBar, text)
		.expect(this.getSearchSubmitBtn.exists).eql(true)
		.click(this.getSearchSubmitBtn)
		.expect(searchpage.workItemsTab.visible).eql(true);
		if(Util.Verbose) console.log('-- SearchFor: succsessfully got to search page');
		let activeTab = await searchpage.activeTab.innerText;
		
		switch(tab){
			
			case tabs.CONTENT:
				await t
				.click(searchpage.contentTab);
			 break;
			 case tabs.GROUPS:
				await t
				.click(searchpage.groupsTab);
			 break;
			 case tabs.USERS:
				await t
				.click(searchpage.usersTab);
			 break;
			 case tabs.TEMPLATES:
				await t
				.click(searchpage.templatesTab);
			 break;
			 case tabs.ACLIST:
				await t
				.click(searchpage.ACListTab);
			 break;
			 case tabs.WORKITEMS:
				await t
				.click(searchpage.workItemsTab);	
			 break;
				default:
				if(Util.Errors)console.log("enter the enum tab that you would like to use");
				break;
			 }
			 let activetab2 = await Selector('#search-tab').child().child('.active').child().innerText;
			 let bannerText = await Selector('#searchResults').child('h5').innerText;
				
				if(Util.Verbose)console.log( "-- searchFor: searched tab: " + tab + "active tab: " + activetab2 + " --");
				if(Util.Verbose)console.log("-- searchFor: tab's banner text =" + bannerText.toLocaleLowerCase() + " --");
				await t
				.expect( bannerText.toLocaleLowerCase().includes( tab.toLocaleLowerCase())).eql(true)
				.expect( activetab2.toLocaleLowerCase().includes( tab.toLocaleLowerCase())).eql(true);
				if(Util.Verbose)console.log("-- searchFor: all \"search for\" tests have passed --");
		await searchpage.validateSerch(text);
	}
	async navigateToWi(tab: tabs, workitem: WI) {
	
		const alerts = new Alerts();
		const Util = new util;
		const searchpage = new SearchPage;
		const title = workitem.title;
		if(Util.Verbose)console.log("-- navigateToWi: started Navigate To WI script ()--");
		if(Util.Verbose)console.log("-- navigateToWi:started \" Search for script \"--");
		await this.SearchFor(title, tabs.WORKITEMS);
		if(Util.Verbose)console.log("-- navigateToWi: finished \"Search for\" script --");
		if(Util.Verbose)console.log("-- navigateToWi: started \"find search result\" -script --");
		let searchResult = await  this.findSearchResult(title, tabs.WORKITEMS);
		if(Util.Verbose)console.log("-- navigateToWi: finished \"Search for result\" script --");
		if(Util.Verbose)console.log("-- navigateToWi: return - Search Result --");
		return searchResult;

	}

	async NavigateToEditWI(tab: tabs, workitem: WI){
		const alerts = new Alerts;
		const Util = new util;
		let searchResult = await this.navigateToWi(tab, workitem);
		await t
		.click(searchResult)
		.expect(workitem.wiTitle.visible).eql(true)
		.expect(workitem.settingsGearBtn.exists).eql(true)
		.click(workitem.settingsGearBtn)
		.expect(workitem.settingsGearPanel.exists).eql(true)
		.expect(workitem.settingsGearPanelEdit.exists).eql(true)
		.click(workitem.settingsGearPanelEdit);
		if(Util.Verbose)console.log("Navigated to Edit workitem");
	}
	async deleteWI(tab: tabs, workitem: WI){
		this.returnToHome();
		const alerts = new Alerts;
		const Util = new util;
		let searchResult = await this.navigateToWi(tab, workitem);
		await t
		.expect(searchResult.exists).eql(true)
		.click(searchResult)
		.expect(workitem.wiTitle.visible).eql(true)
		.expect(workitem.settingsGearBtn.exists).eql(true)
		.click(workitem.settingsGearBtn)
		.expect(workitem.settingsGearPanel.exists).eql(true)
		.expect(workitem.settingsGearPanelDelete.exists).eql(true)
		.click(workitem.settingsGearPanelDelete)
		.expect(searchResult.exists).eql(false);
		if(Util.Verbose)console.log("-- deleteWI: finished deleating WI --");
		await t.click(alerts.getGenericConfirmBtn);
		this.eventEmitter.emit("close");
	}

	async openAWICreateMenuThenClose() {
		const alerts = new Alerts()
		let firstConversation = new Conversation(this.firstConversation);

		await t
			.expect(this.createButton.with({ visibilityCheck: true }).exists).ok('this should pass')
			.click(this.createButton)
			.click(this.createOptionsDwi)
			.expect(alerts.getModalForm.with({ visibilityCheck: true }).exists).ok('this should pass')
			.expect(alerts.getAWICreateBtn.visible).eql(true)
			.expect(alerts.getAWICancelBtn.visible).eql(true)
			.click(alerts.getAWICancelBtn)
			.expect(this.firstConversation.visible).eql(true);

	}

	async openAWICreateMenu() {
		const alerts = new Alerts()
		let firstConversation = new Conversation(this.firstConversation);

		await t
			.expect(this.createButton.with({ visibilityCheck: true }).exists).ok('this should pass')
			.click(this.createButton)
			.click(this.createOptionsDwi)
			.expect(alerts.getModalForm.with({ visibilityCheck: true }).exists).ok('this should pass')
			.expect(alerts.getAWICreateBtn.visible).eql(true)
			.expect(alerts.getAWICancelBtn.visible).eql(true);
	}


	async closeAWIMenu() {
		const alerts = new Alerts()
		let firstConversation = new Conversation(this.firstConversation);
		await t
			.expect(alerts.getAWICreateBtn.visible).eql(true)
			.expect(alerts.getAWICancelBtn.visible).eql(true)
			.click(alerts.getAWICancelBtn)
			.expect(this.firstConversation.visible).eql(true);
	}


}
