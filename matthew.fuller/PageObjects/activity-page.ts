import { Selector, t } from "testcafe";
import util from "../Utilities/util";
import FeedPage from "../PageObjects/feed-page";
const feedPage = new FeedPage();
const Util = new util;

export default class ActivityPage {
	title: Selector;
	editBtn: Selector;
	startDate: Selector;
	endDate: Selector;
	contentItemTab: Selector;
	usersTab: Selector;
	description: Selector;
	createBtn: Selector;
	groupsTab:Selector;
	constructor() {
		this.editBtn = Selector("div.glyphicon.glyphicon-cog")
		this.createBtn = Selector("button.create.btn.btn-success")
		this.endDate = Selector("input.createEndDate")
		this.startDate = Selector("input.createStartDate")
		this.title = Selector("#paneHeaderTitle")
		this.description = Selector("#paneHeaderDesc")
		this.contentItemTab = Selector("#search-tab-tab-Content");
		this.usersTab = Selector("#search-tab-tab-User");
		this.groupsTab = Selector("#search-tab-tab-Group");
	}

	async addEndData(date="10/22/3000 12:00:00 AM"){
		
		await t
		.expect(this.endDate.exists).eql(true)
		.click(this.endDate);
		await Util.CtlADelete(this.endDate)
		await t
		.typeText(this.endDate,date);
	}
	async addNthGroup(nth){
		await t
		.expect(this.groupsTab.exists).eql(true)
		.click(this.groupsTab);
		let btn = Selector("button.addButton.btn.btn-primary").nth(nth)
		await t
		.expect(btn.exists).eql(true)
		.click(btn);
		await t
		.expect(this.contentItemTab.exists).eql(true)
		.click(this.contentItemTab);
	}
	async pressCreateBtn(){
		await t
		.expect(this.createBtn.exists).eql(true)
		.click(this.createBtn)
		.expect(Selector("#activityTitle").exists).eql(true);
	}
	async addGenericTitleAndDescription(){
		let title="actTitle:"+Util.randchar(25);
		let desc="desc:"+Util.randchar(25);
		await t
		.expect(this.title.exists).eql(true)
		.click(this.title)
		.typeText(this.title, title)
		.expect(this.description.exists).eql(true)
		.click(this.description)
		.typeText(this.description, desc);
		return {"title":title,"desc":desc}
	}
	async navigateToActivity(name){
		console.log(name)
		feedPage.selectActivity(name)
	}
}