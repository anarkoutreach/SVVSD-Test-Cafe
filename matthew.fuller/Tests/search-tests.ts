import FeedPage from "../PageObjects/feed-page";
import { mattUser } from "../Utilities/roles";
import ConfigurationManager from "../Configuration/configuration";
import ActivityPage from "../PageObjects/activity-page";
import util from "../Utilities/util";
import userObj from "../PageObjects/PageComponents/userObj";
import { Selector } from "testcafe";
import SearchPage from "../PageObjects/search-page";
import UserPage from "../PageObjects/user-page";
import GroupPage from "../PageObjects/group-page";
const userPage = new UserPage()
const Util = new util;
const feedPage = new FeedPage();
const Rnum = Math.floor(Math.random() * 100);
const activities = new ActivityPage();
import groupObj from "../PageObjects/PageComponents/groupObj";
const groupPage = new GroupPage()
const configManager = new ConfigurationManager();
const serachPage = new SearchPage()
fixture`activity navigation tests`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;
    await t
        .useRole(t.ctx.user.role);
});

test("can navigate to serach tab", async t => {
    await feedPage.naviagteToSearchTab()
});
test("can search text in feedpage and navigate to search tab", async t => {
    await feedPage.naviagteToSearchTab("hello")
});

