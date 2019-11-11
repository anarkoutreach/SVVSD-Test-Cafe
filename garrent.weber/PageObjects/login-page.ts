import { Selector, t, ClientFunction } from "testcafe";
import FeedPage from "./feed-page";

export default class LoginPage {
	usernameInput: Selector;
	passwordInput: Selector;
	loginButton: Selector;

	constructor() {
		this.usernameInput = Selector("#userLogin");
		this.passwordInput = Selector("#userPassword");
		this.loginButton = Selector("#submit");
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
