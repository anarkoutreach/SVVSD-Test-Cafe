import { Selector, t } from "testcafe";
import { IModal } from "../Abstract/IModal";

export default class AccessControlListModal implements IModal {
	self: Selector;

	constructor() {
		this.self = Selector('.roleSelection');
	}

	async validateModalLoad() {
		await t.expect(this.self.exists).eql(true);
	}
}