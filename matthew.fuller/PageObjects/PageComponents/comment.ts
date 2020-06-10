import { Selector, t } from "testcafe";

export default class Comment {
    self: Selector;
    parentConversation: Selector;
    replyButton: Selector;
    replyCommentInput: Selector;
    replyCommentPostBtn: Selector;

    constructor(selector: Selector, parentConversationSelector: Selector) {
        
        this.parentConversation = parentConversationSelector;
        this.replyButton = Selector ('.reply');
        this.replyCommentInput = Selector ('.reply-comment');
        this.replyCommentPostBtn = Selector ('button.update');
    }

    async addReply(text: string) {
        await t
            .click(this.replyButton)
            .typeText(this.replyCommentInput, text)
            .click(this.replyCommentPostBtn);

        await this.validatePostedTextReply(text);
    }

    async validatePostedTextReply(text: string) {
        const comment = Selector ('div.commentText').withText(text);
        await t
            .expect(comment.exists).eql(true);
    }
}
