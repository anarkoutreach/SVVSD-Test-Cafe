import FeedPage from "../PageObjects/feed-page";
import { mattUser } from "../Utilities/roles";
import ConfigurationManager from "../Configuration/configuration";

import util from "../Utilities/util";

const configManager = new ConfigurationManager();

fixture`Log in to MBEweb`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;

    await t
        .useRole(t.ctx.user.role);
});
const Util = new util;
const feedPage = new FeedPage();
const Rnum = Math.floor(Math.random() * 100);
test('can add comment', async t => {
    const conversation = feedPage.getFirstConversation();
    await conversation.addComment('Can add comment: ' + Util.randchar(Rnum));
});

//Can cancel out of a comment in turn not postin the comment
test('can cancel comment', async t => {
    const conversation = feedPage.getFirstConversation();
    await conversation.cancelComment('Can cancel comment: ' + Util.randchar(Rnum));

});

//can cancel one comment then post a new comment
test('can cancel comment then post a new one', async t => {
    const conversation = feedPage.getFirstConversation();
    await conversation.cancelCommentThenPost(Util.randchar(Rnum), 'Cancel Then Post: ' + Util.randchar(Rnum))

});

//posts a comment then replies to the comment ensuring that user can reply
test('can add reply', async t => {
    const conversation = feedPage.getFirstConversation();
    const commentText = 'Comment to reply to: ' + Util.randchar(Rnum);
    const comment = await conversation.addComment(commentText);
    await comment.addReply('can reply to comment: ' + Util.randchar(Rnum));
});

test('can post a comment after declining the cancel confirmation check', async t =>{
    const conversation = feedPage.getFirstConversation();
    await conversation.commentAfterDeclinedCancel('comment after declining cancel confermation check' + Util.randchar(Rnum))
});



