import { Selector, t } from "testcafe";
import { IModal } from "../Abstract/IModal";

export default class TemplateModal implements IModal {
	self: Selector;

	constructor() {
		this.self = Selector('#formControlsFile[accept=".zip"]');
	}

	async validateModalLoad() {
		await t.expect(this.self.exists).eql(true);
	}
}