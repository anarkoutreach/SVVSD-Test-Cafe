import { Selector, t } from "testcafe";
import { MbewebPage } from "./Abstract/MbewebPage";

export default class UserPage extends MbewebPage {
	manageUserAppContainer: Selector;

	constructor() {
		super("User Page");
		this.manageUserAppContainer = Selector('#manageUserApp');
	}

	async validatePageLoad() {
		await t.expect(this.manageUserAppContainer.exists).eql(true);
	}

	async setName(name: string): Promise<UserPage> {
		return Promise.resolve(this);
	}
}