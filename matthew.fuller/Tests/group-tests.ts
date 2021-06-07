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
fixture`activity navigation tests`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;
    await t
        .useRole(t.ctx.user.role);
});
test('can open group creation tab', async t => {
    await feedPage.openGroupMenu();
})
test('cannot create group without user', async t => {
    let obj = new groupObj()
    await groupPage.createGroupFromGroupObj(obj)
});
test('cannot create group without title', async t => {
    let obj = new groupObj(false,"hireafeaf",0);
    obj.users.push(0);
    await groupPage.createGroupFromGroupObj(obj);
});
test('cannot create group without desc', async t => {
    let obj = new groupObj("testfa",false,0);
    obj.users.push(0);
    await groupPage.createGroupFromGroupObj(obj);
});
test('can create group', async t => {
    await groupPage.createGenericGroup();
});
test('can cancel group creation', async t => {
    await groupPage.navigateToGroupCreationPage()
    await t
    .expect(groupPage.cancelBtn.exists).eql(true)
    .click(groupPage.cancelBtn)
    .expect(feedPage.userInitialsIcon.exists).eql(true);
});
test('can cancel group creation with all info filled', async t => {
    await groupPage.navigateToGroupCreationPage()
    await groupPage.createGenericGroup(false)
    await t
    .expect(groupPage.cancelBtn.exists).eql(true)
    .click(groupPage.cancelBtn)
    .expect(feedPage.userInitialsIcon.exists).eql(true);
});
test('can search for and add user', async t => {
    await groupPage.navigateToGroupCreationPage()
    await groupPage.createGenericGroup(false)
    await groupPage.addUserByName("HIPPO4ZFL0Y");
    await groupPage.clickCreateBtn();
});
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
}).only;





