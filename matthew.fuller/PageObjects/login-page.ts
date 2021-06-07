import { Selector, t, ClientFunction } from "testcafe";
import FeedPage from "./feed-page";

class LoginPage {
	/**@description the input for the username field of the login page */
	usernameInput: Selector;
	/**@description the input for the password field of the login page */
	passwordInput: Selector;
	/**@description the button to log in, on the login page */
	loginButton: Selector;
	/**@description a dom element containing initials of the user in the upper right */
	initials: Selector;
	/**@description the add comment button on the feed page */
	addComment: Selector;
	/**@description the add picture button on the feed page */
	addCommentCamera: Selector;
	/**@description the input for a comment */
	addCommentInput: Selector;
	/**@description the button to submit a comment */
	addCommentSubmit: Selector;
	/**@description  capture*/
	addCommentCapture: Selector;
	/**@description the comment text area */
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
	/**
	 * @description login to MBE web with a specific login and passowrd
	 * @param username the username to loging with
	 * @param password the password to login with
	 * @returns a new FeedPage object
	 */
	async login(username, password) {
		await this.typeUsername(username);
		await this.typePassword(password);
		await this.clickSubmit();

		return new FeedPage();
	}
	/**
	 * @description type the username into the username field of MBEweb login page
	 * @param username optional username string
	 * @returns null
	 */
	async typeUsername(username?: string) {	
		if(!username) {
			return;
		}	

		await t.typeText(this.usernameInput, username);
	}
	/**
	 * @description type the password into the password field of MBEweb login page
	 * @param password optional password string
	 * @returns null
	 */
	async typePassword(password?: string) {	
		if(!password) {
			return;
		}	
		
		await t.typeText(this.passwordInput, password);
	}
	/**
	 * @description click the submit button on MBEweb login page
	 */
	async clickSubmit() {
		await t.click(this.loginButton);
	}
}
export default LoginPage as typeof LoginPage & (new () => LoginPage);