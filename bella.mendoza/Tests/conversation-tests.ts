import FeedPage from "../PageObjects/feed-page";
import { axelUser, lukeUser } from "../Utilities/roles";

fixture`My first fixture`.page(`http://192.168.0.171/feed`).beforeEach(async t => {
    t.ctx.user = axelUser;

    await t
        .useRole(t.ctx.user.role);
});

const feedPage = new FeedPage();

test('can add comment', async t => {
    const conversation = feedPage.getFirstConversation();
    await conversation.addComment('efgh');
});

test('can add reply', async t => {
    const conversation = feedPage.getFirstConversation();
    const commentText = 'abcd';
    const comment = await conversation.addComment(commentText);
    await comment.addReply('lmnop');
});
