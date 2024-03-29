import * as fs from 'fs';
import UserPage from '../../PageObjects/user-page';
import { mattUser } from '../../Utilities/roles';
import ConfigurationManager from '../../Configuration/configuration';
import FeedPage from '../../PageObjects/feed-page';
import UserObj from '../../PageObjects/PageComponents/userObj';

const feedPage = new FeedPage();
const configManager = new ConfigurationManager();
fixture`scuffed multi user tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
  await feedPage.navigateToCreateNewUser();
}).afterEach(async () => {

});
// file cannot run and will incorectly identify loginPage
// not as a constructor if the below is not here
test('can create user with activty author role', async () => {
  const userPage = new UserPage();
  const user = await userPage.testRoleAssignment(['Activity Author']) as UserObj;
  user.user.role = null;
  fs.writeFileSync(`${__dirname}\\..\\scuffedInfo\\activeUser.json`, JSON.stringify(user));
}).skip;
test('can login with user from a file', async (t) => {
  const file = fs.readFileSync(`${__dirname}\\..\\scuffedInfo\\activeUser.json`);
  await t.expect(file).notEql(null);
  try {
    const data = fs.readFileSync(`${__dirname}\\..\\scuffedInfo\\activeUser.json`, 'utf8');
    const user = new UserObj();
    await user.initaliseUserObjFromObj(JSON.parse(data));
    // await feedPage.signOut();
    await t
      .setNativeDialogHandler(() => true)
      .useRole(user.user.role);
  } catch (err) {
    console.error(err);
  }
});
