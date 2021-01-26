import FeedPage from "../PageObjects/feed-page";
import { mattUser } from "../Utilities/roles";
import ConfigurationManager from "../Configuration/configuration";
import userObj from "../PageObjects/PageComponents/userObj"
import UserPage from "../PageObjects/user-page"
import util from "../Utilities/util";
const userPage = new UserPage()
/**@description A class represnting the controller that handles configs */
const configManager = new ConfigurationManager();
/**@description A class represnting the "feedpage" on MBE-web */
const feedPage = new FeedPage();
fixture`Login -> Navigate to new user page`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;
    await t
        .useRole(t.ctx.user.role);
        feedPage.navigateToCreateNewUser()
});

//test if a the create new user page can be accessed
test('can navigate to user page', async t => {
    //left empty as the fixture will execute this
})
//test if a user can be created
test('can create new user', async t => {
    let Util = new util();
   let user = new userObj();
    await userPage.fillAllFields(user);
    await Util.wait(2000)
    await userPage.pressCreateBtn();
})