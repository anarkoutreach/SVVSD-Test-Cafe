import { Selector } from 'testcafe';
import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import ActivityPage from '../PageObjects/activity-page';
import Util from '../Utilities/util';
import ActivityObj from '../PageObjects/PageComponents/activityObj';
import CalendarWidget from '../PageObjects/PageComponents/calendarWidget';

const calendarWidget = new CalendarWidget();
const util = new Util();
const feedPage = new FeedPage();
const activities = new ActivityPage();
const configManager = new ConfigurationManager();
let activityToDelete: ActivityObj;
fixture`activity navigation tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});

/** @description open the activity creation menu from the home page */
test('can open activity creation menu', async () => {
  await feedPage.navigateToActivityCreateMenu();
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
  await calendarWidget.addEndDate();
  await activities.addNthGroup(0);
  const titleAndDescription = await activities.addGenericTitleAndDescription();
  await activities.pressCreateBtn();
  await feedPage.returnToHome();
  await activities.navigateToActivity(titleAndDescription.title);
}).skip;

fixture`activity deletion tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});
test('can delete activity from search', async () => {
  activityToDelete = await activities.createGenericAct();
  activities.deleteActivity(activityToDelete);
});
test('can delete activity from activity page', async () => {
  activityToDelete = await activities.createGenericAct();
  activities.deleteActivity(activityToDelete, true);
});

fixture`activity creation tests`.page(configManager.homePage).beforeEach(async (t) => {
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
}).afterEach(async () => {
  await feedPage.returnToHome();
  if (activityToDelete) {
    await activities.deleteActivity(activityToDelete);
  }
});

/** @description navigate to the edit mode of an activity */
test('can navigate to edit activity', async () => {
  const obj = await activities.createGenericAct();
  await feedPage.returnToHome();
  await activities.openActivityInEditMode(obj.title);
});
/** @description can create an activity just that, thats it */
test('can create an activity', async () => {
  activityToDelete = await activities.createGenericAct();
});
/** @deprecated replaced with cleaner test */
test('[DEPRECATED] can edit activity title ', async (t) => {
  await feedPage.openCreateMenu();
  await t
    .setNativeDialogHandler(() => true)
    .click(feedPage.createOptionsActivity)
    .expect(Selector('input.searchBar.form-control').exists).eql(true);
  await calendarWidget.addEndDate();
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
test('can create an activity with multiple groups', async () => {
  await feedPage.switchToCreateNewActivity();
  await activities.addNthGroup(0);
  await activities.addNthGroup(1);
  await activities.addNthGroup(2);
  const info = await activities.addGenericTitleAndDescription();
  await activities.pressCreateBtn();
  activityToDelete = new ActivityObj(info.title, info.desc, 0);
});
// test('cannot create an activity without groups', async t => {
//     await feedPage.openCreateMenu();
//     await t
//     .setNativeDialogHandler(() => true)
//     .click(feedPage.createOptionsActivity)
//     .expect(Selector("#search-tab-tab-Content").exists).eql(true);
//     await calendarWidget.addEndDate();
//     await activities.addGenericTitleAndDescription();
//     await t
//     .expect(activities.createBtn.exists).eql(true)
//     .click(activities.createBtn)
//     .expect(Selector("span.error.createButtons.top.active").exists).eql(true);
// }).only;
/**

/** @description attempt to edit the title of an actiity by creating an
 *  activty then navigating back to it in edit mode */
test('edit title of activity', async () => {
  activityToDelete = await activities.createActivityAndEditField(activities.title, `title${util.randChar(20)}`, 'title');
});
/** @description attempt to edit the description of an actiity by creating
 * an activty then navigating back to it in edit mode */
test('edit description of activity', async () => {
  activityToDelete = await activities.createActivityAndEditField(activities.description, `description${util.randChar(20)}`, 'description');
});

/** @description use the calendar wigit's month arrows */
test('test calendar wigit month forward arrow', async () => {
  await feedPage.openCreateMenu();
  await activities.clickCreateActivity();
  await calendarWidget.clickOnDayInCurrentMonth('1', 'start');
  await calendarWidget.clickToNextMonth();
  await calendarWidget.clickOnDayInCurrentMonth('1', 'start');
  await activities.addNthGroup(0);
  await activities.addNthGroup(1);
  await activities.addNthGroup(2);
  await activities.addGenericTitleAndDescription();
  await activities.pressCreateBtn();
});

fixture`activity tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});

/** @description use the calendar wigit's forward and backwards month arrows */
test('test calendar widget month all arrows', async () => {
  await feedPage.openCreateMenu();
  await activities.clickCreateActivity();
  await calendarWidget.clickOnDayInCurrentMonth('28', 'end');
  for (let index = 0; index < 10; index += 1) {
    await calendarWidget.clickToNextMonth();
  }
  await calendarWidget.clickToPreviousMonth();
  await calendarWidget.clickOnDayInCurrentMonth('28', 'end');
  await calendarWidget.clickOnDayInCurrentMonth('1', 'start');
  for (let index = 0; index < 10; index += 1) {
    await calendarWidget.clickToPreviousMonth();
  }
  await calendarWidget.clickOnDayInCurrentMonth('1', 'start');
  await activities.addNthGroup(0);
  await activities.addNthGroup(1);
  await activities.addNthGroup(2);
  await activities.addGenericTitleAndDescription();
  await activities.pressCreateBtn();
});

/** @description attempt to edit the endDate of an actiity by creating an
 * activty then navigating back to it in edit mode and raw imputing in the
 * calender input field */
test('edit endDate of activity by flat-typing', async () => {
  activityToDelete = await activities.createActivityAndEditField(activities.endDate, configManager.defaultEditedEndDate, 'endDate');
});

/** @description attempt to edit the startDate of an activity by creating
 * an activity then navigating back to it in edit mode and
 *  raw imputing in the calendar input field */
test('edit startDate of activity by flat-typing', async () => {
  activityToDelete = await activities.createActivityAndEditField(activities.startDate, configManager.defaultEditedStartDate, 'startDate');
});
fixture`activity tests with url hop in fixture`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
  await feedPage.switchToCreateNewActivity();
});

/** @description attempt to edit the startDate of an activity by creating
 * an activity then navigated back to it in edit mode and typing (in accordance
 * with the rules mbeweb uses for calendar field inputs) into the date field
 */
test('edit startDate of activity by "properly" typing', async () => {
  await calendarWidget.changeDateByTyping(calendarWidget.calendarStartDate);
});

/** @description attempt to edit the end date of an activity by creating
 * an activity then navigated back to it in edit mode and typing (in accordance
 * with the rules mbeweb uses for calendar field inputs) into the end date field
 */
test('edit endDate of activity by "properly" typing', async () => {
  await calendarWidget.changeDateByTyping(calendarWidget.calendarEndDate);
});

/** @description attempt to edit the endDate of an actiity by creating an
 * activty then navigating back to it in edit mode  and clicking in the
 * calender menu */
test('edit endDate of activity by clicking', async () => {
  await calendarWidget.clickOnDayInCurrentMonth('28', 'end');
  await activities.addNthGroup(0);
  await activities.addNthGroup(1);
  await activities.addNthGroup(2);
  await activities.addGenericTitleAndDescription();
  await activities.pressCreateBtn();
});
/** @description attempt to edit the startDate of an actiity by creating
 * an activty then navigating back to it in edit mode and
 *  clicking in the calendar menu */
test('edit startDate of activity by clicking', async () => {
  await calendarWidget.clickOnDayInCurrentMonth('1', 'start');
  await activities.addNthGroup(0);
  await activities.addNthGroup(1);
  await activities.addNthGroup(2);
  await activities.addGenericTitleAndDescription();
  await activities.pressCreateBtn();
});

/** @description attempt to create an activity without fillign any fields in */
test('cannot create an activity without any info', async (t) => {
  await t
    .expect(activities.createBtn.exists).eql(true)
    .click(activities.createBtn)
    .expect(Selector('span.error.manageactivitypage.title.active').visible)
    .eql(true);
});

/** @description attempt to create an activity without a title or description,
* it should not succsead, as such valifdaton is set up as such
*/
test('cannot create an activity without a title or desc', async (t) => {
  await activities.addNthGroup(0);
  await calendarWidget.addEndDate();
  await t
    .expect(activities.createBtn.exists).eql(true)
    .click(activities.createBtn)
    .expect(Selector('span.error.manageactivitypage.title.active').exists)
    .eql(true);
});
