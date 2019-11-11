import { t } from "testcafe";
import Comment from "./comment";

export default class Conversation {
    userInitialsIcon: Selector;
    firstConversation: Selector;
    addCommentBtn: any;
    addCommentSubmitBtn: any;
    addCommentInput: any;
    addCommentCamera: Selector;
    addCommentCapture: Selector;
    commentsTextArea: Selector;
    self: Selector;
    addCommentUpload: Selector;

    constructor(selector: Selector) {
        this.self = selector;
        this.addCommentBtn = this.self.find('.addCommentButton');
        this.addCommentSubmitBtn = this.self.find('#modifyButtons .btn-primary');
        this.addCommentInput = this.self.find('.new-comment');
        this.addCommentCamera = this.self.find('.newCommentCameraContainer');
        this.addCommentCapture = this.self.find('fade.in #captureOption');
        this.addCommentUpload = this.self.find('fade.in #uploadOption');
    }

    async addComment(text: string) {
        await t
            .click(this.addCommentBtn)
            .typeText(this.addCommentInput, text)
            .click(this.addCommentSubmitBtn);

        return await this.validatePostedTextComment(text);
    }

    private async validatePostedTextComment(text: string) {
        const commentSelector = this.self.find('div.commentText').withText(text).parent('.commentsTable');
        const comment = new Comment(commentSelector, this.self);
        await t
            .expect(commentSelector.exists).eql(true);

        return comment;
    }
}
