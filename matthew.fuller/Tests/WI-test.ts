import { Selector } from 'testcafe';
import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import Alerts from '../PageObjects/Alerts';
import { tabs } from '../PageObjects/PageComponents/tabs';
import { VerificationTypes } from '../PageObjects/PageComponents/VerificationTypes';
import WIStepVerificationInfo from '../PageObjects/PageComponents/WIStepVerificationInfo';
import WI from '../PageObjects/WI';
import Util from '../Utilities/util';
import WISteps from '../PageObjects/PageComponents/WISteps';
import UPLOAD from '../PageObjects/PageComponents/Upload';
import { WORKITEMTAB } from '../PageObjects/PageComponents/WITAB';
import SharedElements from '../PageObjects/sharedElements';
/** @description  An enum representing all possible types for a verification step */
const types = VerificationTypes;
/** @description A class represnting the controller that handles configs */
const configManager = new ConfigurationManager();
/** @description A class represnting the "feedpage" on MBE-web */
const feedPage = new FeedPage();
/** @description A generic workitem object that will be used for all generic tests */
const DefaultWorkItem = new WI();

/*
 * @description A fixture that will login to MBE web, and nothing more,
any WI's created under this fixture need to be removed at the end of their test.
 * --Note: cannot use an after each fixture here to delete WI's as some
of the tests under this fixture do not create a WI
 */
fixture`WorkItems`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;

  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});
// test is the title is present in the view mode of the workitem
test('check if there is a title in the "view" mode of a workitem', async () => {
  await feedPage.createWICheckIfTitle(DefaultWorkItem);
});
// tests that only use log in fixture
test('add a lot of steps and child steps', async () => {
  const util = new Util();
  DefaultWorkItem.title = `this is a generic stress test id: ${util.randChar(50)}`;
  await feedPage.createWI(DefaultWorkItem);
  await feedPage.returnToHome();
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  for (let g = 0; g < 100; g += 1) {
    const step = new WISteps();
    step.StepShouldNotHaveInformationFilled = true;
    // var step4 = new WISteps();
    let i = 0;
    await DefaultWorkItem.AddStep(true, step, false, false);
    let step3 = step;
    // loop to add five nested children
    for (i; i < 3; i += 1) {
      const step2 = new WISteps();
      step2.StepShouldNotHaveInformationFilled = true;
      await DefaultWorkItem.addChildStepToStep(step3, step2);
      console.log(i);
      step3 = step2;
    }
    // add ten children
    for (let y = 0; y < 10; y += 1) {
      const step2 = new WISteps();
      step2.StepShouldNotHaveInformationFilled = false;
      await DefaultWorkItem.addChildStepToStep(step, step2);
    }
  }
  await feedPage.returnToHome();
  await feedPage.deleteWI(tabs.WORKITEMS, DefaultWorkItem);
}).skip;

test('can open WI menu fill in all feilds then cancel', async () => {
  // eslint-disable-next-line no-shadow
  const DefaultWorkItem = new WI();
  DefaultWorkItem.title = feedPage.combineStringWithRandID(DefaultWorkItem.title, 40);
  await feedPage.openAWICreateMenu();
  await feedPage.FillallWIFields(DefaultWorkItem);
  await feedPage.closeAWIMenu();
});

test('can open WI menu and close', async () => {
  await feedPage.openAWICreateMenu();
  await feedPage.closeAWIMenu();
});
test('can open WI menu and crtl a delete and close', async () => {
  // eslint-disable-next-line no-shadow
  const DefaultWorkItem = new WI();
  // eslint-disable-next-line no-shadow
  const util = new Util();
  await feedPage.openAWICreateMenu();
  await feedPage.FillallWIFields(DefaultWorkItem);
  const sharedElements = new SharedElements();
  await sharedElements.getCurrentInputs();
  await util.CtlADelete(sharedElements.genericTitleInput);
  await feedPage.closeAWIMenu();
});
test('test if a work item can have a parenthisis in it', async () => {
  const customWorkItem = new WI();
  customWorkItem.title = 'TEST12345(testing)';
  await feedPage.createWI(customWorkItem);
  await feedPage.returnToHome();
  await feedPage.SearchFor(customWorkItem.title, tabs.WORKITEMS);
  await feedPage.findSearchResult(customWorkItem.title);
});
test('test if a work item can have a a pair of parenthisis at the end of it', async () => {
  const customWorkItem = new WI();
  customWorkItem.title = 'TEST1234()';
  await feedPage.createWI(customWorkItem);
  await feedPage.returnToHome();
  await feedPage.SearchFor(customWorkItem.title, tabs.WORKITEMS);
  await feedPage.findSearchResult(customWorkItem.title);
});
test('test if a work item can have a parenthisis at the end "name(hello)" and be found by searching "name("', async () => {
  const customWorkItem = new WI();
  customWorkItem.title = 'TEST1234(testing)';
  await feedPage.createWI(customWorkItem);
  await feedPage.returnToHome();
  const searchFor = 'TEST1234(';
  await feedPage.SearchFor(searchFor, tabs.WORKITEMS);
  await feedPage.findSearchResult(customWorkItem.title);
});
test('test if a work item can have a parenthisis at the end of it', async () => {
  const customWorkItem = new WI();
  customWorkItem.title = 'TEST1234(';
  await feedPage.createWI(customWorkItem);
  await feedPage.returnToHome();
  await feedPage.SearchFor(customWorkItem.title, tabs.WORKITEMS);
  await feedPage.findSearchResult(customWorkItem.title);
});
/*
*@description this is a fixture that will login to MBE web,
then create a WI based upon the "defaultWI" object
*
*/
fixture`WI test initalisation`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;

  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
  await feedPage.createWI(DefaultWorkItem);
  await feedPage.returnToHome();
}).afterEach(async () => {
  await feedPage.returnToHome();
  await feedPage.deleteWI(tabs.WORKITEMS, DefaultWorkItem);
});
/*
This is a test that will navigate to a WI, then add a
step to the WI, then a child step to the aforementioned step.
Reason: This is a simple UI test, it ensures that a user can add a child step to a existing step
BreakDown:
Fixture -- creates WI -> NaviagateToEditWi -- opens the
 provided WI in edit mode -> AddStep --adds a step to the current WI ->
addChildStepToStep --adds a child-step to the step created in the last action
*/
test('can add child step to wistep', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const step = new WISteps();
  step.StepShouldNotHaveInformationFilled = true;
  const step2 = new WISteps();
  await DefaultWorkItem.AddStep(true, step, false, false);
  await DefaultWorkItem.addChildStepToStep(step, step2);
});
/*
This is a test that will attempt to switch between all tabs
located at the top of a WI, (USERS, CONTENT, UPLOAD, WORKITEM)
Reason: Simple UI test, this test ensures the menus function properly
BreakDown:
Fixture -- creates WI -> NaviagateToEditWi -- opens the provided
 WI in edit mode -> SwitchWITab --switchs to specified tab ->
 repeat last step a 3 times with sperate options
*/
test('can switch between all WI tabs', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.UPLOAD);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.WORKITEM);
});
/*
This is a test that will attempt to switch between all tabs located
at the top of a WI rapidly, (USERS, CONTENT, UPLOAD, WORKITEM)
Reason: this was a bug in the search page of the website, if a user
 switched beween tabs fast enough they would be taken to an unloaded page.
 Thus as this is a similar inerface the test has been implemneted here
BreakDown:
Fixture -- creates WI -> NaviagateToEditWi -- opens the provided WI in edit mode ->
SwitchWITab --switchs to specified tab -> repeat last step alot in a random(ish)
order then loop 10 times
*/
test('can rapidly switch between tabs', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  for (let i = 0; i < 10; i += 1) {
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.UPLOAD);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.WORKITEM);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.UPLOAD);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.WORKITEM);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.WORKITEM);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.UPLOAD);
  }
});
/*
This is a test that will attempt to remove content from a workitem
Reason: UI test, ensures user can remove content from WI
BreakDown:
Fixture -- creates WI -> NaviagateToEditWi -- opens the provided WI in edit mode ->
 SwitchWITab --switches to content tab -> AddContentByIndex -- adds a specifyied content item
  -> RemoveContentByIndex --removes a specified content item
*/
test('can remove content from WI', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
  await DefaultWorkItem.AddContentByIndex(1);
  await DefaultWorkItem.RemoveContentByIndex(0);
});
/*
This is a test that will ensure that the user can add a owner to a work item
Reason: UI test, ensures user can add additional owners to a work item
*/
test('can add user to WI', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
  await DefaultWorkItem.AddUserByIndex(1);
});
/*
This is a test that will ensure that the user can add multiple owners to a work item
Reason: UI test, ensures user can add multiple owners to a work item
*/
test('can add multiple users to WI', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
  await DefaultWorkItem.AddUserByIndex(1);
  await DefaultWorkItem.AddUserByIndex(2);
  await DefaultWorkItem.AddUserByIndex(3);
});
/*
This is a test that will ensure that the user can add all users
 (that the current user can accsess) to a workitem as owners
Reason: UI/Stress Test: ensures that MBE web can handle mass
amounts of users being added to the same workitem
*/
test('can add all avalible users to WI', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
  // all from first page
  await DefaultWorkItem.AddAllAvalibleUsers();
}).skip;
/*
This is a test that will ensure that the user can go to
 the next page of users on the "owners" tab of a workitem
 (this would function the same for a content tab, but there is
   not enough content for the button to exist(+10))
Reason: UI test, ensures buttons function properly
*/
test('can go to the next page of users through the " next button "', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
  await DefaultWorkItem.ClickNextUserPageBtn();
});
/*
This is a test that will ensure that the user can go to the
next page of users on the "owners" tab of a workitem, and then
come back to the first page (this would function the same for a
  content tab, but there is not enough content for the button to exist(+10))
Reason: UI test, ensures buttons function properly
*/
test('can go to the previous page of users through the " previous button "', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
  await DefaultWorkItem.ClickNextUserPageBtn();
  await DefaultWorkItem.ClickPrevUserPageBtn();
});
/*
This is a test that will ensure that the user can
add all users on the first page of the "owners" tab of a workitem to the current work item
Reason: UI/(minor)Stress Test: ensures there is no problem adding multiple users to a workitem
*/
test('can add first page of users to WI', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
  // all from first page
  await DefaultWorkItem.AddFirstPageOfUsers();
});
/*
This is a test that will ensure that the user can remove owners from the work item
Reason: UI Test, ensures that owners can be removed from a work item
*/
test('can remove user from WI', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
  await DefaultWorkItem.AddUserByIndex(1);
  // zero base index, but don't remove self
  await DefaultWorkItem.RemoveUserByIndex(1);
});
/*
This is a test that will ensure that the user can add a content item to a work item
Reason: UI Test, ensures adding content functions properly
*/
test('can add content to WI', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
  await DefaultWorkItem.AddContentByIndex(1);
});
/*
This is a test that will ensure that the user can add multiple content items to a work item
Reason: UI Test, ensures adding content works functions properly when adding multiple contents
*/
test('can add multiple content to WI', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
  await DefaultWorkItem.AddContentByIndex(1);
  await DefaultWorkItem.AddContentByIndex(2);
  await DefaultWorkItem.AddContentByIndex(3);
});
/*
This is a test that will ensure that the user
can add all content items that are avalible to the user to a workitem
Reason: UI/(minor)Stress Test, ensures adding content works
functions properly when all avalible content items
*/
test('can add all avalible content to WI', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
  await DefaultWorkItem.AddAllAvalibleContent();
});
/*
This is a test that will ensure that the user cannot add a
 child WI step to a existing WI step that has any informtion other that a title filled in.
Reason: UI Test, the child step system is ment to function
 somewhat like folders, once a step has a description it is not intended to be a folder anymore.
*/
test('cannot add child wi step to a wi step with information filled', async (t) => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const step = new WISteps();
  step.StepShouldNotHaveInformationFilled = false;
  // eslint-disable-next-line no-unused-vars
  const step2 = new WISteps();

  await DefaultWorkItem.AddStep(true, step, false, false);
  const selectedstep = await DefaultWorkItem.GetStep(step.StepNum);
  await t
    .hover(selectedstep)
    .expect(await selectedstep.child('.stepItemRightButtons').innerText === '').eql(true);
  // await DefaultWorkItem.addChildStepToStep(step, step2);
});
/*
This is a test that will ensure that the user cannot add a
child WI step to a existing WI child step that has any informtion other that a title filled in.
Reason: UI Test, to ensure MBE web's child step system functions properly.
*/
test('cannot add child wi step to a child wi step (with information filled) of a wi step', async (t) => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const step = new WISteps();
  step.StepShouldNotHaveInformationFilled = true;
  const step2 = new WISteps();
  await DefaultWorkItem.AddStep(true, step, false, false);
  await DefaultWorkItem.addChildStepToStep(step, step2);
  const selectedstep = await DefaultWorkItem.GetStep(step2.StepNum);
  await t.hover(selectedstep).expect(selectedstep.child('.stepItemRightButtons').child('img').exists).eql(false);
});
/*
This is a test that will ensure that the user can add a child step to a child step within a workitem
Reason: UI Test
*/
test('can add child step to child step', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const step = new WISteps();
  step.StepShouldNotHaveInformationFilled = true;
  const step2 = new WISteps();
  step2.StepShouldNotHaveInformationFilled = true;
  const step3 = new WISteps();
  // var step4 = new WISteps();
  await DefaultWorkItem.AddStep(true, step, false, false);
  await DefaultWorkItem.addChildStepToStep(step, step2);
  await DefaultWorkItem.addChildStepToStep(step2, step3);
});
/*
This is a test that will ensure that the user can add a lot of child steps
Reason: Stress test, ensuring MBE web's WI child step system
functions properly when pushed to the extreme
*/
test('can add (a lot of) child step to child step', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  let step = new WISteps();
  step.StepShouldNotHaveInformationFilled = true;
  // var step4 = new WISteps();
  let i = 0;
  await DefaultWorkItem.AddStep(true, step, false, false);
  for (i; i < 5; i += 1) {
    const step2 = new WISteps();
    step2.StepShouldNotHaveInformationFilled = true;
    await DefaultWorkItem.addChildStepToStep(step, step2);
    console.log(i);
    step = step2;
  }
}).skip;
/*
This is a test that will ensure that the user can edit the title of a work item after it is created
Reason: UI Test
*/
test('can edit title of WI', async () => {
  const util = new Util();
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  // eslint-disable-next-line no-unused-vars
  const editedWI = await DefaultWorkItem.EditWITitle(DefaultWorkItem, `Edited Title ${util.randChar(50)}`);
});
/*
This is a test that will ensure that the user can edit the description of a work
 item after it is created
Reason: UI Test
*/
test('can edit WI description', async () => {
  const util = new Util();
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.EditWIDescription(DefaultWorkItem, `edited description${DefaultWorkItem.description}${util.randChar(50)}`);
});
/*
This is a test that will ensure that the user can edit the title and
description of a work item after it is created
Reason: UI Test
*/
test('can edit description and title', async () => {
  const util = new Util();
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.EditWITitle(DefaultWorkItem, `Edited Title ${util.randChar(50)}`);
  await DefaultWorkItem.EditWIDescription(DefaultWorkItem, `edited description${DefaultWorkItem.description}${util.randChar(50)}`);
});
/*
This is a test that will ensure that the user can upload context to a workitem
Reason: UI Test
*/
test('can upload context to step', async (t) => {
  const upload = new UPLOAD('.//images//tucker.JPG');
  const step = new WISteps();
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  await DefaultWorkItem.UploadContext(upload);
  // wait for upload
  await t.expect(Selector(Selector('.progressRingThrobbing')).exists).notOk({ timeout: 10000 });
  await DefaultWorkItem.AddStep(false, step, false, false);
  // the index will be 0, no need to detect it
  step.StepNum = 0;
  await DefaultWorkItem.AddContextToStep(step, upload);
});
/*
This is a test that will ensure that the user can delete a workitem after its creation
Reason: UI Test
*/
test('can create WI then delete', async () => {
  const util = new Util();
  if (util.Verbose)console.log('--test-"can create WI then delete" running blank test, only fixtures--');
});
/**
 * @deprecated the tab in question no longer exists
 This is a test that will ensure that the user can open and close the verification menu'
 Reason: UI Test
 */
test('[DEPRECATED] can open and close verification menu', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  // await WIstep.switchToVerificationTab();
  await WIstep.openVerificationMenu();
  await WIstep.closeVerificationMenu();
}).skip;
/**
* @deprecated the tab in question no longer exists
This is a test that will ensure that the user can switch between the
instructions and verifications tabs in a wi
Reason: UI Test
*/
test('[DEPRECATED] switch between instruction and verification tabs', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  await WIstep.switchToVerificationTab();
  await WIstep.switchToInstructionsTab();
  await WIstep.switchToVerificationTab();
}).skip;
/*
This is a test that will ensure that the user can add a single verification
 step to a existing work item
Reason: UI Test
*/
test('Add one verification step', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  const VerificationStep = new WIStepVerificationInfo(types.TEXT);
  await WIstep.addVerificationStep(VerificationStep);
  await feedPage.returnToHome();
});
/**
@deprecated the button in question no longer exists
This is a test that will ensure that the user can add a single verification
 step to a existing work item and then check the QPID of that verification step
Reason: UI Test
*/
test('[DEPRECATED] view QPID button functions properly', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  const VerificationStep = new WIStepVerificationInfo(types.TEXT);
  await WIstep.addVerificationStep(VerificationStep);
  await WIstep.checkQPID();
  await feedPage.returnToHome();
}).skip;
/**
 @deprecated the button in question no longer exists
This is a test that will ensure that the user can add a
single verification step to a existing work item and then check
the QPID feild closes when its supposed to
Reason: UI Test
*/
test('[DEPRECATED] view QPID button can close', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  const VerificationStep = new WIStepVerificationInfo(types.TEXT);
  await WIstep.addVerificationStep(VerificationStep);
  await WIstep.checkQPID();
  await WIstep.closeQPID();
  await feedPage.returnToHome();
}).skip;
/*
This is a test that will ensure that the user cannot add a step with the same name as another step
Reason: UI Test
*/
test('Cannot add duplicate steps', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  WIstep.StepName = 'Step w/S-Name';
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  await DefaultWorkItem.AddStep(true, WIstep, true, false);
});
/*
This is a fixture that will create a WI based upon
the default WI object then delete it after each test
this fixture is being used a second folder to represnt
tests that should not fail, but should be tested none the less,
 thus allowing me to skip running them if wanted
Due to these tests being smaller and more self explanitory they will not be documented
*/
fixture`tests that most likly will not fail`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;

  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);

  await feedPage.createWI(DefaultWorkItem);
  await feedPage.returnToHome();
}).afterEach(async () => {
  await feedPage.returnToHome();
  await feedPage.deleteWI(tabs.WORKITEMS, DefaultWorkItem);
});
/**
 * @description add a text verification to a work item
 */
test('add a text verification steps', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  // eslint-disable-next-line no-unused-vars
  let i;

  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  const VerificationStep = new WIStepVerificationInfo(types.TEXT);
  await WIstep.addVerificationStep(VerificationStep);

  await feedPage.returnToHome();
});

test('add a checkbox verification steps', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  const VerificationStep = new WIStepVerificationInfo(types.CHECKBOX);
  await WIstep.addVerificationStep(VerificationStep);

  await feedPage.returnToHome();
});
test('add a date verification steps', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  const VerificationStep = new WIStepVerificationInfo(types.DATE);
  await WIstep.addVerificationStep(VerificationStep);

  await feedPage.returnToHome();
});
test('add a file verification steps', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  const VerificationStep = new WIStepVerificationInfo(types.FILE);
  await WIstep.addVerificationStep(VerificationStep);

  await feedPage.returnToHome();
});

test('add a decimal verification steps', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  const VerificationStep = new WIStepVerificationInfo(types.DECIMAL);
  await WIstep.addVerificationStep(VerificationStep);

  await feedPage.returnToHome();
});

test('add a dropdown verification steps', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  const VerificationStep = new WIStepVerificationInfo(types.DROPDOWN);
  await WIstep.addVerificationStep(VerificationStep);

  await feedPage.returnToHome();
});
test('add a intager verification steps', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  const VerificationStep = new WIStepVerificationInfo(types.INTEGER);
  await WIstep.addVerificationStep(VerificationStep);

  await feedPage.returnToHome();
});
test('add a multiselect verification steps', async () => {
  await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
  const WIstep = new WISteps();
  await DefaultWorkItem.AddStep(true, WIstep, false, false);
  const VerificationStep = new WIStepVerificationInfo(types.MULTISELECT);
  await WIstep.addVerificationStep(VerificationStep);

  await feedPage.returnToHome();
});
