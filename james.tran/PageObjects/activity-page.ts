import { Selector, t } from "testcafe";

export default class ActivityPage {
	activitySettingsButton: Selector;
	startConversationButton: Selector;
	conversationTitleInput: Selector;
	conversationDescInput: Selector;
	postConversationButton: Selector;
	conversationGroupsUsersButton: Selector;

	constructor() {
		this.activitySettingsButton = Selector('#activitySettings');
		this.startConversationButton = Selector('.createConversation');
		this.conversationTitleInput = Selector('.conversationTitleInput');
		this.conversationDescInput = Selector('.conversationDescInput');
		this.conversationGroupsUsersButton = Selector('#createConvGroupDropdown'); //displays select element
		this.conversationGroupsUsersButton = Selector('.conversationGroupDropdown'); //contains options
		this.postConversationButton = Selector('#post');
	}

	async startConversation(): Promise<ActivityPage> {
		t.click(this.startConversationButton);		
		return Promise.resolve(this);
	}

	async setTitle(title: string): Promise<ActivityPage> {
		t.typeText(this.conversationTitleInput, title);		
		return Promise.resolve(this);
	}
}