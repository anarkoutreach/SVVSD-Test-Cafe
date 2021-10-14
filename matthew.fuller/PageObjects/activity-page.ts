import { Selector, t } from 'testcafe';
import Util from '../Utilities/util';
import FeedPage from './feed-page';
import ActivityObj from './PageComponents/activityObj';
import ConfigurationManager from '../Configuration/configuration';
import { tabs } from './PageComponents/tabs';
import months from './PageComponents/months';
import SharedElements from './sharedElements';

const sharedElements = new SharedElements();
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

	/** @description the ellipsis on the search page to open more options */
	moreInfoSpan: Selector;

	startDate: Selector;

	endDate: Selector;

	contentItemTab: Selector;

	usersTab: Selector;

	description: Selector;

	createBtn: Selector;

	groupsTab:Selector;

	activitiesSearchBat: Selector;

	calendarNextBtn: Selector;

	calendarBackBtn: Selector;

	calendarMonthBtn: Selector;

	cogBtn: Selector;

	constructor() {
	  /**
	   *  @description the button used on the search page to open the more options menu
	   * ie: edit/delete */
	  this.moreInfoSpan = sharedElements.ellipsis;
	  this.calendarMonthBtn = Selector('th.rdtSwitch');
	  this.calendarNextBtn = Selector('th.rdtNext');
	  this.calendarBackBtn = Selector('th.rdtPrev');
	  this.activitiesSearchBat = Selector('input.searchBar.form-control');
	  this.editActivityMenuItem = Selector('#activitySettings').sibling('ul').child('li').nth(0);
	  this.deleteActivityMenuItem = Selector('#activitySettings').sibling('ul').child('li').nth(1);
	  this.generateReportActivityMenuItem = Selector('#activitySettings').sibling('ul').child('li').nth(2);
	  this.calendarSelectionMenuDays = Selector('td.rdtDay');
	  this.editBtn = Selector('a.dropdown-item').withText('Edit');
	  this.createBtn = sharedElements.genericCreateBtn;
	  this.endDate = Selector('input.createEndDate');
	  this.startDate = Selector('input.createStartDate');
	  this.title = Selector('#paneHeaderTitle');
	  this.description = Selector('#paneHeaderDesc');
	  this.contentItemTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'Content');
	  this.usersTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'User');
	  this.groupsTab = Selector('button.searchFilter-tab.btn.btn-link').withAttribute('data-type', 'Group');
	  this.cogBtn = sharedElements.genericCog;
	}

	/**
	 * @description delete an activity using an activity object.
	 * navigate from home page to an activity and delete it.
	 * @param obj activity object to delete
	 * @param enter weather to click on the activity and delete from the cog gear button
	 * if left blank activity will be deleted from main page
	 */
	 async deleteActivity(obj: ActivityObj, enter = false) {
	  const sharedElement = new SharedElements();
	  const activityPage = new ActivityPage();
	  if (enter) {
	  await activityPage.navigateToActivity(obj.title, true);
	  await t
	    .expect(this.cogBtn.visible).eql(true)
	    .click(this.cogBtn);
	  } else {
	    await activityPage.navigateToActivity(obj.title);
	    await t
	      .expect(sharedElement.ellipsis.visible).eql(true)
	      .click(sharedElement.ellipsis);
	  }
	  await t
	  .expect(sharedElement.dropDownDelete.visible)
	    .eql(true)
	    .click(sharedElement.dropDownDelete)
	    .expect(sharedElement.genericCreateBtn.visible)
	    .eql(true)
	    .click(sharedElement.genericCreateBtn);
	  await activityPage.navigateToActivity(obj.title);
	  const result = await feedPage.findSearchResult(obj.title, tabs.ACTIVITIES, true);
	  await t.expect(result).eql(null);
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
	    .expect(this.moreInfoSpan.exists).eql(true)
	    .click(this.moreInfoSpan)
	    .expect(this.editBtn.exists)
	    .eql(true)
	    .click(this.editBtn)
	    .expect(this.title.exists)
	    .eql(true)
	    .expect(this.title.visible)
	    .eql(true);
	  return null;
	}

	/**
	 * @description in calendar menu click next month
	 */
	async clickToNextMonth(endOrStart = 'end', lOrR = 'r') {
	  const month = await this.getCurrentMonth();
	  await this.clickArrowInCalendarMenu(endOrStart, lOrR);
	  const month2 = await this.getCurrentMonth();
	  await t.expect(months[month + 1]).eql(months[month2]);
	}

	/**
	 * @description in calendar menu click previous month
	 */
	 async clickToPreviousMonth(endOrStart = 'end', lOrR = 'l') {
	  const month = await this.getCurrentMonth();
	  await this.clickArrowInCalendarMenu(endOrStart, lOrR);
	  const month2 = await this.getCurrentMonth();
	  await t.expect(months[month - 1]).eql(months[month2]);
	  }

	async clickCreateActivity() {
	  await t
	    .setNativeDialogHandler(() => true)
	    .click(feedPage.createOptionsActivity)
	    .expect(this.activitiesSearchBat.exists).eql(true);
	}

	/**
	 * @description filters through currently visible items to find the top layer
	 * @returns a selector for the back button
	 */
	async getCalendarNextBtn() {
	  return (this.calendarNextBtn.filterVisible());
	}

	/**
	 * @description checks the open calendar window for index of month
	 * @returns the index of the current month in the menu
	 */
	async getCurrentMonth() {
	  const currentMonth = (await (await this.getCalendarMonthSelector()).innerText).toLowerCase();
	 let month2;
	  if (months.includes(currentMonth)) {
	    months.forEach((month) => {
	      if (month === currentMonth) {
			  month2 = months.indexOf(month);
	      }
	    });
	  }
	  return month2;
	}

	/**
	 * @description filters through currently visible items to find the top layer
	 * @returns a selector for the back btn
	 */
	async getCalendarBackBtn() {
	  return (this.calendarBackBtn.filterVisible());
	  }

	  /**
	   * @description get a selector for the mont hfeild at the top of the calend menu
	   * @returns a selector for the month object at the top of the calender menu
	   */
	async getCalendarMonthSelector() {
	  return (this.calendarMonthBtn.filterVisible());
	}

	/** @description in the activities creation menu click on to the calender and then select a day */
	async clickOnDayInCurrentMonth(day:string, endOrStart = 'end') {
	  if (endOrStart === 'end') {
	    await t
	    .click(this.endDate);
	  } else {
	    await t
	    .click(this.startDate);
	  }
	  const date = await this.getSpecificDayInCalenderMenu(day);
	  await t
	  .expect(date.visible).ok('this should pass')
	  .click(date);
	}

	/** @description in the activities creation menu click on to the calender
	 *  and then click the left or right arrow
	 * @param  endOrStart weahtor to click the end date or the start date ("end" or "start")
	 * @param arrow weathor to click the right of left arror "l or r" */
	async clickArrowInCalendarMenu(endOrStart = 'end', arrow = 'r') {
	  if (endOrStart === 'end') {
	  await t
	  .click(this.endDate);
	  } else {
	  await t
	  .click(this.startDate);
	  }
	  if (arrow === 'r') {
	    await t.click(await this.getCalendarNextBtn());
	  } else {
	    await t.click(await this.getCalendarBackBtn());
	  }
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

	  await this.clickOnDayInCurrentMonth('30');

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

	/** @description get a day in the calendar menu */
	async getSpecificDayInCalenderMenu(day) {
	  // Selector('td.rdtDay').withAttribute('data-value', '30');
	  return this.calendarSelectionMenuDays.withAttribute('data-value', day).filterVisible();
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
	    .expect(Selector('div.appTitle').child('span').exists)
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
	 * @description navigate to an activity in the search bar
	 * @param name a string that represents the name to search for
	 * @param shouldOpen weathor or not to click on the search result on the page
	 * @returns null
	 */
	// eslint-disable-next-line class-methods-use-this
	async navigateToActivity(name:string, shouldOpen = false) {
	  await feedPage.SearchFor(name, tabs.ACTIVITIES);
	  if (shouldOpen) {
	    const result = await feedPage.findSearchResult(name, tabs.ACTIVITIES, true);
	    await t
	      .expect(result.visible).eql(true)
	      .click(result);
	  }
	  return null;
	}
}
