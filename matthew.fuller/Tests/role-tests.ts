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

 //test if a the create button displays for a user that only has the viewer role (it should not)
 test('test if the create button displays for a user that only has the viewer role', async t => {
    await userPage.testRoleAssignment(["Viewer"])
 });
 //test if a the create button displays for a user that only has the activity author role
 test('test if the create button displays for a user that only has the activity author role', async t => {
    await userPage.testRoleAssignment(["Activity Author"])
 });
  //test if a the create button displays for a user that only has the activity author role and viewer
  test('test if the create button displays for a user that only has the activity author role and viewer role', async t => {
    await userPage.testRoleAssignment(["Activity Author","Viewer"])
 });
  //test if a the create button displays for a user that only has the activity author role and viewer and content author
  test('test if the create button displays for a user that only has the activity author role and viewer role and content author role', async t => {
    await userPage.testRoleAssignment(["Activity Author","Viewer", "Content Author"])
 });
  //test if a the create button displays for a user that only has the Content Author role
  test('test if the create button displays for a user that only has the Content Author role', async t => {
    await userPage.testRoleAssignment(["Content Author"])
 });
  //test if a the create button displays for a user that only has the Content Author role and viewer role
  test('test if the create button displays for a user that only has the Content Author role and viewer role', async t => {
    await userPage.testRoleAssignment(["Content Author", "Viewer"])
 });
   //test if a the create button displays for a user that only has the Content Author role and viewer role and work item author role
   test('test if the create button displays for a user that only has the Content Author role and viewer role and work item author role', async t => {
    await userPage.testRoleAssignment(["Content Author", "Viewer", "Work Item Author"])
 });
  //test if a the create button displays for a user that only has the Work Item Author role
  test('test if the create button displays for a user that only has the Work Item Author role', async t => {
    await userPage.testRoleAssignment(["Work Item Author"])
 });
   //test if a the create button displays for a user that has the Work Item Author role and the Viewer role
   test('test if the create button displays for a user that only has the Work Item Author role and viewer role', async t => {
    await userPage.testRoleAssignment(["Work Item Author", "Viewer"])
 });
    //test if a the create button displays for a user that has the Work Item Author role and the Viewer role and the Activity Author Role
    test('test if the create button displays for a user that only has the Work Item Author role and viewer role and activity author role', async t => {
        await userPage.testRoleAssignment(["Work Item Author", "Viewer", "Activity Author"])
 });
  //test if a the create button displays for a user that has the Work Item Author role and the Viewer role and the Activity Author Role and Content Author
  test('test if the create button displays for a user that only has the Work Item Author role and viewer role and activity author role and content author role', async t => {
    await userPage.testRoleAssignment(["Work Item Author", "Viewer", "Activity Author", "Content Author"])
});
