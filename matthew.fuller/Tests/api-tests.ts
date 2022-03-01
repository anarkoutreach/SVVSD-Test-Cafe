/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { t } from 'testcafe';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import FeedPageAPI from '../api/feedPage';
import APIComment from '../api/calls/comment';

const configManager = new ConfigurationManager();

fixture`Base API tests`.page(configManager.serverUrl).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});

// can use the api to post a comment
test('can post comment through api', async (t) => {
  const feedPageAPI = new FeedPageAPI();
  await feedPageAPI.postComment(new APIComment(configManager.userID, configManager.randomConversationID, 'I was posted by an API'));
});
