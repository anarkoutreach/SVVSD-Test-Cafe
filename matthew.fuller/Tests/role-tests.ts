import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import UserPage from '../PageObjects/user-page';

const userPage = new UserPage();
/** @description A class represnting the controller that handles configs */
const configManager = new ConfigurationManager();
/** @description A class represnting the "feedpage" on MBE-web */
const feedPage = new FeedPage();
fixture`new user page navigation tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});
// test if the new user page can be navigated to by the user
// (clicking buttons rather than url switching)
test('test if the create button displays for a user that only has the viewer role', async () => {
  await feedPage.navigateToCreateNewUser();
});

fixture`user tests with url hop`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
  await feedPage.switchToCreateNewUser();
});
// test if a the create button displays for a user that only has the viewer role (it should not)
test('test if the create button displays for a user that only has the viewer role', async () => {
  await userPage.testRoleAssignment(['Viewer']);
});
// test if a the create button displays for a user that only has the activity author role
test('test if the create button displays for a user that only has the activity author role', async () => {
  await userPage.testRoleAssignment(['Activity Author']);
});
// test if a the create button displays for a user that only has the activity author role and viewer
test('test if the create button displays for a user that only has the activity author role and viewer role', async () => {
  await userPage.testRoleAssignment(['Activity Author', 'Viewer']);
});
// test if a the create button displays for a user
// that only has the activity author role and viewer and content author
test('test if the create button displays for a user that only has the activity author role and viewer role and content author role', async () => {
  await userPage.testRoleAssignment(['Activity Author', 'Viewer', 'Content Author']);
});
// test if a the create button displays for a user that only has the Content Author role
test('test if the create button displays for a user that only has the Content Author role', async () => {
  await userPage.testRoleAssignment(['Content Author']);
});
// test if a the create button displays for a user that
// only has the Content Author role and viewer role
test('test if the create button displays for a user that only has the Content Author role and viewer role', async () => {
  await userPage.testRoleAssignment(['Content Author', 'Viewer']);
});
// test if a the create button displays for a user that
// only has the Content Author role and viewer role and work item author role
test('test if the create button displays for a user that only has the Content Author role and viewer role and work item author role', async () => {
  await userPage.testRoleAssignment(['Content Author', 'Viewer', 'Work Item Author']);
});
// test if a the create button displays for a user that only has the Work Item Author role
test('test if the create button displays for a user that only has the Work Item Author role', async () => {
  await userPage.testRoleAssignment(['Work Item Author']);
});
// test if a the create button displays for a user that has
// the Work Item Author role and the Viewer role
test('test if the create button displays for a user that only has the Work Item Author role and viewer role', async () => {
  await userPage.testRoleAssignment(['Work Item Author', 'Viewer']);
});
// test if a the create button displays for a user that has the Work Item Author role
// and the Viewer role and the Activity Author Role
test('test if the create button displays for a user that only has the Work Item Author role and viewer role and activity author role', async () => {
  await userPage.testRoleAssignment(['Work Item Author', 'Viewer', 'Activity Author']);
});
// test if a the create button displays for a user that has
// the Work Item Author role and the Viewer role and the Activity Author Role and Content Author
test('test if the create button displays for a user that only has the Work Item Author role and viewer role and activity author role and content author role', async () => {
  await userPage.testRoleAssignment(['Work Item Author', 'Viewer', 'Activity Author', 'Content Author']);
});
