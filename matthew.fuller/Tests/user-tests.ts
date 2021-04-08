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
})
//test if users with identical information except login Id can be created
test('users with identical information except login id can be created', async t => {
    let user = new userObj();
    await userPage.fillAllFields(user);
    await userPage.pressCreateBtn();
    await feedPage.navigateToCreateNewUser()
    let user2 = user;
    user2.loginId = await Util.randchar(25)
    await userPage.fillAllFields(user2);
    await userPage.pressCreateBtn();
    let errors = await userPage.checkErrorsOnPage();
    //console.log(errors)
    await t.expect(errors.includes("loginIdExists")).eql(false)
});
//users require proper emails, with an @ symbol, test if that works
test('can a user with an email that does not have an @ symbol be created', async t => {
    let user = new userObj();
    user.email ="emailWithoutAtSymbol"
    await userPage.fillAllFields(user);
    await userPage.pressCreateBtn();
    let errors = await userPage.checkErrorsOnPage();
    await t.expect(errors.includes("invalidEmail")).eql(true)
});
//users require proper emails, check if script tags are allowed
test('can a user with an email that has script tags be created @ symbol be created', async t => {
    let user = new userObj();
    user.email ="emailwith<script></script>tags@hacker.haking"
    await userPage.fillAllFields(user);
    await userPage.pressCreateBtn();
    let errors = await userPage.checkErrorsOnPage();
    await t.expect(errors.includes("invalidEmail")).eql(true)
});
//users require proper emails, check if parenthesis are allowed
test('can a user with an email that has parenthesis be created @ symbol be created', async t => {
    let user = new userObj();
    user.email ="emailwith()@hacker.haking"
    await userPage.fillAllFields(user);
    await userPage.pressCreateBtn();
    let errors = await userPage.checkErrorsOnPage();
    await t.expect(errors.includes("invalidEmail")).eql(true)
});



