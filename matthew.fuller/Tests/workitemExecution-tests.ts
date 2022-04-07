/* eslint-disable no-unused-vars */
import { Selector, t } from 'testcafe';
import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import { tabs } from '../PageObjects/PageComponents/tabs';
import { VerificationTypes } from '../PageObjects/PageComponents/VerificationTypes';
import WIStepVerificationInfo from '../PageObjects/PageComponents/WIStepVerificationInfo';
import WI from '../PageObjects/WI';
import Util from '../Utilities/util';
import WISteps from '../PageObjects/PageComponents/WISteps';
import UPLOAD from '../PageObjects/PageComponents/Upload';
import { WORKITEMTAB } from '../PageObjects/PageComponents/WITAB';
import SharedElements from '../PageObjects/sharedElements';
import Alerts from '../PageObjects/Alerts';
import WIExecution from '../PageObjects/PageComponents/wiExecution';

const wiExecution = new WIExecution();
/** @description  An enum representing all possible types for a verification step */
const types = VerificationTypes;
/** @description A class represnting the controller that handles configs */
const configManager = new ConfigurationManager();
/** @description A class represnting the "feedpage" on MBE-web */
const feedPage = new FeedPage();
/** @description A generic workitem object that will be used for all generic tests */
const DefaultWorkItem = new WI();
const sharedElements = new SharedElements();

/*
 * @description A fixture that will login to MBE web, and nothing more,
any WI's created under this fixture need to be removed at the end of their test.
 * --Note: cannot use an after each fixture here to delete WI's as some
of the tests under this fixture do not create a WI
 */
fixture`Work Item execution tests`.page(configManager.homePage).beforeEach(async () => {
  t.ctx.user = mattUser;

  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});
test('can start workitem executon', async () => {
  await feedPage.createWI(DefaultWorkItem);
  const step = new WISteps();
  await DefaultWorkItem.AddStep(true, step, false, false);
  await DefaultWorkItem.changeToView();
  await wiExecution.startExecutionFromWIPage(1);
});
test('can cancel and delete workitem executon', async () => {
  await feedPage.createWI(DefaultWorkItem);
  const step = new WISteps();
  await DefaultWorkItem.AddStep(true, step, false, false);
  await DefaultWorkItem.changeToView();
  await wiExecution.startExecutionFromWIPage(1);
  await wiExecution.cancelAndDeleteExecution();
});

test('can switch workitem executon to newly created execution', async () => {
  await feedPage.createWI(DefaultWorkItem);
  const step = new WISteps();
  await DefaultWorkItem.AddStep(true, step, false, false);
  await DefaultWorkItem.changeToView();
  await wiExecution.startExecutionFromWIPage(1);
  await wiExecution.openSwitchExecutionMenu();
  await wiExecution.typeAndSubmitExecutionSerialNumber(2);
  const sn = await wiExecution.getSerialNumber();
  await t.expect(sn === '2').eql(true);
});

test('can open switch workitem executon tab and cancel', async () => {
  await feedPage.createWI(DefaultWorkItem);
  const step = new WISteps();
  await DefaultWorkItem.AddStep(true, step, false, false);
  await DefaultWorkItem.changeToView();
  await wiExecution.startExecutionFromWIPage(1);
  await wiExecution.openSwitchExecutionMenu();
  await t.click(sharedElements.CreateCancelButton);
  const sn = await wiExecution.getSerialNumber();
  await t.expect(sn === '1').eql(true);
});

test('can open switch workitem executon tab and click current execution', async () => {
  await feedPage.createWI(DefaultWorkItem);
  const step = new WISteps();
  await DefaultWorkItem.AddStep(true, step, false, false);
  await DefaultWorkItem.changeToView();
  await wiExecution.startExecutionFromWIPage(1);
  await wiExecution.openSwitchExecutionMenu();
  await wiExecution.clickCurrentExecutionInSwitch();
  const sn = await wiExecution.getSerialNumber();
  await t.expect(sn === '1').eql(true);
});

test('can open switch workitem executon tab and click nth execution', async () => {
  await feedPage.createWI(DefaultWorkItem);
  const step = new WISteps();
  await DefaultWorkItem.AddStep(true, step, false, false);
  await DefaultWorkItem.changeToView();
  await wiExecution.startExecutionFromWIPage(1);
  await wiExecution.createNewExecution(2);
  await wiExecution.createNewExecution(3);
  await wiExecution.openSwitchExecutionMenu();
  await wiExecution.clickNthExecutionInSwitch(1);
  const sn = await wiExecution.getSerialNumber();
  await t.expect(sn === '2').eql(true);
});

test('can open switch workitem executon tab and click 1 of 3 executions', async () => {
  await feedPage.createWI(DefaultWorkItem);
  const step = new WISteps();
  await DefaultWorkItem.AddStep(true, step, false, false);
  await DefaultWorkItem.changeToView();
  await wiExecution.startExecutionFromWIPage(1);
  await wiExecution.createNewExecution(2);
  await wiExecution.createNewExecution(3);
  await wiExecution.openSwitchExecutionMenu();
  await wiExecution.clickExecutionInSwitchBySerialNumber(1);
  const sn = await wiExecution.getSerialNumber();
  await t.expect(sn === '1').eql(true);
});

test('Can finish and submit workitem executon with 1 step', async () => {
  await feedPage.createWI(DefaultWorkItem);
  const step = new WISteps();
  await DefaultWorkItem.AddStep(true, step, false, false);
  await DefaultWorkItem.changeToView();
  await wiExecution.startExecutionFromWIPage(1);
  await wiExecution.markAllStepsAsCompleted();
  await wiExecution.saveAndSubmitExecution();
});
test('Can finish and submit workitem executon with 2 steps', async () => {
  await feedPage.createWI(DefaultWorkItem);
  const step = new WISteps();
  await DefaultWorkItem.AddStep(true, step, false, false);
  const step2 = new WISteps();
  await DefaultWorkItem.AddStep(true, step2, false, false);
  await DefaultWorkItem.changeToView();
  await wiExecution.startExecutionFromWIPage(1);
  await wiExecution.markAllStepsAsCompleted();
  await wiExecution.saveAndSubmitExecution();
});

test('Can finish and submit workitem executon with 10 steps', async () => {
  await feedPage.createWI(DefaultWorkItem);
  for (let index = 0; index < 10; index += 1) {
    const step = new WISteps();
    await DefaultWorkItem.AddStep(true, step, false, false);
  }
  await DefaultWorkItem.changeToView();
  await wiExecution.startExecutionFromWIPage(1);
  await wiExecution.markAllStepsAsCompleted();
  await wiExecution.saveAndSubmitExecution();
});
