import { Selector, t } from 'testcafe';
import ConfigurationManager from '../Configuration/configuration';
import SharedElements from '../PageObjects/sharedElements';
import { mattUser } from '../Utilities/roles';
import Util from '../Utilities/util';

const configManager = new ConfigurationManager();

fixture`acounts`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});

test('check improper email error msg displays', async () => {
  const util = new Util();
  const sharedElements = new SharedElements();
  await t
    .click(sharedElements.userIcon)
    .click(await sharedElements.findGenericDropdownSelector('account'));
  await util.CtlADelete(Selector('#formHorizontalEmail'));

  const errorSelector = Selector('span.error.formHorizontalEmail.active');
  await t.expect(errorSelector.exists).eql(true)
    .expect(await (await errorSelector.innerText).includes('email'));
});
