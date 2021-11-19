import { Selector, t } from 'testcafe';
import ConfigurationManager from '../Configuration/configuration';
import AccountPage from '../PageObjects/acount-page';
import SharedElements from '../PageObjects/sharedElements';
import { mattUser } from '../Utilities/roles';
import Util from '../Utilities/util';

const configManager = new ConfigurationManager();

fixture`acounts`.page(configManager.homePage).beforeEach(async () => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});
test('check slider value', async () => {
  const accountPage = new AccountPage();
  const sharedElements = new SharedElements();
  await accountPage.navigateFromHomeToAccountPage();
  await sharedElements.testCheckboxes(
    accountPage.emailNotificationSwitch,
    accountPage.emailNotificationSwitchInput,
    true,
  );
});

test('check improper email error msg displays', async () => {
  const util = new Util();
  const accountPage = new AccountPage();
  await accountPage.navigateFromHomeToAccountPage();
  await util.CtlADelete(Selector('#formHorizontalEmail'));
  const errorSelector = Selector('span.error.formHorizontalEmail.active');
  await accountPage.checkErrorMsg(errorSelector, 'email');
});

test('check no name error msg displays', async () => {
  const util = new Util();
  const accountPage = new AccountPage();
  await accountPage.navigateFromHomeToAccountPage();
  await util.CtlADelete(Selector('#formHorizontalName'));
  const errorSelector = Selector('span.error.formHorizontalName.active');
  await accountPage.checkErrorMsg(errorSelector, 'email');
});
