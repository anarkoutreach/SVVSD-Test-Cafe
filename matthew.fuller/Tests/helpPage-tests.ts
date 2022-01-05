import { t } from 'testcafe';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import FeedPage from '../PageObjects/feed-page';
import HelpPopup from '../PageObjects/PageComponents/helpPopup';

const configManager = new ConfigurationManager();
const feedPage = new FeedPage();

fixture`help popup tests`.page(configManager.homePage).beforeEach(async () => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});

test('test if the help popup can be opened from the feedpage by admin', async () => {
  await feedPage.navigateToHelpPopup();
});

// this test may only be run if --disableMultipleWindows is active
test('test if the help popup can be opened from the feedpage by admin and user reference can open', async () => {
  await feedPage.navigateToHelpPopup();
  const helpPopup = new HelpPopup();
  await helpPopup.clickUserReferenceBtn();
}).skip;
