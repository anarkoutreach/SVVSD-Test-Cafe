import FeedPage from "../PageObjects/feed-page";
import { mattUser } from "../Utilities/roles";
import ConfigurationManager from "../Configuration/configuration";
import ActivityPage from "../PageObjects/activity-page";
import util from "../Utilities/util";
import userObj from "../PageObjects/PageComponents/userObj";
import { Selector } from "testcafe";
import UserPage from "../PageObjects/user-page";
import Alerts from "../PageObjects/Alerts";
import GroupPage from "../PageObjects/group-page";
const userPage = new UserPage()
const Util = new util;
const feedPage = new FeedPage();
const Rnum = Math.floor(Math.random() * 100);
const activities = new ActivityPage();
import groupObj from "../PageObjects/PageComponents/groupObj";
import { tabs } from "../PageObjects/PageComponents/tabs";
const groupPage = new GroupPage()
const configManager = new ConfigurationManager();
fixture`group tests`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;
    await t
        .useRole(t.ctx.user.role);
});
/**@description test if the group creation tab can be opened by attempting to open it then verifiying if it is open */
test('can open group creation tab', async t => {
    await feedPage.openGroupMenu();
})
/**@description A group requires a user to create, this will test if the website will throw an error messsge when a user is not inluded ina group*/
test('cannot create group without user', async t => {
    let obj = new groupObj()
    await groupPage.createGroupFromGroupObj(obj)
});
/**@description the same as the test above but instead of user:title */
test('cannot create group without title', async t => {
    let obj = new groupObj(false,"hireafeaf",0);
    obj.users.push(0);
    await groupPage.createGroupFromGroupObj(obj);
});
/**@description the same as the one above but instead of title: description */
test('cannot create group without desc', async t => {
    let obj = new groupObj("testfa",false,0);
    obj.users.push(0);
    await groupPage.createGroupFromGroupObj(obj);
});
/**@description a generic test that tests if a normal group can be created */
test('can create group', async t => {
    await groupPage.createGenericGroup();
});
/**@description chek if the cancel button on the group page works properly */
test('can cancel group creation', async t => {
    await groupPage.navigateToGroupCreationPage()
    await t
    .expect(groupPage.cancelBtn.exists).eql(true)
    .click(groupPage.cancelBtn)
    .expect(feedPage.userInitialsIcon.exists).eql(true);
});
/**@description check if the cancel button still works if information has been filled out already */
test('can cancel group creation with all info filled', async t => {
    await groupPage.navigateToGroupCreationPage()
    await groupPage.createGenericGroup(false)
    await t
    .expect(groupPage.cancelBtn.exists).eql(true)
    .click(groupPage.cancelBtn)
    .expect(feedPage.userInitialsIcon.exists).eql(true);
});
/**@description check if a user can be found though searching and then added to the group */
test('can search for and add user', async t => {
    await groupPage.navigateToGroupCreationPage()
    await groupPage.createGenericGroup(false)
    await groupPage.addUserByName("HIPPO4ZFL0Y");
    await groupPage.clickCreateBtn();
});
/**@description test if a newly created user can be added to a group and found through search */
test('create user and add to group', async t => {
    await feedPage.navigateToCreateNewUser()
    let user = new userObj();
    await userPage.fillAllFields(user);
    await userPage.pressCreateBtn();
    await groupPage.navigateToGroupCreationPage()
    const obj = new groupObj()
    await groupPage.createGroupFromGroupObj(obj)
    await groupPage.addUserByName(user.name);
    await groupPage.clickCreateBtn();
});
/**@description check if a newly created user can be found in search by seraching its email isntead of its ID */
test('create user and add to group seraching by email', async t => {
    await feedPage.navigateToCreateNewUser()
    let user = new userObj();
    await userPage.fillAllFields(user);
    await userPage.pressCreateBtn();
    await groupPage.navigateToGroupCreationPage()
    const obj = new groupObj()
    await groupPage.createGroupFromGroupObj(obj)
    await groupPage.addUserByName(user.name,user.email);
    await groupPage.clickCreateBtn();
});
/**@description check if a newly created user can be found in search by seraching its login id isntead of its ID */
test('create user and add to group seraching by login id', async t => {
    await feedPage.navigateToCreateNewUser()
    let user = new userObj();
    await userPage.fillAllFields(user);
    await userPage.pressCreateBtn();
    await groupPage.navigateToGroupCreationPage()
    const obj = new groupObj()
    await groupPage.createGroupFromGroupObj(obj)
    await groupPage.addUserByName(user.name,user.loginId);
    await groupPage.clickCreateBtn();
});
/**@description create a group, then navvigate to it and click the edit button, then edit the title */
test('can edit group title', async t => {
    let obj = await groupPage.createGenericGroup();
    await feedPage.returnToHome()
    //search for the group title in the search bar from the home page
    await feedPage.SearchFor(obj.title,tabs.GROUPS)
    //Then find the result
    let result =await feedPage.findSearchResult(obj.title,tabs.GROUPS);
    await t.expect(result.exists).eql(true)
    .click(result);
    await groupPage.clickEditBtnOnGroupPage();
    await Util.CtlADelete(groupPage.title);
    let randTitle ="randEditedTitle"+Util.randchar(20);
    obj.title =randTitle;
    await t.typeText(groupPage.title,randTitle);
    await groupPage.clickCreateBtn();
await t.expect(await (await groupPage.titleOnEndScreen.innerText).toLowerCase() == randTitle.toLowerCase()).eql(true);
});
/**@description create a group, then navvigate to it and click the edit button, then edit the description */
test('can edit group description', async t => {
    let obj = await groupPage.createGenericGroup();
    await feedPage.returnToHome()
    //search for the group title in the search bar from the home page
    await feedPage.SearchFor(obj.title,tabs.GROUPS)
    //Then find the result
    let result =await feedPage.findSearchResult(obj.title,tabs.GROUPS);
    await t.expect(result.exists).eql(true)
    .click(result);
    await groupPage.clickEditBtnOnGroupPage();
    await Util.CtlADelete(groupPage.description);
    let randTitle ="randEditedDescription"+Util.randchar(20);
    obj.description =randTitle;
    await t.typeText(groupPage.description,randTitle);
    await groupPage.clickCreateBtn();
    await feedPage.returnToHome()
    await feedPage.SearchFor(obj.title,tabs.GROUPS)
    //Then find the result
    let result2 =await feedPage.findSearchResult(obj.title,tabs.GROUPS);
    await t.expect(result2.exists).eql(true)
    .click(result2);
    await groupPage.clickEditBtnOnGroupPage();
    await t.expect(await (await groupPage.description.value).toLocaleUpperCase() == randTitle.toUpperCase()).eql(true)
});
/**@description create a group, the navigate to it and delete it */
test('can delete group', async t => {
    let alert = new Alerts()
    let obj = await groupPage.createGenericGroup();
    await feedPage.returnToHome()
    //search for the group title in the search bar from the home page
    await feedPage.SearchFor(obj.title,tabs.GROUPS)
    //Then find the result
    let result =await feedPage.findSearchResult(obj.title,tabs.GROUPS);
    await t.expect(result.exists).eql(true)
    .click(result);
    await t.expect(groupPage.settingsCogBtn.exists).eql(true)
    .click(groupPage.settingsCogBtn)
    .expect(groupPage.settingsList.nth(1).exists).eql(true)
    .click(groupPage.settingsList.nth(1))
    .expect(alert.getGenericConfirmBtn.exists).eql(true)
    .click(alert.getGenericConfirmBtn);
    await feedPage.SearchFor(obj.title,tabs.GROUPS);
    let result2 =await feedPage.findSearchResult(obj.title,tabs.GROUPS);
    let exists=false
    try {
        await t.expect(result2.exists).eql(false); 
        exists=true
    } catch (error) {
        exists=false
    }
    await t.expect(exists).eql(false);
});







