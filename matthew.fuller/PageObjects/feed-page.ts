import { Selector, t } from 'testcafe';
import * as fs from 'fs';
import * as events from 'events';
import Conversation from './PageComponents/conversation';
import Alerts from './Alerts';
import WI from './WI';
import { tabs } from './PageComponents/tabs';
import SearchPage from './search-page';
import Util from '../Utilities/util';
import UserPage from './user-page';
import userObj from './PageComponents/userObj';
import ActivityObj from './PageComponents/activityObj';
import ActivityPage from './activity-page';
import SharedElements from './sharedElements';

// using this event system, creating massive stress tests on WI items is speed up by a ton,
// as this ensures data for the WI persists even through new WI objects being created if
// it needs to,
// due to a few places creating new WI objects when still inside the same WI,
// this fixes that problem

// Just don't touch this.... i will be documenting this last :(
class MyClass extends events.EventEmitter {
  // ...
  Update() {
    return new Promise((resolve) => {
      let fsWait;

      const watcher = fs.watch('./saved_data/ActiveWI.json', (event, filename) => {
        if (filename) {
          if (fsWait) resolve('timeout');
          fsWait = setTimeout(() => {
            fsWait = true;
          }, 100);
          if (event === 'change') {
            watcher.close();
            resolve('timeout');
          }
        }
      });
      this.emit('update');
    });
  }
}
export default class FeedPage {
	/** @description the field in the userInfoBox containing the user Name */
	userNameField: Selector;

	/** @description the box containing all the user info on the main feed page */
	userInfoBox: Selector;

	/** @description the user initials icon in the upper right */
	userInitialsIcon: Selector;

	/** @description the button inside of the user options to sign out */
	signOutBtn: Selector;

	/** @description the user options settings (clicking on the initials icon) */
	userInitialsBtn: Selector;

	/** @description the first conversation */
	firstConversation: Selector;

	/** @description the first add comment btn on the page */
	firstAddCommentBtn: any;

	/** @description the first submit button on the first comment */
	firstAddCommentSubmitBtn: any;

	/** @description the first input for the first comment */
	firstAddCommentInput: any;

	/** @description the add picture button for comments */
	addCommentCamera: Selector;

	/** @description the capture button for comments */
	addCommentCapture: Selector;

	/** @description the comment text area */
	commentsTextArea: Selector;

	/** @description the button to create things in the upper right */
	createButton: Selector;

	/** @description in the options menu from the create button, the author WI buttton */
	createOptionsDwi: Selector;

	/** @description in the options menu from the create button, the create activity buttton */
	createOptionsActivity: Selector;

	/** @description in the options menu from the create button, the button to create a user */
	createOptionsUser: Selector;

	/** @description the search bar */
	getSearchBar: Selector;

	/** @deprecated the button for submiting the search in the search bar no longer exists */
	getSearchSubmitBtn: Selector;

	/** @description the group create btn */
	createOptionsGroup: Selector;

	/** @description the generic cog btn */
	cogBtn: Selector;

	eventEmitter = new MyClass();

	constructor() {
	  const sharedElement = new SharedElements();
	  this.createOptionsActivity = Selector('a.dropdown-item').withAttribute('data-title', 'Activity');
	  this.userInfoBox = Selector('#userBoxRoles');
	  this.userNameField = this.userInfoBox.child('p').nth(0);
	  this.signOutBtn = Selector('#signout');
	  this.userInitialsBtn = Selector('button#navbarUserInfo');
	  this.getSearchSubmitBtn = Selector('#feedSearchBar .btn-default');
	  this.getSearchBar = Selector('input.searchBar.form-control');
	  this.createButton = Selector('button.dropdown-toggle.btn.btn-primary');
	  this.createOptionsDwi = Selector('a.dropdown-item').withAttribute('data-title', 'Work Item');
	  this.createOptionsGroup = Selector('a.dropdown-item').withAttribute('data-title', 'Group');
	  this.createOptionsUser = Selector('a.dropdown-item').withAttribute('data-title', 'User');
	  this.userInitialsIcon = Selector('#navbarUserInfo .initials');
	  this.firstConversation = Selector('.newsItem[data-name]');
	  this.firstAddCommentBtn = this.firstConversation.find('.addCommentButton');
	  this.firstAddCommentSubmitBtn = this.firstConversation.find('#modifyButtons .btn-primary');
	  this.firstAddCommentInput = this.firstConversation.find('.new-comment');
	  this.firstAddCommentSubmitBtn = Selector('[data-name="ahsmzdfhn"] #modifyButtons .btn-primary');
	  this.addCommentCamera = Selector('[data-name="ahsmzdfhn"] .newCommentCameraContainer');
	  this.addCommentCapture = Selector('[data-name="ahsmzdfhn"] .fade.in #captureOption');
	  this.commentsTextArea = Selector('#comments');
	  this.cogBtn = sharedElement.genericCog;
	}

	/**
	 * @description delete an activity using an activity object
	 * @param obj activity object to delete
	 */
	async deleteActivity(obj: ActivityObj) {
	  const sharedElement = new SharedElements();
	  const activityPage = new ActivityPage();
	  activityPage.navigateToActivity(obj.title);
	  await t
	  .expect(this.cogBtn.visible).eql(true)
	  .click(this.cogBtn)
	  .expect(sharedElement.dropDownDelete.visible)
	  .eql(true)
	  .click(sharedElement.dropDownDelete)
	  .expect(sharedElement.genericCreateBtn.visible)
	  .eql(true)
	  .click(sharedElement.genericCreateBtn);
	}

	/**
	 * @description open the group menu
	 * @returns null
	 */
	async openGroupMenu() {
	  await t
	    .setNativeDialogHandler(() => true)
	    .expect(this.createButton.exists).eql(true)
	    .click(this.createButton)
	    .expect(this.createOptionsGroup.exists)
	    .eql(true)
	    .expect(this.createOptionsGroup.visible)
	    .eql(true)
	    .click(this.createOptionsGroup);
	}

	/**
	 * @description check the UserInfo Box for name and roles of current user,
	 *  then match them to a userObj
	 * @param user the userObj to compare */
	async verifyUserAndRoles(user: userObj) {
	  await t.expect(
		  await (await this.getUsername()).toLowerCase(),
	  ).eql(await user.name.toLowerCase());
	  user.roles.forEach(async (role) => {
	    await t.expect((await this.getAllUserInfo()).includes(await role.toLowerCase()));
	  });
	}

	/** @returns an array containing all information contained in UserInfoBox */
	async getAllUserInfo() {
	  const array = [];
	  for (let index = 0; index < await this.userInfoBox.child('p').count; index += 1) {
	    const element = await this.userInfoBox.child('p').nth(index).innerText;
	    array.push(await element.toLowerCase());
	  }
	  return array;
	}

	/** @returns the username field innertext */
	async getUsername() {
	  return this.userNameField.innerText;
	}

	/** @description clicks the icon in the upper right of the feed page
	 *  containing the initials of the user */
	async clickUserIcon() {
	  await t
	    .expect(this.userInitialsBtn.exists && this.userInitialsBtn.visible).eql(true)
	    .click(this.userInitialsBtn);
	}

	/** @deprecated should not be used given how testcafe users work */
	async signOut() {
	  await this.clickUserIcon();
	  await t
	    .setNativeDialogHandler(() => true)
	    .expect(this.signOutBtn.visible).eql(true)
	    .click(this.signOutBtn);
	}

	/** @description opens the create new user page */
	async navigateToCreateNewUser() {
	  const userPage = new UserPage();
	  await t
	    .setNativeDialogHandler(() => true)
	    .expect(this.createButton.exists).eql(true)
	    .click(this.createButton)
	    .expect(this.createOptionsUser.exists)
	    .eql(true)
	    .click(this.createOptionsUser)
	    .expect(userPage.checkInUserPage())
	    .eql(true);
	}

	async addCommentToFirstConversation(text) {
	  const util = new Util();
	  const firstConversation = new Conversation(this.firstConversation);

	  await firstConversation
	    .addComment(text);
	  if (util.Verbose) console.log(`-- addCommentToFirstConversation: added "${text}" to first conversation --`);
	}

	getFirstConversation(): Conversation {
	  const util = new Util();
	  if (util.Verbose) console.log('-- getFirstConversation: returning new Conversation --');
	  return new Conversation(this.firstConversation);
	}

	async validateInitials() {
	  const util = new Util();
	  await t
	    .expect(this.userInitialsIcon.textContent).eql(t.ctx.user.initials);
	  if (util.Verbose) console.log('-- validateInitals: validated user initals --');
	}

	async returnToHome() {
	  const alerts = new Alerts();
	  const util = new Util();
	  const workitem = new WI();
	  if (!alerts.getAnarkLogo.exists) {
	    await t
	      .setNativeDialogHandler(() => true)
	      .expect(workitem.smallAnarkLogo.exists).eql(true)
	      .click(workitem.smallAnarkLogo)
	      .expect(alerts.getAnarkLogo.exists)
	      .eql(true)
	      .click(alerts.getAnarkLogo)
	      .expect(this.getSearchBar.visible)
	      .eql(true);
	  } else {
	    await t
	      .setNativeDialogHandler(() => true)
	      .expect(alerts.getAnarkLogo.exists).eql(true)
	      .click(alerts.getAnarkLogo)
	      .expect(this.getSearchBar.visible)
	      .eql(true);
	  }
	  if (util.Verbose) console.log('-- returnToHome: returned to home page --');
	}

	// eslint-disable-next-line class-methods-use-this
	combineStringWithRandID(title: string, length: number) {
	  const util = new Util();
	  const result = `${title}random id${util.randChar(length)}`;
	  if (util.Verbose) console.log('-- combineStringWithRandID: Returning string(Title) combined with random id --');
	  return result;
	}

	/**
	 * @description this function will create a wi then return to the home page
	 * @param workitem the workitem that should be created
	 */
	async CreateWIthenReturnHome(workitem: WI) {
	  const alerts = new Alerts();
	  const util = new Util();
	  // ???????? why
	  const generinworkitem = workitem;
	  await this.openAWICreateMenu();

	  await this.FillallWIFields(workitem);
	  await t

	    .setNativeDialogHandler(() => true)
	    .click(alerts.getAWICreateBtn)
	    .wait(200)
	    .expect(generinworkitem.getDWItab.visible)
	    .eql(true);
	  if (util.Verbose) console.log('-- createWi: work instruction created --');
	  await this.returnToHome();
	}

	/**
	 *
	 * @deprecated this appears to use the "my activites" tab which no longer exists
	 */
	// eslint-disable-next-line class-methods-use-this
	async selectActivity(name:string) {
	  const specific = Selector('div.myActivityTitle').withText(name.toUpperCase());
	  await t
	    .expect(specific.exists).eql(true)
	    .click(specific);
	}

	async createWI(workitem: WI) {
	  const util = new Util();
	  // ???????? why
	  const generinworkitem = workitem;

	  await this.CreateWIthenReturnHome(workitem);
	  if (util.Verbose) console.log(' -- createWI: returned to home page from work instruction --');
	  await this.SearchFor(workitem.title, tabs.WORKITEMS);
	  const searchResult = await this.findSearchResult(workitem.title, tabs.WORKITEMS);
	  if (await searchResult.exists === false) {
	    await t.expect(searchResult.exists).eql(true);
	    console.log('TEST failed as search result does not exist');
	  }
	  await t
	    .click(searchResult)
	    .click(generinworkitem.settingsGearBtn)
	  // due to work items no longer having titles displayed on the view page
	  // you must change to the edit page first
	    .click(generinworkitem.settingsGearPanelEdit)
	    .expect(generinworkitem.wiTitle.visible)
	    .eql(true);

	  this.eventEmitter.on('close', async () => {
	    this.onCloseWI;
	  });
	  this.eventEmitter.on('update', async () => {
	    fs.writeFileSync('./saved_data/ActiveWI.json', JSON.stringify(generinworkitem));
	  });

	  workitem.FeedPageEventEmitter = this.eventEmitter;
	  await this.eventEmitter.Update();
	}

	/**
	 * @description this will create a workitem and then test if there is a
	 *  title in the "view" mode of the work item
	 * @param workitem the workitem that should be created
	 */
	async createWICheckIfTitle(workitem: WI) {
	  const util = new Util();
	  // this is bad dont do this
	  const generinworkitem = workitem;
	  await this.CreateWIthenReturnHome(workitem);
	  if (util.Verbose) console.log(' -- createWI: returned to home page from work instruction --');
	  await this.SearchFor(workitem.title, tabs.WORKITEMS);
	  const searchResult = await this.findSearchResult(workitem.title, tabs.WORKITEMS);
	  await t
	    .click(searchResult)
	    .wait(100);
	  await t
	    .expect(generinworkitem.wiViewTitle.visible).eql(true)
	    .expect(
	      (await generinworkitem.wiViewTitle.innerText).toLowerCase(),
	    ).eql(generinworkitem.title.toLowerCase());
	}

	// eslint-disable-next-line class-methods-use-this
	async onCloseWI() {
	  fs.writeFileSync('./saved_data/ActiveWI.json', '{"CLOSED":"TRUE"}');
	}

	// eslint-disable-next-line class-methods-use-this
	async FillallWIFields(workitem: WI) {
	  const alerts = new Alerts();
	  const util = new Util();
	  await alerts.FillForm(1, workitem.title, workitem);
	  await alerts.FillForm(2, workitem.description, workitem);
	  await alerts.FillForm(3, workitem.partnum, workitem);
	  await alerts.FillForm(4, workitem.revision, workitem);
	  await alerts.FillForm(5, workitem.version, workitem);
	  await alerts.FillForm(7, null, workitem);
	  await alerts.FillForm(8, null, workitem);

	  if (util.Verbose) console.log('-- FillallWIFields: Filled in all fields of a WI create form --');
	}

	// eslint-disable-next-line class-methods-use-this
	async clickWIcreateBtn() {
	  const alerts = new Alerts();
	  await t
	    .setNativeDialogHandler(() => true)
	    .click(alerts.getAWICreateBtn);
	}

	/**
		 * @description from the search page click on an item matching the text param.
		 * @param text the text used to validate
		 * @param tab the tab to search in
		 * @param verify
		 * @returns
		 */
	// eslint-disable-next-line consistent-return
	async findSearchResult(text, tab: tabs, verify = true) {
	  const util = new Util();
	  const searchpage = new SearchPage();
	  const count = await searchpage.results.childElementCount;
	  if (util.Verbose) console.log(`--findSearchResult: child element count: ${count} --`);
	  let i = 0;
	  const results = [];
	  for (i; i < count; i += 1) {
	    if (util.Verbose) console.log(`--findSearchResult: find search results -  entered for loop with: ${count} --`);
	    const name = await searchpage.results.child(i).innerText;
	    results[i] = await name;
	    const lowerCaseResult = await results[i].toLowerCase();
	    const expectedText = await text.toLocaleLowerCase();
	    if (util.Verbose) console.log(` --findSearchResult: script expected : "${expectedText}" but it recived: "${lowerCaseResult}" --`);
	    await this.switchTabs(tab);
	    await t
	      .expect(await lowerCaseResult.includes(expectedText)).eql(verify);

	    if (lowerCaseResult.includes(expectedText)) {
	      if (util.Verbose) console.log('findSearchResult: expected text exists');
	      if (util.Verbose) console.log(' -- findSearchResult: findSearchResult has functioned properly and returns Selector of search -- ');
	      return Selector('#searchResults').child().sibling().child()
	        .child(i)
	        .child('.searchItemInfo')
	        .child();
	    }
	  }
	}

	/**
	 * @description navigate to the search page by typing a string into the search bar in the feedpage
	 * @param text the text to search for
	 */
	async naviagteToSearchTab(text = ' ') {
	  const searchpage = new SearchPage();
	  await t
	    .setNativeDialogHandler(() => true)
	    .expect(this.getSearchBar.exists).eql(true)
	    .click(this.getSearchBar)
	    .typeText(this.getSearchBar, text)
	    .pressKey('enter')
	    .expect(searchpage.activitiesTab.visible)
	    .eql(true);
	}

	// eslint-disable-next-line class-methods-use-this
	async switchTabs(tab:tabs) {
	  const util = new Util();
	  const searchpage = new SearchPage();
	  switch (tab) {
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
	    case tabs.ACTIVITIES:
	      await t
	        .click(searchpage.activitiesTab);
	      break;
	    default:
	      if (util.Errors) console.log('enter the enum tab that you would like to use');
	      break;
	  }
	}

	/**
	 *
	 * @description search for a string in a specific tab of the search page
	 * @param text the string to search for
	 * @param tab the tab to search in: an enum of tab
	 */
	async SearchFor(text: string, tab: tabs) {
	  const util = new Util();
	  const searchpage = new SearchPage();
	  await this.naviagteToSearchTab(text);
	  if (util.Verbose) console.log('-- SearchFor: succsessfully got to search page');
	  // eslint-disable-next-line no-unused-vars
	  const activeTab = await searchpage.activeTab.innerText;
	  await this.switchTabs(tab);
	  /** @description the active tab after the active tab has switched */
	  const activetab2 = await Selector('button.searchFilter-tab.selected.btn.btn-link').innerText;
	  const bannerText = await Selector('div.searchResultsCount').innerText;

	  if (util.Verbose) console.log(`-- searchFor: searched tab: ${tab}active tab: ${activetab2} --`);
	  if (util.Verbose) console.log(`-- searchFor: tab's banner text =${bannerText.toLocaleLowerCase()} --`);
	  if (tab !== tabs.ACLIST) {
	    await t
	  // expect that the banner text and the active tab concur that the
	  // program has navigated and searched in the proper search tab.
	    .expect(bannerText.toLocaleLowerCase().includes(tab.toLocaleLowerCase()) || bannerText.includes('1')).eql(true)
	    .expect(activetab2.toLocaleLowerCase().includes(tab.toLocaleLowerCase())).eql(true);
	  } else {
	    await t
	  // expect that the banner text and the active tab concur that
	  // the program has navigated and searched in the proper search tab.
	  // if the banner text has 1 in it this will still pass as the next expect statement will catch
	    .expect(bannerText.toLocaleLowerCase().includes('access control list') || bannerText.includes('1')).eql(true)
	    .expect(activetab2.toLocaleLowerCase().includes(tab.toLocaleLowerCase())).eql(true);
	  }
	  if (util.Verbose) console.log('-- searchFor: all "search for" tests have passed --');
	  // search validation should occur outside of this function as this
	  // is just intended to search for a result.
	  // await searchpage.validateSerch(text);
	}

	/**
	 * @description navigate from feedpage to work item
	 * @param tab should not be used?
	 * @param workitem the work item object
	 * @returns a selector of the search result
	 */
	async navigateToWi(tab: tabs, workitem: WI) {
	  const util = new Util();
	  const { title } = workitem;
	  if (util.Verbose) console.log('-- navigateToWi: started Navigate To WI script ()--');
	  if (util.Verbose) console.log('-- navigateToWi:started " Search for script "--');
	  await this.SearchFor(title, tabs.WORKITEMS);
	  if (util.Verbose) console.log('-- navigateToWi: finished "Search for" script --');
	  if (util.Verbose) console.log('-- navigateToWi: started "find search result" -script --');
	  const searchResult = await this.findSearchResult(title, tabs.WORKITEMS);
	  if (util.Verbose) console.log('-- navigateToWi: finished "Search for result" script --');
	  if (util.Verbose) console.log('-- navigateToWi: return - Search Result --');
	  return searchResult;
	}

	/**
	 * @description navigate to a work item in edit mode
	 * @param tab probably unused
	 * @param workitem the work item object to find
	 */
	async NavigateToEditWI(tab: tabs, workitem: WI) {
	  const util = new Util();
	  const searchResult = await this.navigateToWi(tab, workitem);
	  await t
	    .click(searchResult)
	    .click(workitem.settingsGearBtn)
	  // due to work items no longer having titles displayed on the view page
	  // you must change to the edit page first
	    .click(workitem.settingsGearPanelEdit)
	    .expect(workitem.wiTitle.visible)
	    .eql(true);
	  if (util.Verbose) console.log('Navigated to Edit workitem');
	}

	/**
	 * @description delete a specific work item
	 * @param tab probably not used?
	 * @param workitem the work item to use
	 */
	async deleteWI(tab: tabs, workitem: WI) {
	  this.returnToHome();
	  const alerts = new Alerts();
	  const util = new Util();
	  const searchResult = await this.navigateToWi(tab, workitem);
	  await t
	    .expect(searchResult.exists).eql(true)
	    .click(searchResult)
	    .click(workitem.settingsGearBtn)
	  // due to work items no longer having titles displayed on
	  // the view page you must change to the edit page first
	    .click(workitem.settingsGearPanelEdit)
	    .expect(workitem.wiTitle.visible)
	    .eql(true)
	    .expect(workitem.settingsGearBtnEdit.exists)
	    .eql(true)
	    .click(workitem.settingsGearBtnEdit)
	    .expect(workitem.settingsGearPanelEdit.exists)
	    .eql(true)
	    .expect(workitem.settingsGearPanelDeleteEdit.exists)
	    .eql(true)
	    .click(workitem.settingsGearPanelDeleteEdit)
	    .expect(searchResult.exists)
	    .eql(false);
	  if (util.Verbose) console.log('-- deleteWI: finished deleating WI --');
	  await t.click(alerts.getGenericConfirmBtn);
	  this.eventEmitter.emit('close');
	}

	/**
	 * @description open work item menu and then close
	 * @returns null
	 */
	async openAWICreateMenuThenClose() {
	  const alerts = new Alerts();

	  await t
	    .expect(this.createButton.with({ visibilityCheck: true }).exists).ok('this should pass')
	    .click(this.createButton)
	    .click(this.createOptionsDwi)
	    .expect(alerts.getModalForm.with({ visibilityCheck: true }).exists)
	    .ok('this should pass')
	    .expect(alerts.getAWICreateBtn.visible)
	    .eql(true)
	    .expect(alerts.getAWICancelBtn.visible)
	    .eql(true)
	    .click(alerts.getAWICancelBtn)
	    .expect(this.firstConversation.visible)
	    .eql(true);
	}

	async openAWICreateMenu() {
	  const alerts = new Alerts();

	  await t
	    .expect(this.createButton.with({ visibilityCheck: true }).exists).ok('this should pass')
	    .click(this.createButton)
	    .click(this.createOptionsDwi)
	    .expect(alerts.getModalForm.with({ visibilityCheck: true }).exists)
	    .ok('this should pass')
	    .expect(alerts.getAWICreateBtn.visible)
	    .eql(true)
	    .expect(alerts.getAWICancelBtn.visible)
	    .eql(true);
	}

	async openCreateMenu() {
	  await t
	    .setNativeDialogHandler(() => true)
	    .expect(this.createButton.with({ visibilityCheck: true }).exists).ok('this should pass')
	    .click(this.createButton);
	}

	async closeAWIMenu() {
	  const alerts = new Alerts();
	  await t
	    .expect(alerts.getAWICreateBtn.visible).eql(true)
	    .expect(alerts.getAWICancelBtn.visible).eql(true)
	    .click(alerts.getAWICancelBtn)
	    .expect(this.firstConversation.visible)
	    .eql(true);
	}
}
