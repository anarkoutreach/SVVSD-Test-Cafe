import { t } from 'testcafe';
import FeedPage from '../PageObjects/feed-page';
import ConfigurationManager from '../Configuration/configuration';
import { mattUser } from '../Utilities/roles';
import ACListCreationPopup from '../PageObjects/PageComponents/acListCreationPopup';
import ACListObj from '../PageObjects/PageComponents/acListObj';
import { roles } from '../PageObjects/PageComponents/roles';

const configManager = new ConfigurationManager();

fixture`acList creation tests`.page(configManager.homePage).beforeEach(async () => {
  const feedPage = new FeedPage();
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
  const acList = new ACListObj('testACLIST1234', 'testdescription', [roles.VIEWER]);
  await acListPage.createAcList(acList);
  await t.wait(1000);
});
