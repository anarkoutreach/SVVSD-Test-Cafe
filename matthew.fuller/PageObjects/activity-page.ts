import { Selector, t } from 'testcafe';
import Util from '../Utilities/util';
import FeedPage from './feed-page';
import ActivityObj from './PageComponents/activityObj';
import ConfigurationManager from '../Configuration/configuration';

const feedPage = new FeedPage();
const util = new Util();
const configManager = new ConfigurationManager();
export default class ActivityPage {
	calendarSelectionMenuDays: Selector;

	editActivityMenuItem: Selector;

	title: Selector;

	generateReportActivityMenuItem:Selector;

	deleteActivityMenuItem:Selector;

	editBtn: Selector;

	startDate: Selector;

	endDate: Selector;

	contentItemTab: Selector;

	usersTab: Selector;

	description: Selector;

	createBtn: Selector;

	groupsTab:Selector;

	constructor() {
	  this.editActivityMenuItem = Selector('#activitySettings').sibling('ul').child('li').nth(0);
	  this.deleteActivityMenuItem = Selector('#activitySettings').sibling('ul').child('li').nth(1);
	  this.generateReportActivityMenuItem = Selector('#activitySettings').sibling('ul').child('li').nth(2);
	  this.calendarSelectionMenuDays = Selector('td.rdtDay');
	  this.editBtn = Selector('div.glyphicon.glyphicon-cog');
	  this.createBtn = Selector('button.create.btn.btn-success');
	  this.endDate = Selector('input.createEndDate');
	  this.startDate = Selector('input.createStartDate');
	  this.title = Selector('#paneHeaderTitle');
	  this.description = Selector('#paneHeaderDesc');
	  this.contentItemTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'Content');
	  this.usersTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'User');
	  this.groupsTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'Group');
	}

	/**
	 * @description navigates to activity and then clicks edit button and expect the
	 * title exists and is visible to check the operation was successful
	 * @extends navigateToActivity
	 * @returns null
	 */
	async openActivityInEditMode(actName:string) {
	  await this.navigateToActivity(actName);
	  await t
	    .expect(this.editBtn.exists).eql(true)
	    .click(this.editBtn)
	    .expect(this.editActivityMenuItem.visible)
	    .eql(true)
	    .click(this.editActivityMenuItem)
	    .expect(this.title.exists)
	    .eql(true)
	    .expect(this.title.visible)
	    .eql(true);
	  return null;
	}

	/**
	 * @description navigate to activity creation and create a activity, returning the activity object
	 * @returns activity object
	 */
	async createGenericAct(actObj = new ActivityObj()) {
	  await feedPage.openCreateMenu();
	  await t
	    .setNativeDialogHandler(() => true)
	    .click(feedPage.createOptionsActivity)
	    .expect(Selector('input.searchBar.form-control').exists).eql(true);
	  const date = await this.getSpecificDayInCalenderMenu('30');
	  await t
	  .click(this.endDate)
	  .expect(date.visible).eql(true)
	  .click(date);
	  await this.addNthGroup(0);
	  await this.addNthGroup(1);
	  await this.addNthGroup(2);
	  await this.addGenericTitleAndDescription(true, actObj);
	  await this.pressCreateBtn();
	  return actObj;
	}

	/**
	 * @description add a end date to a activity
	 * @param date the date to be added with a default value of "10/22/3000 12:00:00 AM"
	 * @returns null
	 */
	async addEndData(date = configManager.defaultEndDate) {
	  await t
	    .expect(this.endDate.exists).eql(true)
	    .click(this.endDate);
	  await util.CtlADelete(this.endDate);
	  await t
	    .typeText(this.endDate, date);
	  return null;
	}

	async getSpecificDayInCalenderMenu(day) {
	  return this.calendarSelectionMenuDays.withText(day);
	}

	/**
	 * @description add a group to a activity based on nth variable
	 * @param nth a zero based index number of which group to select
	 * @returns null
	 */
	async addNthGroup(nth) {
	  await t
	    .expect(this.groupsTab.exists).eql(true)
	    .click(this.groupsTab);
	  const btn = Selector('div.searchItemPrimary').nth(nth);
	  await t
	    .expect(btn.exists).eql(true)
	    .click(btn);
	  await t
	    .expect(this.contentItemTab.exists).eql(true)
	    .click(this.contentItemTab);
	  return null;
	}

	/**
	 * @description create a new activity then open it, edit it and verify the edit
	 * @param field the selector to edit must be compatible with typetext
	 * @param fieldName the string representing the field name in obj
	 * @param text the string of text to type
	 * @returns
	 */
	async createActivityAndEditField(field:Selector, text:string, fieldName:string) {
	  const actObj = await this.createGenericAct();
	  await feedPage.returnToHome();
	  await this.openActivityAndEdit(actObj, field, text, fieldName);
	  return actObj;
	}

	/**
	 * @description open an activity then open it, edit it and verify the edit
	 * @param actObj the activity object that already exists to be navigated to and edited.
	 * @param field the selector to edit must be compatible with typetext
	 * @param fieldName the string representing the field name on the object
	 * @param text the string of text to type2
	 * @param  use the testcafe selector attruibute to use to get the text of it
	 * @returns
	 */
	async openActivityAndEdit(actObj:ActivityObj, field:Selector, text:string, fieldName:string, use = 'value') {
	  await this.openActivityInEditMode(actObj.title);
	  await t.expect(field.exists).eql(true).expect(field.visible).eql(true);
	  await util.CtlADelete(field);
	  const newTitle = text;
	  await t.click(field).typeText(field, newTitle);
	  await this.pressCreateBtn();
	  actObj[fieldName] = newTitle;
	  await feedPage.returnToHome();
	  // returning to the activity will verify as this function will expect the name exists.
	  await this.openActivityInEditMode(actObj.title);
	  // but it will not cover if the field is not the title so we
	  // shouldnt rely on that. but none the less we need to be on the
	  // activity to check changes. and it will be easiest to do so in edit mode
	  // as such here is a simple verification step
	  await t.expect(field.visible).eql(true);
	  const inntrText = await field[use];
	  const test = await String(inntrText).toUpperCase();
	  // console.log("inner: "+test)
	  // console.log("inner: "+inntrText)
	  // console.log("text:" +text)
	  /// set both to uppercase to account for differences
	  await t.expect(test === text.toUpperCase()).eql(true);
	}

	/**
	 * @description press the create button of a activity and verify its creation by
	 *  checking if activity title exists
	 * @returns null
	*/
	async pressCreateBtn() {
	  await t
	    .expect(this.createBtn.exists).eql(true)
	    .click(this.createBtn)
	    .wait(2000)
	    .expect(Selector('#activityTitle').exists)
	    .eql(true);
	  return null;
	}

	async addGenericTitleAndDescription(useObj = false, obj = new ActivityObj()) {
	  let title;
	  let desc;
	  if (useObj !== false) {
	    title = obj.title;
	    desc = obj.description;
	  } else {
	    title += `GenericTitle${util.randChar(25)}`;
	    desc += `GenericDesc${util.randChar(25)}`;
	  }

	  await t
	    .expect(this.title.exists).eql(true)
	    .click(this.title)
	    .typeText(this.title, title)
	    .expect(this.description.exists)
	    .eql(true)
	    .click(this.description)
	    .typeText(this.description, desc);
	  return { title, desc };
	}

	/**
	 * @description from the feed page click on an activity and navigate
	 * to it and verify it has navigated
	 * @param name a string that represents the name to search for
	 * @returns null
	 */
	// eslint-disable-next-line class-methods-use-this
	async navigateToActivity(name:string) {
	  feedPage.selectActivity(name);
	  return null;
	}
}
