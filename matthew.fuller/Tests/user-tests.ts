import FeedPage from "../PageObjects/feed-page";
import { mattUser } from "../Utilities/roles";
import ConfigurationManager from "../Configuration/configuration";
import userObj from "../PageObjects/PageComponents/userObj"
import UserPage from "../PageObjects/user-page"
import util from "../Utilities/util";
let Util = new util()
const userPage = new UserPage()
/**@description A class represnting the controller that handles configs */
const configManager = new ConfigurationManager();
/**@description A class represnting the "feedpage" on MBE-web */
const feedPage = new FeedPage();
fixture`Login -> Navigate to new user page`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;
    await t.useRole(t.ctx.user.role);
    await feedPage.navigateToCreateNewUser()
}).afterEach(async t => {

});

//test if a the create new user page can be accessed
test('can navigate to user page', async t => {
    //left empty as the fixture will execute this
})
//test if a user can be created
test('can create new user', async t => {
   let user = new userObj();
    await userPage.fillAllFields(user);
    await userPage.pressCreateBtn();
});
//test if a user can be created then logged into MBE web as
test('can create and login to new user', async t => {
    let user = new userObj();
     await userPage.fillAllFields(user);
     await userPage.pressCreateBtn();
     await t.useRole(user.user.role);
     await feedPage.verifyUserAndRoles(user);
 });
//test if a duplicate user can be created by creating a user, then trying to create it again
test('users with the same loginId cannot be created', async t => {
    let user = new userObj();
    await userPage.fillAllFields(user);
    await userPage.pressCreateBtn();
    await feedPage.navigateToCreateNewUser()
    await userPage.fillAllFields(user);
    await userPage.pressCreateBtn();
    let errors = await userPage.checkErrorsOnPage();
    await t.expect(errors.includes("loginIdExists")).eql(true)
}).only