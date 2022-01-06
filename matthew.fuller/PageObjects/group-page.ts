/* eslint-disable no-empty */
import { Selector, t } from 'testcafe';
import FeedPage from './feed-page';
import GroupObj from './PageComponents/groupObj';
import SharedElements from './sharedElements';

const sharedElements = new SharedElements();
const feedpage = new FeedPage();

export default class GroupPage {
  /** @description the list of add buttons associated with adding users */
	usersAddList: Selector;

	/** @description the list of user info in the saerch field */
	usersList: Selector;

	/** @description the title text area */
	title: Selector;

	/** @description teh description text area */
	description: Selector;

	/** @description the button to create or update a group */
	createBtn: Selector;

	/** @description the button to cancel the creation or editing of a group */
	cancelBtn: Selector;

	/** @description the title on the view mode of a group */
	titleOnEndScreen: Selector;

	/** @description the settings cog button in the upper right of the screen */
	settingsCogBtn: Selector;

	/** @description the selector of the list of options from the settings cog
	 * (nth(0) for edit nth(1) for delete) */
	settingsList: Selector;

	/** @description description text */
	descriptionOnEndScreen: Selector;

	/** @description initalise the group page class */
	constructor() {
	  this.usersList = Selector('article.search-result');
	  this.descriptionOnEndScreen = Selector('div#infoSide').child('p').child(1);
	  this.titleOnEndScreen = sharedElements.appTitle;
	  this.usersAddList = Selector(sharedElements.genericItemPrimaryBtn);
	  this.title = Selector('textarea#paneHeaderTitle');
	  this.description = Selector('textarea#paneHeaderDesc');
	  this.createBtn = sharedElements.genericCreateBtn;
	  this.cancelBtn = sharedElements.CreateCancelButton;
	  this.settingsCogBtn = Selector('div.glyphicon.glyphicon-cog');
	  this.settingsList = Selector('#groupSettings').sibling('ul').child('li');
	}

	/** @description from the group page, click the edit button and switch to edit mode,
	 * and verify that the page and its elements have loaded */
	async clickEditBtnOnGroupPage() {
	  await t
	    .expect(this.settingsCogBtn.exists).eql(true)
	    .click(this.settingsCogBtn)
	    .expect(this.settingsList.nth(0).exists)
	    .eql(true)
	    .click(this.settingsList.nth(0))
	  // verify switch to edit mode
	    .expect(this.title.exists)
	    .eql(true);
	}

	/**
	 * @description navigate to the group creation page: click the create btn then,
	 *  click create  group.
	 */
	async navigateToGroupCreationPage() {
	  if (feedpage.userInitialsIcon.exists) {
	    await feedpage.openGroupMenu();
	  } else if (this.title.exists) {

	  } else {
	    await feedpage.returnToHome();
	    await feedpage.openGroupMenu();
	  }
	}

	/**
	 * @description search for a user by their name or by a query looking to
	 * find a specific name under the querry, and then add it to the group if the name is found
	 * @param name the name that will be matched with the list of names
	 * @param query the query that should be searched to find the name,
	 *  if left empty this will be the same as the name
	 */
	async addUserByName(name:string, query = false as any) {
	  if (query !== false) {

	  } else {
	    query = name;
	  }
	  const count = await this.usersAddList.count;
	  const search = sharedElements.searchbar;
	  await t
	    .expect(search.exists).eql(true)
	    .click(search)
	    .typeText(search, query)
	    .expect(Selector('button.btn.btn-default').exists)
	    .eql(true)
	    .pressKey('enter');
	  for (let i = 0; i < count; i += 1) {
	    const element = this.usersList.nth(i);
	    const userName = await element.find('span.searchItemName').innerText;
	    console.log(userName);
	    console.log(name.toUpperCase());
	    const isUser = (name === userName);
	    console.log(isUser);
	    if (isUser === true) {
	      await t
	        .expect(this.usersAddList.nth(i).exists).eql(true)
	        .click(this.usersAddList.nth(i));
	      i = Infinity;
	    }
	  }
	}

	/**
	 * @description create a generic group from a defaul and radomised group obj
	 * @param click, a parameter:bool, that detemines weathor or not to click
	 * create group at the end of excution of this function
	 * @returns the obj that was created
	 */
	async createGenericGroup(click = true) {
	  const obj = new GroupObj();
	  await this.navigateToGroupCreationPage();
	  await t
	    .expect(this.title.exists).eql(true)
	    .typeText(this.title, obj.title)
	    .expect(this.description.exists)
	    .eql(true)
	    .typeText(this.description, obj.description);
	  await this.addNthUserToGroup(0);
	  if (click) { await this.clickCreateBtn(); }
	  return obj;
	}

	/**
	 * @description a function that takes a group obj and creates a group on mbe web from it
	 * @param obj the group object to use for creation
	 * @param click weathor to click create at the end of execution
	 */
	async createGroupFromGroupObj(obj, click = true) {
	  await this.navigateToGroupCreationPage();
	  if (obj.title != null) {
	    await t
	      .expect(this.title.exists).eql(true)
	      .typeText(this.title, obj.title);
	  }
	  if (obj.description != null) {
	    await t
	      .expect(this.description.exists).eql(true)
	      .typeText(this.description, obj.description);
	  }
	  if (obj.users.length !== 0) {
	    obj.users.forEach(async (user) => {
	    await this.addNthUserToGroup(user);
	  });
	  }

	  const error = sharedElements.alerts.errorPopUp;
	  if (click) {
	    await t.expect(this.createBtn.exists).eql(true).click(this.createBtn);
	    if (obj.title == null || obj.description || obj.users.length === 0) {
	      await t.expect(error.exists).eql(true);
	    }
	  }
	}

	/**
	 * @description click the create button of a group creation menu
	 * and verify its results
	 */
	async clickCreateBtn(verify = true) {
	  await t
	    .expect(this.createBtn.exists).eql(true)
	    .click(this.createBtn);
	  if (verify) {
	    await t
	    .expect(this.titleOnEndScreen.exists)
	    .eql(true);
	  }
	}

	/**
	 * @description add the n'th user in the list of users to a group while in creation or editing
	 * @param n the number var
	 */
	async addNthUserToGroup(n: number, exact = false) {
	  if (exact === true) {
	    const nthObj = this.usersAddList.nth(n);
	    const nthUserInfo = this.usersList.nth(n);
	    if (await nthUserInfo.find('span.inactive').exists === false) {
	      await t
	        .expect(nthObj.exists).eql(true)
	        .click(nthObj);
	      return true;
	    }
	    return false;
	  }
	  await this.addNearestUser(n);
	  return true;
	}

	/**
	 * @description add nearest active user to nth
	 * @param n the number to find
	 */
	async addNearestUser(n) {
	  let result = false;
	  while (result !== true) {
	    result = await this.addNthUserToGroup(n, true);
	    n += 1;
	  }
	}
}
