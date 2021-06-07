import FeedPage from "../PageObjects/feed-page";
import { mattUser } from "../Utilities/roles";
import ConfigurationManager from "../Configuration/configuration";
import ActivityPage from "../PageObjects/activity-page";
import util from "../Utilities/util";
import userObj from "../PageObjects/PageComponents/userObj";
import { Selector } from "testcafe";
import UserPage from "../PageObjects/user-page";
import GroupPage from "../PageObjects/group-page";
const userPage = new UserPage()
const Util = new util;
const feedPage = new FeedPage();
const Rnum = Math.floor(Math.random() * 100);
const activities = new ActivityPage();
import groupObj from "../PageObjects/PageComponents/groupObj";
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






