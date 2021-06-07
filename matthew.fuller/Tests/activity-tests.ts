import FeedPage from "../PageObjects/feed-page";
import { mattUser } from "../Utilities/roles";
import ConfigurationManager from "../Configuration/configuration";
import ActivityPage from "../PageObjects/activity-page";
import util from "../Utilities/util";
import { Selector } from "testcafe";
import activityObj from "../PageObjects/PageComponents/activityObj";
const Util = new util;
const feedPage = new FeedPage();
const Rnum = Math.floor(Math.random() * 100);
const activities = new ActivityPage();

const configManager = new ConfigurationManager();
fixture`activity tests`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;
    await t
        .useRole(t.ctx.user.role);
});
/**@description open the activity creation menu from the home page */
test('can open activity creation menu', async t => {
    await feedPage.openCreateMenu();
    await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(activities.title.exists).eql(true)
});
/**@description open an activity from the my activites list from feed page */
test('can navigate to test from feed page', async t =>{
    await feedPage.openCreateMenu();
    await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector("#search-tab-tab-Content").exists).eql(true);
    await activities.addEndData();
    await activities.addNthGroup(0);
    let tandd = await activities.addGenericTitleAndDescription();
    await activities.pressCreateBtn();
    await feedPage.returnToHome();
    await activities.navigateToActivity(tandd["title"])
});
/**@description navigate to the edit mode of an activity */
test('can navigate to edit activity', async t => {
    let obj = await activities.createGenericAct()
    await feedPage.returnToHome()
    await activities.openActivityInEditMode(obj.title)
});
/**@description can create an activity just that, thats it */
test('can create an activity', async t => {
    await feedPage.openCreateMenu();
    await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector("#search-tab-tab-Content").exists).eql(true);
    await activities.addEndData();
    await activities.addNthGroup(0);
    let tandd = await activities.addGenericTitleAndDescription();
    await activities.pressCreateBtn();
});
/**@deprecated replaced with cleaner test */
test('can edit activity title [DEPRECATED]', async t => {
    await feedPage.openCreateMenu();
    await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector("#search-tab-tab-Content").exists).eql(true);
    await activities.addEndData();
    await activities.addNthGroup(0);
    let tandd = await activities.addGenericTitleAndDescription();
    await activities.pressCreateBtn();
    await feedPage.returnToHome();
    await activities.navigateToActivity(tandd["title"])
    await t
    .expect(activities.editBtn.exists).eql(true)
    .click(activities.editBtn)
    .expect(Selector("a").withText("Edit Activity").exists).eql(true)
    .click(Selector("a").withText("Edit Activity"));
    await t
    .click(activities.title);
    await Util.CtlADelete(activities.title)
    await t
    .click(activities.title)
    .typeText(activities.title,"actTitle:"+Util.randchar(25))
    await activities.pressCreateBtn();
}).skip;
/**@description try to create an activity with multiple groups attached to it. */
test('can create an activity with multiple groups', async t => {
    await feedPage.openCreateMenu();
    await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector("#search-tab-tab-Content").exists).eql(true);
    await activities.addEndData();
    await activities.addNthGroup(0);
    await activities.addNthGroup(1);
    await activities.addNthGroup(2);
    await activities.addGenericTitleAndDescription();
    await activities.pressCreateBtn();
});
//test('cannot create an activity without groups', async t => {
//     await feedPage.openCreateMenu();
//     await t
//     .setNativeDialogHandler(() => true)
//     .click(feedPage.createOptionsActivity)
//     .expect(Selector("#search-tab-tab-Content").exists).eql(true);
//     await activities.addEndData();
//     await activities.addGenericTitleAndDescription();
//     await t
//     .expect(activities.createBtn.exists).eql(true)
//     .click(activities.createBtn)
//     .expect(Selector("span.error.createButtons.top.active").exists).eql(true);
// }).only;
/**
 * @description attempt to create an activity without a title or description,
 * it should not succsead, as such valifdaton is set up as such
 */
test('cannot create an activity without a title or desc', async t => {
    await feedPage.openCreateMenu();
    await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector("#search-tab-tab-Content").exists).eql(true);
    await activities.addNthGroup(0);
    await activities.addEndData();
    await t
    .expect(activities.createBtn.exists).eql(true)
    .click(activities.createBtn)
    .expect(Selector("span.error.createButtons.top.active").exists).eql(true);
});
/**@description attempt to create an activity without fillign any fields in */
test('cannot create an activity without any info', async t => {
    await feedPage.openCreateMenu();
    await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector("#search-tab-tab-Content").exists).eql(true);
    await t
    .expect(activities.createBtn.exists).eql(true)
    .click(activities.createBtn)
    .expect(Selector("span.error.createButtons.top.active").exists).eql(true);
});
/**@description attempt to edit the title of an actiity by creating an activty then navigating back to it in edit mode */
test('edit title of activity', async t => {
    await activities.createActivityAndEditField(activities.title,"title"+Util.randchar(20),"title")
});
/**@description attempt to edit the description of an actiity by creating an activty then navigating back to it in edit mode */
test('edit description of activity', async t => {
    await activities.createActivityAndEditField(activities.description,"description"+Util.randchar(20),"description")
});
/**@description attempt to edit the endDate of an actiity by creating an activty then navigating back to it in edit mode */
test('edit endDate of activity', async t => {
    await activities.createActivityAndEditField(activities.endDate,configManager.defaultEditedEndDate,"endDate")
});
/**@description attempt to edit the startDate of an actiity by creating an activty then navigating back to it in edit mode */
test('edit startDate of activity', async t => {
    await activities.createActivityAndEditField(activities.startDate,configManager.defaultEditedStartDate,"startDate")
});