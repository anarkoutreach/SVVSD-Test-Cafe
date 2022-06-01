import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import SystemPrefPage from '../PageObjects/systemPref-page';
import SystemPrefPublishingTab from '../PageObjects/PageComponents/systemPreferencesTabsPages/sysPrefPublishingTab';
import Util from '../Utilities/util';

const util = new Util();
const feedPage = new FeedPage();
const systemPrefPublishingTab = new SystemPrefPublishingTab();
const systemPrefPage = new SystemPrefPage();
const configManager = new ConfigurationManager();

fixture`data markings tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;

  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
  await feedPage.navigateToSystemPrefPage();
});

test('Can add new data marking template', async (t) => {
  await feedPage.navigateToSystemPrefPage();
  await t.click(systemPrefPage.publishingTab);
  await t.click(systemPrefPublishingTab.dataMarkingsTemplateSelector);
  await util.forceTypeText('test');
});
