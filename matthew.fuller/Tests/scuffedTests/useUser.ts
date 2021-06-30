import UserPage from "../../PageObjects/user-page";
import { mattUser } from "../../Utilities/roles";
import ConfigurationManager from "../../Configuration/configuration";
import ActivityPage from "../../PageObjects/activity-page";
import util from "../../Utilities/util";
import FeedPage from "../../PageObjects/feed-page";
import { Selector } from "testcafe";
import * as fs from 'fs';
import userObj from "../../PageObjects/PageComponents/userObj";
const feedPage = new FeedPage()
const configManager = new ConfigurationManager()
fixture`Login -> Navigate to new user page`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;
    await t.useRole(t.ctx.user.role);
    await feedPage.navigateToCreateNewUser()
}).afterEach(async t => {

});
//file cannot run and will incorectly identify loginPage not as a constructor if the below is not here
test("can create user with activty author role", async t => {
    let userPage = new UserPage()
    let user = await userPage.testRoleAssignment(["Activity Author"]) as userObj
    user.user.role = null;
    fs.writeFileSync(__dirname + "\\..\\scuffedInfo\\activeUser.json",JSON.stringify(user))
}).skip
test("can login with user from a file", async t => {
    let file = fs.readFileSync(__dirname + "\\..\\scuffedInfo\\activeUser.json")
    await t.expect(file).notEql(null);
    try {
        const data = fs.readFileSync(__dirname + "\\..\\scuffedInfo\\activeUser.json", 'utf8')
        let user = new userObj();
        await user.initaliseUserObjFromObj(JSON.parse(data));
        //await feedPage.signOut();
        await t.useRole(user.user.role);
      } catch (err) {
        console.error(err)
      }
        
})
