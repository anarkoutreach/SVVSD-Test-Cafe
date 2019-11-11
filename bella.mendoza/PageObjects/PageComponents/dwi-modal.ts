import { Selector, t } from "testcafe";
import { IModal } from "../Abstract/IModal";

export default class DwiModal implements IModal {
	self: Selector;

	constructor() {
		this.self = Selector('.createDWIModal');
	}

	async validateModalLoad() {
		await t.expect(this.self.exists).eql(true);
	}
}