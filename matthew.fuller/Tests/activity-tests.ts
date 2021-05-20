import FeedPage from "../PageObjects/feed-page";
import { mattUser } from "../Utilities/roles";
import ConfigurationManager from "../Configuration/configuration";
import ActivityPage from "../PageObjects/activity-page";
import util from "../Utilities/util";
import { Selector } from "testcafe";

const configManager = new ConfigurationManager();

fixture`Log in to MBEweb`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;

    await t
        .useRole(t.ctx.user.role);
});
const Util = new util;
const feedPage = new FeedPage();
const Rnum = Math.floor(Math.random() * 100);
const activities = new ActivityPage();


test('can open activity creation menu', async t => {
    await feedPage.openCreateMenu();
    await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(activities.title.exists).eql(true)
});
test('can create an activity', async t => {
    await feedPage.openCreateMenu();
    await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector("#search-tab-tab-Content").exists).eql(true);
    await activities.addEndData();
    await activities.addNthGroup(0);
    await activities.addGenericTitleAndDescription();
    await activities.pressCreateBtn();
});
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
test('cannot create an activity without groups', async t => {
    await feedPage.openCreateMenu();
    await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector("#search-tab-tab-Content").exists).eql(true);
    await activities.addEndData();
    await activities.addGenericTitleAndDescription();
    await t
    .expect(activities.createBtn.exists).eql(true)
    .click(activities.createBtn)
    .expect(Selector("span.error.createButtons.top.active").exists).eql(true);
});
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