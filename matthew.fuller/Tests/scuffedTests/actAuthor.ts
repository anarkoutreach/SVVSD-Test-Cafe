import * as fs from 'fs';
import UserPage from '../../PageObjects/user-page';
import { mattUser } from '../../Utilities/roles';
import ConfigurationManager from '../../Configuration/configuration';
import FeedPage from '../../PageObjects/feed-page';
import userObj from '../../PageObjects/PageComponents/userObj';

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
test('can create user with the specified roles and then save', async () => {
  const userPage = new UserPage();
  try {
    const data = fs.readFileSync(`${__dirname}\\..\\scuffedInfo\\userTypes.json`, 'utf8');
    const userInfo = JSON.parse(data);
    // console.log(userInfo)
    const user = await userPage.testRoleAssignment(userInfo.roles) as userObj;
    user.user.role = null;
    fs.writeFileSync(`${__dirname}\\..\\scuffedInfo\\activeUser.json`, JSON.stringify(user));
  } catch (err) {
    console.log(err);
  }
}).skip;
