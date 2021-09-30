import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';

import Util from '../Utilities/util';

const configManager = new ConfigurationManager();

fixture`Log in to MBEweb`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;

  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});
const util = new Util();
const feedPage = new FeedPage();
const Rnum = Math.floor(Math.random() * 100) + 5;// cannot be zero, causes error
test('can add comment', async () => {
  const conversation = feedPage.getFirstConversation();
  await conversation.addComment(`Can add comment: ${util.randChar(Rnum)}`);
});

// Can cancel out of a comment in turn not postin the comment
test('can cancel comment', async () => {
  const conversation = feedPage.getFirstConversation();
  await conversation.cancelComment(`Can cancel comment: ${util.randChar(Rnum)}`);
});

// can cancel one comment then post a new comment
test('can cancel comment then post a new one', async () => {
  const conversation = feedPage.getFirstConversation();
  await conversation.cancelCommentThenPost(util.randChar(Rnum), `Cancel Then Post: ${util.randChar(Rnum)}`);
});

// posts a comment then replies to the comment ensuring that user can reply
test('can add reply', async () => {
  const conversation = feedPage.getFirstConversation();
  const commentText = `Comment to reply to: ${util.randChar(Rnum)}`;
  const comment = await conversation.addComment(commentText);
  await comment.addReply(`can reply to comment: ${util.randChar(Rnum)}`);
});

test('can post a comment after declining the cancel confirmation check', async () => {
  const conversation = feedPage.getFirstConversation();
  await conversation.commentAfterDeclinedCancel(`comment after declining cancel confermation check${util.randChar(Rnum)}`);
});
