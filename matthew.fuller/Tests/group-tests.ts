/* eslint-disable no-shadow */
import { t } from 'testcafe';
import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import Util from '../Utilities/util';
import UserObj from '../PageObjects/PageComponents/userObj';
import UserPage from '../PageObjects/user-page';
import Alerts from '../PageObjects/Alerts';
import GroupPage from '../PageObjects/group-page';
// eslint-disable-next-line import/no-unresolved
import GroupObj from '../PageObjects/PageComponents/GroupObj';
import { tabs } from '../PageObjects/PageComponents/tabs';
import SharedElements from '../PageObjects/sharedElements';

const userPage = new UserPage();
const util = new Util();
const feedPage = new FeedPage();
const groupPage = new GroupPage();
const configManager = new ConfigurationManager();
fixture`group tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});
/** test if the group creation tab can be opened by attempting to open it,
 *  then verifying if it is open */
test('can open group creation tab', async () => {
  await feedPage.openGroupMenu();
});
/** A group requires a user to create,
 * this will test if the website will throw an error message
 * when a user is not included in a group */
test('cannot create group without user', async () => {
  const obj = new GroupObj();
  await groupPage.createGroupFromGroupObj(obj);
});
/** The same as the test above but instead of user:title */
test('cannot create group without title', async () => {
  const obj = new GroupObj(false, 'hireafeaf', 0);
  obj.users.push(0);
  await groupPage.createGroupFromGroupObj(obj);
});
/** The same as the one above but instead of title: description */
test('cannot create group without desc', async () => {
  const obj = new GroupObj('testfa', false, 0);
  obj.users.push(0);
  await groupPage.createGroupFromGroupObj(obj);
});

/** A generic test that tests if a normal group can be created */
test('can create group', async () => {
  await groupPage.createGenericGroup();
});

/** @description chek if the cancel button on the group page works properly */
test('can cancel group creation', async (t) => {
  await groupPage.navigateToGroupCreationPage();
  await t
    .expect(groupPage.cancelBtn.exists).eql(true)
    .click(groupPage.cancelBtn)
    .expect(feedPage.userInitialsIcon.exists)
    .eql(true);
});
/** Check if the cancel button still works if information has been filled out already */
test('can cancel group creation with all info filled', async (t) => {
  await groupPage.createGenericGroup(false);
  await t
    .expect(groupPage.cancelBtn.exists).eql(true)
    .click(groupPage.cancelBtn)
    .expect(feedPage.userInitialsIcon.exists)
    .eql(true);
});
/** Check if a user can be found though searching and then added to the group */
test('can search for and add user', async () => {
  await groupPage.createGenericGroup(false);
  await groupPage.addUserByName('HIPPO4ZFL0Y');
  await groupPage.clickCreateBtn();
});
/** Test if a newly created user can be added to a group and found through search */
test('create user and add to group', async () => {
  await feedPage.navigateToCreateNewUser();
  const user = new UserObj();
  await userPage.fillAllFields(user);
  await userPage.pressCreateBtn();
  const obj = new GroupObj();
  await groupPage.createGroupFromGroupObj(obj);
  await groupPage.addUserByName(user.name);
  await groupPage.clickCreateBtn();
});
/** Check if a newly created user can be found in search by searching its email instead of its ID */
test('create user and add to group searching by email', async () => {
  await feedPage.navigateToCreateNewUser();
  const user = new UserObj();
  await userPage.fillAllFields(user);
  await userPage.pressCreateBtn();
  const obj = new GroupObj();
  await groupPage.createGroupFromGroupObj(obj);
  await groupPage.addUserByName(user.name, user.email);
  await groupPage.clickCreateBtn();
});
/** Check if a newly created user can be found in search
 *  by searching its login id instead of its ID */
test('create user and add to group seraching by login id', async () => {
  await feedPage.navigateToCreateNewUser();
  const user = new UserObj();
  await userPage.fillAllFields(user);
  await userPage.pressCreateBtn();
  const obj = new GroupObj();
  await groupPage.createGroupFromGroupObj(obj);
  await groupPage.addUserByName(user.name, user.loginId);
  await groupPage.clickCreateBtn();
});
/** Create a group, then navigate to it and click the edit button, then edit the title */
test('can edit group title', async (t) => {
  const obj = await groupPage.createGenericGroup();
  await feedPage.returnToHome();
  // search for the group title in the search bar from the home page
  await feedPage.SearchFor(obj.title, tabs.GROUPS);
  // Then find the result
  const result = await feedPage.findSearchResult(obj.title);
  await t.expect(result.exists).eql(true)
    .click(result);
  await groupPage.clickEditBtnOnGroupPage();
  await util.CtlADelete(groupPage.title);
  const randTitle = `randEditedTitle${util.randChar(20)}`;
  obj.title = randTitle;
  await t.typeText(groupPage.title, randTitle);
  await groupPage.clickCreateBtn();
  const titleOnScreen = (await (groupPage.titleOnEndScreen.innerText)).toLowerCase();
  await t.expect(await (titleOnScreen === randTitle.toLowerCase())).eql(true);
});
/** Create a group, then navigate to it and click the edit button, then edit the description */
test('can edit group description', async (t) => {
  const obj = await groupPage.createGenericGroup();
  await feedPage.returnToHome();
  // search for the group title in the search bar from the home page
  await feedPage.SearchFor(obj.title, tabs.GROUPS);
  // Then find the result
  const result = await feedPage.findSearchResult(obj.title);
  await t.expect(result.exists).eql(true)
    .click(result);
  await groupPage.clickEditBtnOnGroupPage();
  await util.CtlADelete(groupPage.description);
  const randTitle = `randEditedDescription${util.randChar(20)}`;
  obj.description = randTitle;
  await t.typeText(groupPage.description, randTitle);
  await groupPage.clickCreateBtn();
  await feedPage.returnToHome();
  await feedPage.SearchFor(obj.title, tabs.GROUPS);
  // Then find the result
  const result2 = await feedPage.findSearchResult(obj.title);
  await t.expect(result2.exists).eql(true)
    .click(result2);
  await groupPage.clickEditBtnOnGroupPage();
  const descriptionValue = await groupPage.description.value;
  await t.expect(
    await (descriptionValue).toLocaleUpperCase() === randTitle.toUpperCase(),
  ).eql(true);
});
/** Create a group, the navigate to it and delete it */
test('can delete group', async (t) => {
  const sharedElements = new SharedElements();
  const alert = new Alerts();
  const obj = await groupPage.createGenericGroup();
  await feedPage.returnToHome();
  // search for the group title in the search bar from the home page
  await feedPage.SearchFor(obj.title, tabs.GROUPS);
  // Then find the result
  const result = await feedPage.findSearchResult(obj.title);
  await t.expect(result.exists).eql(true)
    .click(result);
  await t.expect(groupPage.settingsCogBtn.exists).eql(true)
    .click(groupPage.settingsCogBtn);
  const editBtn = await sharedElements.findGenericDropdownSelector('delete');
  await t
    .expect(editBtn.exists).eql(true)
    .click(editBtn)
    .expect(alert.getGenericConfirmBtn.exists)
    .eql(true)
    .click(alert.getGenericConfirmBtn);
  await feedPage.SearchFor(obj.title, tabs.GROUPS);
  const result2 = await feedPage.findSearchResult(obj.title);
  // const exists = false;
  // try {
  //   await t.expect(result2.exists).eql(true);
  //   exists = true;
  // } catch (error) {
  //   exists = false;
  // }
  await t.expect(result2.exists).eql(false);
});

fixture`group error msg verification tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});

test('verify error displays when title is missing', async (t) => {
  const sharedElements = new SharedElements();
  const obj = new GroupObj();
  await groupPage.navigateToGroupCreationPage();
  await t
	    .expect(groupPage.description.exists)
    .eql(true)
	    .typeText(groupPage.description, obj.description);
  await groupPage.addNthUserToGroup(0);
  await groupPage.clickCreateBtn(false);
  await util.checkAnyErrExists(sharedElements);
});

test('verify error displays when description is missing', async (t) => {
  const sharedElements = new SharedElements();
  const obj = new GroupObj();
  await groupPage.navigateToGroupCreationPage();
  await t
	  .expect(groupPage.description.exists)
    .eql(true)
	  .typeText(groupPage.description, obj.description);
  await groupPage.addNthUserToGroup(0);
  await groupPage.clickCreateBtn(false);
  await util.checkAnyErrExists(sharedElements);
});

test('verify error displays when user is missing', async () => {
  const sharedElements = new SharedElements();
  const obj = new GroupObj();
  await groupPage.navigateToGroupCreationPage();
  await t
    .expect(groupPage.title.exists).eql(true)
    .typeText(groupPage.title, obj.title)
	  .expect(groupPage.description.exists)
    .eql(true)
	  .typeText(groupPage.description, obj.description);
  await groupPage.clickCreateBtn(false);
  await util.checkAnyErrExists(sharedElements);
});

test('verify error displays when description and title are missing', async () => {
  const sharedElements = new SharedElements();
  await groupPage.navigateToGroupCreationPage();
  await groupPage.addNthUserToGroup(0);
  await groupPage.clickCreateBtn(false);
  await util.checkAnyErrExists(sharedElements);
});

test('verify error displays when description, title and user are missing', async () => {
  const sharedElements = new SharedElements();
  await groupPage.navigateToGroupCreationPage();
  await groupPage.addNthUserToGroup(0);
  await groupPage.clickCreateBtn(false);
  await util.checkAnyErrExists(sharedElements);
});
