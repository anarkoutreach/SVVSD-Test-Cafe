import { t, Selector } from "testcafe";
import Comment from "./comment";
import Alerts from "../Alerts";


export default class Conversation {
    userInitialsIcon: Selector;
    firstConversation: Selector;
    addCommentBtn: any;
    getCancelBtn: any;
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
        this.getCancelBtn = this.self.find('#modifyButtons .btn-warning')
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
    

   
    async cancelComment (text: string) {
        const alerts = new Alerts();
        await t
            .click(this.addCommentBtn)
            .typeText(this.addCommentInput, text)
            .click(this.getCancelBtn)
            .click(alerts.getGenericConfirmBtn)
            //ensure comment button is visable there by ensureing that the comment has been canceled.
            .expect(this.addCommentBtn.visible).eql(true);
    }
    async commentAfterDeclinedCancel (text: string) {
        const alerts = new Alerts();
        await t
            .click(this.addCommentBtn)
            .typeText(this.addCommentInput, text)
            .click(this.getCancelBtn)
            .expect(alerts.getGenericCancelBtn.exists).ok('this should pass')
            .click(alerts.getGenericCancelBtn)
            .click(this.addCommentSubmitBtn);
            
            return await this.validatePostedTextComment(text);
    }
    async cancelCommentThenPost (flasetext: string, truetext: string) {
        const alerts = new Alerts();
        await t
            .click(this.addCommentBtn)
            .typeText(this.addCommentInput, flasetext)
            .click(this.getCancelBtn)
            .click(alerts.getGenericConfirmBtn)
            .click(this.addCommentBtn)
            .typeText(this.addCommentInput, truetext)
            .click(this.addCommentSubmitBtn)

            return await this.validatePostedTextComment(truetext);
    }
    private async validatePostedTextComment(text: string) {
        const commentSelector = Selector ('div.commentText').withText(text).parent('.commentsTable');
        const comment = new Comment(commentSelector, this.self);
        await t
            .expect(commentSelector.exists).eql(true);

        return comment;
    }


        

}
