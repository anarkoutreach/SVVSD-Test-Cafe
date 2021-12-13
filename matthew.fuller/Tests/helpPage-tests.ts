import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import FeedPage from '../PageObjects/feed-page';

const configManager = new ConfigurationManager();
const feedPage = new FeedPage();

fixture`help popup tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});

test('test if the help popup can be opened from the feedpage by admin', async () => {
  await feedPage.navigateToHelpPopup();
});
