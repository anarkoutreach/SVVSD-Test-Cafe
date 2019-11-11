import { Selector, t } from "testcafe";
import { MbewebPage } from "./Abstract/MbewebPage";
import ActivityPage from "./activity-page";

export default class AddEditActivityPage extends MbewebPage {
	private manageActivityAppContainer: Selector;
	private searchInput: Selector;
	private searchSubmit: any;
	private contentTab: Selector;
	private groupsTab: Selector;
	private usersTab: Selector;
	private titleTextArea: Selector;
	private descriptionTextArea: Selector;
	private startDateInput: Selector;
	private endDateInput: Selector;
	private createButton: Selector;
	private cancelButton: Selector;
	private addButtons: Selector;
	
	constructor() {
		super('Add Edit Activity Page')
		this.manageActivityAppContainer = Selector('#manageActivityApp');

		//search pane
		this.searchInput = Selector('#query');
		this.searchSubmit = this.searchInput.sibling('button[type="submit"]');
		this.addButtons = Selector('.addButton');
		this.contentTab = Selector('#search-tab-tab-1');
		this.groupsTab = Selector('#search-tab-tab-2');
		this.usersTab = Selector('#search-tab-tab-3');

		//details panel
		this.titleTextArea = Selector('#paneHeaderTitle');
		this.descriptionTextArea = Selector('#paneHeaderDesc');
		this.startDateInput = Selector('.createStartDate');
		this.endDateInput = Selector('.createEndDate');
		this.createButton = Selector('.activityButtons').find('.create');
		this.cancelButton = Selector('.activityButtons').find('.cancelCreate');
	}

	async validatePageLoad() {
		await t.expect(this.manageActivityAppContainer.exists).eql(true);
	}

	async setTitle(title: string): Promise<AddEditActivityPage> {
		await t.typeText(this.titleTextArea, title);
		return Promise.resolve(this);
	}

	async setDescription(description: string): Promise<AddEditActivityPage> {
		await t.typeText(this.descriptionTextArea, description);
		return Promise.resolve(this);
	}

	async setStartDate(startDate: Date): Promise<AddEditActivityPage> {
		await t.typeText(this.startDateInput, startDate.toLocaleString());
		return Promise.resolve(this);
	}

	async setEndDate(endDate: Date): Promise<AddEditActivityPage> {
		await t.typeText(this.endDateInput, endDate.toLocaleString());
		return Promise.resolve(this);
	}

	async addContentByIndex(index: number): Promise<AddEditActivityPage> {
		await t.click(this.contentTab)
			.click(this.addButtons.nth(index));

		return Promise.resolve(this);
	}

	async addGroupByIndex(index: number): Promise<AddEditActivityPage> {
		await t.click(this.groupsTab)
			.click(this.addButtons.nth(index));

		return Promise.resolve(this);
	}

	async addUserByIndex(index: number): Promise<AddEditActivityPage> {
		await t.click(this.usersTab)
			.click(this.addButtons.nth(index));

		return Promise.resolve(this);
	}

	async createActivity(): Promise<ActivityPage> {
		await t.click(this.createButton);

		return Promise.resolve(new ActivityPage());
	}
}