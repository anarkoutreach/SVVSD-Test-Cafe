/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { t } from 'testcafe';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import FeedPageAPI from '../api/feedPageAPI';
import APIComment from '../api/calls/comment';
import WorkItemAPI from '../api/workitemAPI';
import APIReply from '../api/calls/reply';
import APIWorkItemCall from '../api/calls/workItem';
import WorkItemProperties from '../api/calls/sub/workitemProperties';
import WorkItemOwners from '../api/calls/sub/workItemOwners';
import WorkItemAssets from '../api/calls/sub/workITemAssets';

const configManager = new ConfigurationManager();

fixture`Feedpage API tests`.page(configManager.serverUrl).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});

// can use the api to post a comment on a set conversation id
test('can post comment through api on fixed conversation id', async (t) => {
  const feedPageAPI = new FeedPageAPI();
  await feedPageAPI.postComment(new APIComment(configManager.userID, configManager.defaultConversationID, 'I was posted by an API'), true);
});

// cannot use the api to post a comment with empty string
test('cannot post comment through api with empty string', async (t) => {
  const feedPageAPI = new FeedPageAPI();
  await feedPageAPI.postComment(new APIComment(configManager.userID, configManager.defaultConversationID, ''), false);
});

// can use the api to get first conversation id
test('can get first conversation through api', async (t) => {
  const feedPageAPI = new FeedPageAPI();
  const id = await feedPageAPI.getFirstConversationID();
});

// can use the api to post a comment
test('can post comment through api on first conversation', async (t) => {
  const feedPageAPI = new FeedPageAPI();
  await feedPageAPI.postComment(new APIComment(configManager.userID, await feedPageAPI.getFirstConversationID(), 'I was posted by an API'), true);
});

// can use the api to post a comment
test('can post reply through api on fixed conversation and comment', async (t) => {
  const feedPageAPI = new FeedPageAPI();
  await feedPageAPI.postReply(new APIReply(configManager.userID, configManager.defaultConversationID, 'I am a reply posted by the API', configManager.parentID), true);
});

// can use the api to get the first 10 conversations for user
test('can get 10 conversations through api', async (t) => {
  const feedPageAPI = new FeedPageAPI();
  const data = await feedPageAPI.getConversations();
  // console.log(data.data);
});

fixture`WorkItem API tests`.page(configManager.serverUrl).beforeEach(async (t) => {
  t.ctx.user = mattUser;
  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});

// can use the api to create work items
test('can create work item through api', async (t) => {
  const workItemAPI = new WorkItemAPI();
  const workitemProperties = new WorkItemProperties('1', '2', true, 3, '4', '5');
  const workitemOweners = new WorkItemOwners([configManager.userID]);
  const workitemAssests = new WorkItemAssets();
  const call = new APIWorkItemCall('baseAPITitle', 'BaseAPIDescription', workitemProperties, workitemOweners, workitemAssests);
  const data = await workItemAPI.createWorkItem(call);
});
