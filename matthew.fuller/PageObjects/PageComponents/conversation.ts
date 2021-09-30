import { t, Selector } from 'testcafe';
import Comment from './comment';
import Alerts from '../Alerts';

export default class Conversation {
    userInitialsIcon: Selector;

    firstConversation: Selector;

    addCommentBtn: any;

    getCancelBtn: any;

    addCommentSubmitBtn: Selector;

    addCommentInput: Selector;

    addCommentCamera: Selector;

    addCommentCapture: Selector;

    commentsTextArea: Selector;

    self: Selector;

    addCommentUpload: Selector;

    constructor(selector: Selector) {
      this.self = selector;
      this.addCommentBtn = Selector('button.addCommentButton');
      this.getCancelBtn = Selector('button.cancel.btn.btn-default');
      this.addCommentSubmitBtn = Selector('button.update.btn.btn-primary');
      this.addCommentInput = Selector('#new-comment');
      this.addCommentCamera = Selector('.newCommentCameraContainer');
      this.addCommentCapture = Selector('fade.in #captureOption');
      this.addCommentUpload = Selector('fade.in #uploadOption');
    }

    /** @description probably not needed */
    async getCommentInput() {
      return this.addCommentInput.filterVisible();
    }

    async addComment(text: string) {
      await t
        .click(this.addCommentBtn)
        .typeText(await this.getCommentInput(), text)
        .click(this.addCommentSubmitBtn);

      return this.validatePostedTextComment(text);
    }

    async cancelComment(text: string) {
      const alerts = new Alerts();
      await t
        .click(this.addCommentBtn)
        .typeText(await this.getCommentInput(), text)
        .click(this.getCancelBtn)
        .click(alerts.getGenericConfirmBtn)
      // ensure comment button is visable there by ensureing that the comment has been canceled.
        .expect(this.addCommentBtn.visible)
        .eql(true);
    }

    async commentAfterDeclinedCancel(text: string) {
      const alerts = new Alerts();
      await t
        .click(this.addCommentBtn)
        .typeText(await this.getCommentInput(), text)
        .click(this.getCancelBtn)
        .expect(alerts.getGenericCancelBtn.exists)
        .ok('this should pass')
        .click(alerts.getGenericCancelBtn)
        .click(this.addCommentSubmitBtn);

      return this.validatePostedTextComment(text);
    }

    async cancelCommentThenPost(flasetext: string, truetext: string) {
      const alerts = new Alerts();
      await t
        .click(this.addCommentBtn)
        .typeText(await this.getCommentInput(), flasetext)
        .click(this.getCancelBtn)
        .click(alerts.getGenericConfirmBtn)
        .click(this.addCommentBtn)
        .typeText(await this.getCommentInput(), truetext)
        .click(this.addCommentSubmitBtn);

      return this.validatePostedTextComment(truetext);
    }

    private async validatePostedTextComment(text: string) {
      const commentSelector = Selector('.commentTextareaAndCameraContainer').withText(text);
      const comment = new Comment(commentSelector, this.self);
      await t
        .expect(commentSelector.exists).eql(true);

      return comment;
    }
}
