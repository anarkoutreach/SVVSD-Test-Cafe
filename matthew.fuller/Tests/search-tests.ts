import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import SearchPage from '../PageObjects/search-page';
import { tabs } from '../PageObjects/PageComponents/tabs';

const feedPage = new FeedPage();
const configManager = new ConfigurationManager();
const searchPage = new SearchPage();
/** @description execute before every test: loging into mbe web */
fixture`search tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});
/** @description navigate to search tab from feed page by
 * searching an empty string and verify that the content tab loads as the default active tab */
test('content tab loads as default active tab on search page', async (t) => {
  await feedPage.naviagteToSearchTab();
  const activeTab = await searchPage.getActiveTab();
  await t.expect(activeTab.toLocaleLowerCase().includes('content'.toLocaleLowerCase())).eql(true);
});

/** @description navigate to search tab from feed page by searching an empty string */
test('can navigate to serach tab', async () => {
  await feedPage.naviagteToSearchTab();
});

/** @description navigate to search page by saeraching a non-empty string */
test('can search text in feedpage and navigate to search tab', async () => {
  await feedPage.naviagteToSearchTab('hello');
});

/** @description navigate to the groups tab of the search page by searching an empty string */
test('can navigate to the groups tab of the search page by searching an empty string', async () => {
  await feedPage.SearchFor(' ', tabs.GROUPS);
  // no farther verification is needed as the above function
  // already verifies if the switch to a specific tab was successfully completed
  // let bannerText = await searchPage.getBannerText()
});

/** @description navigate to the groups tab of the search page by searching a non-empty string */
test('can navigate to the groups tab of the search page by searching a non-empty string', async () => {
  await feedPage.SearchFor('test', tabs.GROUPS);
  // no farther verification is needed as the above function already
  // verifies if the switch to a specific tab was successfully completed
});

/** @description navigate to the WI tab of the search page by searching an empty string */
test('can navigate to the WI tab of the search page by searching an empty string', async () => {
  await feedPage.SearchFor(' ', tabs.WORKITEMS);
  // no farther verification is needed as the above function already verifies
  // if the switch to a specific tab was successfully completed
  // let bannerText = await searchPage.getBannerText()
});
/** @description navigate to the WI tab of the search page by searching a non-empty string */
test('can navigate to the WI tab of the search page by searching a non-empty string', async () => {
  await feedPage.SearchFor('test', tabs.WORKITEMS);
  // no farther verification is needed as the above function
  // already verifies if the switch to a specific tab was successfully completed
});

/** @description navigate to the Users tab of the search page by searching an empty string */
test('can navigate to the Users tab of the search page by searching an empty string', async () => {
  await feedPage.SearchFor(' ', tabs.USERS);
  // no farther verification is needed as the above function
  // already verifies if the switch to a specific tab was successfully completed
  // let bannerText = await searchPage.getBannerText()
});
/** @description navigate to the Users tab of the search page by searching a non-empty string */
test('can navigate to the Users tab of the search page by searching a non-empty string', async () => {
  await feedPage.SearchFor('test', tabs.USERS);
  // no farther verification is needed as the above function already
  // verifies if the switch to a specific tab was successfully completed
});

/** @description navigate to the Templates tab of the search page by searching an empty string */
test('can navigate to the Templates tab of the search page by searching an empty string', async () => {
  await feedPage.SearchFor(' ', tabs.TEMPLATES);
  // no farther verification is needed as the above function already verifies
  // if the switch to a specific tab was successfully completed
  // let bannerText = await searchPage.getBannerText()
});
/** @description navigate to the Templates tab of the search page by searching a non-empty string */
test('can navigate to the Templates tab of the search page by searching a non-empty string', async () => {
  await feedPage.SearchFor('test', tabs.TEMPLATES);
  // no farther verification is needed as the above function already verifies
  // if the switch to a specific tab was successfully completed
});

/** @description navigate to the ACLs tab of the search page by searching an empty string */
test('can navigate to the ACLs tab of the search page by searching an empty string', async () => {
  await feedPage.SearchFor(' ', tabs.ACLIST);
  // no farther verification is needed as the above function
  // already verifies if the switch to a specific tab was successfully completed
  // let bannerText = await searchPage.getBannerText()
});
/** @description navigate to the ACLs tab of the search page by searching a non-empty string */
test('can navigate to the ACLs tab of the search page by searching a non-empty string', async () => {
  await feedPage.SearchFor('test', tabs.ACLIST);
  // no farther verification is needed as the above function already
  // verifies if the switch to a specific tab was successfully completed
});
