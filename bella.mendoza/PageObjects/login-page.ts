import { Selector, t, ClientFunction } from "testcafe";
import FeedPage from "./feed-page";

export default class LoginPage {
	usernameInput: Selector;
	passwordInput: Selector;
	loginButton: Selector;
	initials: Selector;
	addComment: Selector;
	addCommentCamera: Selector;
	addCommentInput: Selector;
	addCommentSubmit: Selector;
	addCommentCapture: Selector;
	commentsTextArea: Selector;

	constructor() {
		this.usernameInput = Selector("#userLogin");
		this.passwordInput = Selector("#userPassword");
		this.loginButton = Selector("#submit");
		this.initials = Selector("#navbarUserInfo .initials");
		this.addComment = Selector('[data-name="ahsmzdfhn"] .addCommentButton');
		this.addCommentCamera = Selector('[data-name="ahsmzdfhn"] .newCommentCameraContainer');
		this.addCommentInput = Selector('[data-name="ahsmzdfhn"] .new-comment');
		this.addCommentSubmit = Selector('[data-name="ahsmzdfhn"] #modifyButtons .btn-primary');
		this.addCommentCapture = Selector('[data-name="ahsmzdfhn"] .fade.in #captureOption');
		this.commentsTextArea = Selector("#comments");
	}

	checkUsernameValidity = ClientFunction(() => {
		var element = (document.querySelector('#userLogin') as HTMLSelectElement);
		return element.checkValidity()
	})

	checkPasswordValidity = ClientFunction(() => {
		var element = (document.querySelector('#userPassword') as HTMLSelectElement);
		return element.checkValidity()
	})

	checkSubmitValidity = ClientFunction(() => {
		var element = (document.querySelector('#submit') as HTMLSelectElement);
		return element.checkValidity()
	})

	async login(username, password) {
		await this.typeUsername(username);
		await this.typePassword(password);
		await this.clickSubmit();

		return new FeedPage();
	}

	async typeUsername(username?: string) {	
		if(!username) {
			return;
		}	

		await t.typeText(this.usernameInput, username);
	}

	async typePassword(password?: string) {	
		if(!password) {
			return;
		}	
		
		await t.typeText(this.passwordInput, password);
	}

	async clickSubmit() {
		await t.click(this.loginButton);
	}
}
