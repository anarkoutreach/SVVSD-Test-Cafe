import { t } from 'testcafe';
import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import { SysPrefTabs } from '../PageObjects/PageComponents/sytemPrefTABS';
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
  await feedPage.navigateToSystemPrefPage();
});

test('can navigate to system preference page from feed page', async () => {
  // emtpy as to test fixture before each
});

test('can switch between all tabs', async () => {
  const keyArr = Object.keys(SysPrefTabs);
  console.log(keyArr);
  async function _loopThroughTabs() {
    keyArr.forEach(async (key) => {
      await systemPrefPage.switchTab(SysPrefTabs[key]);
    });
  }
  await _loopThroughTabs();
  await _loopThroughTabs();
});
