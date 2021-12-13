/* eslint-disable no-restricted-syntax */
import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import UserObj from '../PageObjects/PageComponents/userObj';
import UserPage from '../PageObjects/user-page';
import Util from '../Utilities/util';
import { roles } from '../PageObjects/PageComponents/roles';

const util = new Util();
const userPage = new UserPage();
/** @description A class represnting the controller that handles configs */
const configManager = new ConfigurationManager();
/** @description A class represnting the "feedpage" on MBE-web */
const feedPage = new FeedPage();
fixture`user creation tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
  await feedPage.navigateToCreateNewUser();
}).afterEach(async () => {

});

// test if a the create new user page can be accessed
test('can navigate to user page', async () => {
  // left empty as the fixture will execute this
});
// test if a user can be created
test('can create new user', async () => {
  const user = new UserObj();
  await userPage.fillAllFields(user);
  await userPage.pressCreateBtn();
});
// test if a user can be created then logged into MBE web as
test('can create and login to new user', async (t) => {
  const user = new UserObj();
  await userPage.fillAllFields(user);
  await userPage.pressCreateBtn();
  await t
    .setNativeDialogHandler(() => true)
    .useRole(user.user.role);
  await feedPage.verifyUserAndRoles(user);
});
// test if a duplicate user can be created by creating a user, then trying to create it again
test('users with the same loginId cannot be created', async (t) => {
  const user = new UserObj();
  await userPage.fillAllFields(user);
  await userPage.pressCreateBtn();
  await feedPage.navigateToCreateNewUser();
  await userPage.fillAllFields(user);
  await userPage.pressCreateBtn();
  const errors = await userPage.checkErrorsOnPage();
  await t.expect(errors.includes('loginIdExists')).eql(true);
});
// test if users with identical information except login Id can be created
test('users with identical information except login id can be created', async (t) => {
  const user = new UserObj();
  await userPage.fillAllFields(user);
  await userPage.pressCreateBtn();
  await feedPage.navigateToCreateNewUser();
  const user2 = user;
  user2.loginId = await util.randChar(25);
  await userPage.fillAllFields(user2);
  await userPage.pressCreateBtn();
  const errors = await userPage.checkErrorsOnPage();
  // console.log(errors)
  await t.expect(errors.includes('loginIdExists')).eql(false);
});
// users require proper emails, with an @ symbol, test if that works
test('can a user with an email that does not have an @ symbol be created', async (t) => {
  const user = new UserObj();
  user.email = 'emailWithoutAtSymbol';
  await userPage.fillAllFields(user);
  await userPage.pressCreateBtn();
  const errors = await userPage.checkErrorsOnPage();
  await t.expect(errors.includes('invalidEmail')).eql(true);
});
// users require proper emails, check if script tags are allowed
test('can a user with an email that has script tags be created @ symbol be created', async (t) => {
  const user = new UserObj();
  user.email = 'emailwith<script></script>tags@hacker.haking';
  await userPage.fillAllFields(user);
  await userPage.pressCreateBtn();
  const errors = await userPage.checkErrorsOnPage();
  await t.expect(errors.includes('invalidEmail')).eql(true);
});
// users require proper emails, check if parenthesis are allowed
test('can a user with an email that has parenthesis be created @ symbol be created', async (t) => {
  const user = new UserObj();
  user.email = 'emailwith()@hacker.haking';
  await userPage.fillAllFields(user);
  await userPage.pressCreateBtn();
  const errors = await userPage.checkErrorsOnPage();
  await t.expect(errors.includes('invalidEmail')).eql(true);
});

fixture`user creation tests --that should be skiped usually`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
}).afterEach(async () => {

});

test('test used to create and save users for use by other tests (should be skipped unless the users need to be remade for some reason', async () => {
  const powerset = (array) => { // O(2^n)
    const results = [[]];
    for (const value of array) {
      const copy = [...results]; // See note below.
      for (const prefix of copy) {
        results.push(prefix.concat(value));
      }
    }
    return results;
  };

  async function _createUser(userRoles, name = null) {
    const user = new UserObj();
    if (name === null) {
      const tempName = await JSON.stringify(await userRoles.join(''));
      user.loginId = `${tempName}user`;
    } else {
      user.loginId = name;
    }
    user.password = 'AutoPassword';
    // await userPage.testRoleAssignment(userRoles, user);
    return user;
  }
  const everyCombination = powerset([roles.ACTIVITYAUTHOR, roles.ADMIN, roles.CONTENTAUTHOR,
    roles.VIEWER, roles.WIAUTHOR, roles.WIEXECUTOR, roles.WIMANAGER]);

  // eslint-disable-next-line prefer-const
  let allUsers: UserObj[] = [];
  everyCombination.forEach(async (comb) => {
    const thisUser = await _createUser(comb);
    allUsers.push(thisUser);
  });
  console.log(allUsers);
});
