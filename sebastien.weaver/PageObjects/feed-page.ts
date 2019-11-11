import { Selector, t } from "testcafe";
import Conversation from "./PageComponents/conversation"

export default class FeedPage {
	userInitialsIcon: Selector;
	firstConversation: Selector;
	firstAddCommentBtn: any;
	firstAddCommentSubmitBtn: any;
	firstAddCommentInput: any;
	addCommentCamera: Selector;
	addCommentCapture: Selector;
	commentsTextArea: Selector;

	constructor() {
		this.userInitialsIcon = Selector("#navbarUserInfo .initials");
		this.firstConversation = Selector('.newsItem[data-name]');
		this.firstAddCommentBtn = this.firstConversation.find('.addCommentButton');
		this.firstAddCommentSubmitBtn = this.firstConversation.find('#modifyButtons .btn-primary');
		this.firstAddCommentInput = this.firstConversation.find('.new-comment');
		this.firstAddCommentSubmitBtn = Selector('[data-name="ahsmzdfhn"] #modifyButtons .btn-primary');
		this.addCommentCamera = Selector('[data-name="ahsmzdfhn"] .newCommentCameraContainer');
		this.addCommentCapture = Selector('[data-name="ahsmzdfhn"] .fade.in #captureOption');
		this.commentsTextArea = Selector("#comments");
	}

	async addCommentToFirstConversation(text) {
		let firstConversation = new Conversation(this.firstConversation);

		await firstConversation
			.addComment(text);
	}

	getFirstConversation(): Conversation {
		return new Conversation(this.firstConversation);
	}

	async validateInitials() {
		await t.
			expect(this.userInitialsIcon.textContent).eql(t.ctx.user.initials);
	}

	async search(searchText?: string) {

	}
}
