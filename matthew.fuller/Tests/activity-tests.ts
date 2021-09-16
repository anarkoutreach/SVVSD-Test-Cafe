import { Selector } from 'testcafe';
import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import ActivityPage from '../PageObjects/activity-page';
import Util from '../Utilities/util';

const util = new Util();
const feedPage = new FeedPage();
const activities = new ActivityPage();

const configManager = new ConfigurationManager();
fixture`activity tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  // the below is a scuffed method of allowing multiple users to run the same tests
  // try {
  //     const data = fs.readFileSync(__dirname + "\\scuffedInfo\\activeUser.json", 'utf8')
  //     let user = new userObj();
  //     await user.initaliseUserObjFromObj(JSON.parse(data));
  //     t.ctx.user = user.user;
  //   } catch (err) {
  //     t.ctx.user = mattUser;
  //     //console.error(err)
  //   }

  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});

/** @description open the activity creation menu from the home page */
test('can open activity creation menu', async (t) => {
  await feedPage.openCreateMenu();
  await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(activities.title.exists).eql(true);
});
/**
 * @depricated "my activites" no longer exists
 *  open an activity from the my activites list from feed page
 * */
test('[DEPRECATED] can navigate to test from feed page', async (t) => {
  await feedPage.openCreateMenu();
  await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector('#search-tab-tab-Content').exists).eql(true);
  await activities.addEndData();
  await activities.addNthGroup(0);
  const titleAndDescription = await activities.addGenericTitleAndDescription();
  await activities.pressCreateBtn();
  await feedPage.returnToHome();
  await activities.navigateToActivity(titleAndDescription.title);
}).skip;
/** @description navigate to the edit mode of an activity */
test('can navigate to edit activity', async () => {
  const obj = await activities.createGenericAct();
  await feedPage.returnToHome();
  await activities.openActivityInEditMode(obj.title);
});
/** @description can create an activity just that, thats it */
test('can create an activity', async (t) => {
  await feedPage.openCreateMenu();
  await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector('#search-tab-tab-Content').exists).eql(true);
  await activities.addEndData();
  await activities.addNthGroup(0);
  await activities.pressCreateBtn();
});
/** @deprecated replaced with cleaner test */
test('[DEPRECATED] can edit activity title ', async (t) => {
  await feedPage.openCreateMenu();
  await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector('#search-tab-tab-Content').exists).eql(true);
  await activities.addEndData();
  await activities.addNthGroup(0);
  const tandd = await activities.addGenericTitleAndDescription();
  await activities.pressCreateBtn();
  await feedPage.returnToHome();
  await activities.navigateToActivity(tandd.title);
  await t
    .expect(activities.editBtn.exists).eql(true)
    .click(activities.editBtn)
    .expect(Selector('a').withText('Edit Activity').exists)
    .eql(true)
    .click(Selector('a').withText('Edit Activity'));
  await t
    .click(activities.title);
  await util.CtlADelete(activities.title);
  await t
    .click(activities.title)
    .typeText(activities.title, `actTitle:${util.randChar(25)}`);
  await activities.pressCreateBtn();
}).skip;
/** @description try to create an activity with multiple groups attached to it. */
test('can create an activity with multiple groups', async (t) => {
  await feedPage.openCreateMenu();
  await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector('#search-tab-tab-Content').exists).eql(true);
  await activities.addEndData();
  await activities.addNthGroup(0);
  await activities.addNthGroup(1);
  await activities.addNthGroup(2);
  await activities.addGenericTitleAndDescription();
  await activities.pressCreateBtn();
});
// test('cannot create an activity without groups', async t => {
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
test('cannot create an activity without a title or desc', async (t) => {
  await feedPage.openCreateMenu();
  await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector('#search-tab-tab-Content').exists).eql(true);
  await activities.addNthGroup(0);
  await activities.addEndData();
  await t
    .expect(activities.createBtn.exists).eql(true)
    .click(activities.createBtn)
    .expect(Selector('span.error.createButtons.top.active').exists)
    .eql(true);
});
/** @description attempt to create an activity without fillign any fields in */
test('cannot create an activity without any info', async (t) => {
  await feedPage.openCreateMenu();
  await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector('#search-tab-tab-Content').exists).eql(true);
  await t
    .expect(activities.createBtn.exists).eql(true)
    .click(activities.createBtn)
    .expect(Selector('span.error.createButtons.top.active').exists)
    .eql(true);
});
/** @description attempt to edit the title of an actiity by creating an
 *  activty then navigating back to it in edit mode */
test('edit title of activity', async () => {
  await activities.createActivityAndEditField(activities.title, `title${util.randChar(20)}`, 'title');
});
/** @description attempt to edit the description of an actiity by creating
 * an activty then navigating back to it in edit mode */
test('edit description of activity', async () => {
  await activities.createActivityAndEditField(activities.description, `description${util.randChar(20)}`, 'description');
});
/** @description attempt to edit the endDate of an actiity by creating an
 * activty then navigating back to it in edit mode */
test('edit endDate of activity', async () => {
  await activities.createActivityAndEditField(activities.endDate, configManager.defaultEditedEndDate, 'endDate');
});
/** @description attempt to edit the startDate of an actiity by creating
 * an activty then navigating back to it in edit mode */
test('edit startDate of activity', async () => {
  await activities.createActivityAndEditField(activities.startDate, configManager.defaultEditedStartDate, 'startDate');
});
