import LoginPage from "../PageObjects/login-page";
import ConfigurationManager from "../Configuration/configuration";
import { mattUser } from "../Utilities/roles";

const configManager = new ConfigurationManager();

fixture`My first fixture`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;

    // await t
    //     .setTestSpeed(1);
    // 	.useRole(t.ctx.user.role);
});



test('can successfully login', async t => {
    const loginPage = new LoginPage();
    const feedPage = await loginPage
        .login(t.ctx.user.username, t.ctx.user.password)
    await feedPage.validateInitials();
});

test('cannot login without a username', async t => {
    const loginPage = new LoginPage();
    await loginPage.typePassword(t.ctx.user.password);
    await loginPage.clickSubmit();
    await t.expect(loginPage.checkUsernameValidity()).eql(false);
    await t.expect(loginPage.checkPasswordValidity()).eql(true);
    await t.expect(loginPage.checkSubmitValidity()).eql(true);
});

test('cannot login without a password', async t => {
    const loginPage = new LoginPage();
    await loginPage.typeUsername(t.ctx.user.username);
    await loginPage.clickSubmit();
    await t.expect(loginPage.checkUsernameValidity()).eql(true);
    await t.expect(loginPage.checkPasswordValidity()).eql(false);
    await t.expect(loginPage.checkSubmitValidity()).eql(true);
});

test('cannot login with a non-existent user', async t => {
    const loginPage = new LoginPage();
    await loginPage.typeUsername('i do not exist');
    await loginPage.typePassword(t.ctx.user.password);
    await loginPage.clickSubmit();
    await t.expect(loginPage.checkUsernameValidity()).eql(true);
    await t.expect(loginPage.checkPasswordValidity()).eql(true);
    await t.expect(loginPage.checkSubmitValidity()).eql(false);
});

test('cannot login with an incorrect password', async t => {
    const loginPage = new LoginPage();
    await loginPage.typeUsername(t.ctx.user.username);
    await loginPage.typePassword('wrong password');
    await loginPage.clickSubmit();
    await t.expect(loginPage.checkUsernameValidity()).eql(true);
    await t.expect(loginPage.checkPasswordValidity()).eql(true);
    await t.expect(loginPage.checkSubmitValidity()).eql(false);
});
