import { Selector, t } from "testcafe";

export default class Comment {
    self: Selector;
    parentConversation: Selector;
    replyButton: Selector;
    replyCommentInput: Selector;
    replyCommentPostBtn: Selector;

    constructor(selector: Selector, parentConversationSelector: Selector) {
        this.self = selector;
        this.parentConversation = parentConversationSelector;
        this.replyButton = this.self.find('.reply');
        this.replyCommentInput = this.self.find('.reply-comment');
        this.replyCommentPostBtn = this.self.find('button.update');
    }

    async addReply(text: string) {
        await t
            .click(this.replyButton)
            .typeText(this.replyCommentInput, text)
            .click(this.replyCommentPostBtn);

        await this.validatePostedTextReply(text);
    }

    async validatePostedTextReply(text: string) {
        const comment = this.self.find('div.commentText').withText(text);
        await t
            .expect(comment.exists).eql(true);
    }
}
