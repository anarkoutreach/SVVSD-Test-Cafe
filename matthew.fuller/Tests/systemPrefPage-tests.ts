import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import SystemPrefPage from '../PageObjects/systemPref-page';
/** @description the system preferences page */
const systemPrefPage = new SystemPrefPage();

/** @description A class represnting the controller that handles configs */
const configManager = new ConfigurationManager();
/** @description A class represnting the "feedpage" on MBE-web */
const feedPage = new FeedPage();
fixture`system pref tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});

test('can navigate to system preference page from feed page', async () => {
  await feedPage.navigateToSystemPrefPage();
});
