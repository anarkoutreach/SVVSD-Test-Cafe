import { t } from 'testcafe';
import FeedPage from '../PageObjects/feed-page';
import ConfigurationManager from '../Configuration/configuration';
import { mattUser } from '../Utilities/roles';
import ACListCreationPopup from '../PageObjects/PageComponents/acListCreationPopup';
import ACListObj from '../PageObjects/PageComponents/acListObj';
import { tabs } from '../PageObjects/PageComponents/tabs';
import SharedElements from '../PageObjects/sharedElements';
import Util from '../Utilities/util';

const sharedElements = new SharedElements();
const feedPage = new FeedPage();
const configManager = new ConfigurationManager();

fixture`acList creation tests`.page(configManager.homePage).beforeEach(async () => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
  await feedPage.navigateToCreateAcList();
});

test('can navigate to open aclist creation menu', async () => {
  // left empty as to test fixture before each
});

test('can create AC list', async () => {
  const acListPage = new ACListCreationPopup();
  const acList = new ACListObj();
  await acListPage.createAcList(acList);
  await feedPage.SearchFor(acList.name, tabs.ACLIST);
});

test('check can cancel out of fully filled aclist creation window', async () => {
  const acListPage = new ACListCreationPopup();
  const acList = new ACListObj();
  await acListPage.createAcList(acList, false);
  await t
    .click(acListPage.acListCancelBtn)
    .expect(acListPage.nameInput.visible).eql(false);
});

test('check can cancel out of aclist creation window without any info filled', async () => {
  const acListPage = new ACListCreationPopup();
  await t
    .click(acListPage.acListCancelBtn)
    .expect(acListPage.nameInput.visible).eql(false);
});

test('check duplicate aclist creation err visible', async () => {
  const acListPage = new ACListCreationPopup();
  const acList = new ACListObj();
  await acListPage.createAcList(acList);
  await feedPage.navigateToCreateAcList();
  await acListPage.createAcList(acList);
  await t.expect(sharedElements.genericErr.visible).eql(true);
});

test('check duplicate aclist creation err exists', async () => {
  const acListPage = new ACListCreationPopup();
  const acList = new ACListObj();
  await acListPage.createAcList(acList);
  await feedPage.navigateToCreateAcList();
  await acListPage.createAcList(acList);
  await t.expect(sharedElements.genericErr.exists).eql(true);
});

test('check duplicate aclist creation err text', async () => {
  const acListPage = new ACListCreationPopup();
  const acList = new ACListObj();
  await acListPage.createAcList(acList);
  await feedPage.navigateToCreateAcList();
  await acListPage.createAcList(acList);
  await t.expect(sharedElements.genericErr.withText('This list name is already in use. Please choose a different name.').visible).eql(true);
});

test('can create AC list and navigate to edit it', async () => {
  const acListPage = new ACListCreationPopup();
  const acList = new ACListObj();
  await acListPage.createAcList(acList);
  await acListPage.navigateToEditAcList(acList);
});

test('can create AC list and edit title', async () => {
  const util = new Util();
  const acListPage = new ACListCreationPopup();
  const acList = new ACListObj();
  await acListPage.createAcList(acList);
  await acListPage.navigateToEditAcList(acList);
  await util.CtlADelete(acListPage.nameInput);
  await t
    .expect(acListPage.nameInput.visible).eql(true)
    .typeText(acListPage.nameInput, `${acList.name}edited`)
    .expect(acListPage.acListCreateBtn.visible)
    .eql(true)
    .click(acListPage.acListCreateBtn);
  acList.name = `${acList.name}edited`;
  const result = await feedPage.getACListSelector(acList);
  await t.expect(result.exists).eql(true);
});

test('can create AC list and edit description', async () => {
  const util = new Util();
  const acListPage = new ACListCreationPopup();
  const acList = new ACListObj();
  await acListPage.createAcList(acList);
  await acListPage.navigateToEditAcList(acList);
  await util.CtlADelete(acListPage.descriptionInput);
  await t
    .expect(acListPage.descriptionInput.visible).eql(true)
    .typeText(acListPage.descriptionInput, `${acList.description}edited`)
    .expect(acListPage.acListCreateBtn.visible)
    .eql(true)
    .click(acListPage.acListCreateBtn);
  acList.description = `${acList.description}edited`;
  await acListPage.navigateToEditAcList(acList);
  const description = await acListPage.descriptionInput.value;
  console.log(description);
  console.log(description);
  await t.expect(description === acList.description).eql(true);
}).only;

test('can create AC list and navigate to delete it from search', async () => {
  const acListPage = new ACListCreationPopup();
  const acList = new ACListObj();
  await acListPage.createAcList(acList);
  let result = await feedPage.getACListSelector(acList);
  await t.expect(await result.visible).eql(true);

  await t
    .expect(sharedElements.ellipsis.visible).eql(true)
    .click(sharedElements.ellipsis);
  const delBtn = sharedElements.trashIcon;
  await t
    .expect(delBtn.exists).eql(true)
    .click(delBtn)
    .expect(sharedElements.genericCreateBtn.exists)
    .eql(true)
    .click(sharedElements.genericCreateBtn);
  await t
    .expect(feedPage.getSearchBar.visible).eql(true)
    .click(feedPage.getSearchBar);
  const util = new Util();
  await util.CtlADelete(feedPage.getSearchBar);
  result = await feedPage.getACListSelector(acList, false);
  await t.expect(result.exists).eql(false);
});
