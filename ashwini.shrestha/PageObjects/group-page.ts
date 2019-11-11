import { Selector, t } from "testcafe";
import { MbewebPage } from "./Abstract/MbewebPage";

export default class GroupPage extends MbewebPage {
	manageGroupAppContainer: Selector;

	constructor() {
		super('Group Page');
		this.manageGroupAppContainer = Selector('#manageGroupApp');
	}

	async validatePageLoad() {
		await t.expect(this.manageGroupAppContainer.exists).eql(true);
	}
}