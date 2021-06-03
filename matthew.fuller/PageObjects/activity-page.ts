import { Selector, t } from "testcafe";
import util from "../Utilities/util";
import FeedPage from "../PageObjects/feed-page";
import activityObj from "./PageComponents/activityObj";
const feedPage = new FeedPage();
const Util = new util;

export default class ActivityPage {
	editActivityMenuItem: Selector;
	title: Selector;
	generateReportActivityMenuItem:Selector;
	deleteActivityMenuItem:Selector;
	editBtn: Selector;
	startDate: Selector;
	endDate: Selector;
	contentItemTab: Selector;
	usersTab: Selector;
	description: Selector;
	createBtn: Selector;
	groupsTab:Selector;
	constructor() {
		this.editActivityMenuItem = Selector("#activitySettings").sibling("ul").child("li").nth(0)
		this.deleteActivityMenuItem = Selector("#activitySettings").sibling("ul").child("li").nth(1)
		this.generateReportActivityMenuItem = Selector("#activitySettings").sibling("ul").child("li").nth(2)

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
	/**
	 * @description navigates to activity and then clicks edit button and expect the title exists and is visible to check the operation was successful
	 * @extends navigateToActivity
	 * @returns null
	 */
	async openActivityInEditMode(actName:string){
		await this.navigateToActivity(actName)
		await t
		.expect(this.editBtn.exists).eql(true)
		.click(this.editBtn)
		.expect(this.editActivityMenuItem.visible).eql(true)
		.click(this.editActivityMenuItem)
		.expect(this.title.exists).eql(true)
		.expect(this.title.visible).eql(true);
		return null
	}
	/**
	 * @description navigate to activity creation and create a activity, returning the activity object
	 * @returns activity object
	 */
	async createGenericAct(actObj = new activityObj()){
		await feedPage.openCreateMenu();
		await t
		.setNativeDialogHandler(() => true)
		.click(feedPage.createOptionsActivity)
		.expect(Selector("#search-tab-tab-Content").exists).eql(true);
		await this.addEndData();
		await this.addNthGroup(0);
		await this.addNthGroup(1);
		await this.addNthGroup(2);
		await this.addGenericTitleAndDescription(true,actObj);
		await this.pressCreateBtn();
		return actObj
	}
	/**
	 * @description add a end date to a activity
	 * @param date the date to be added with a default value of "10/22/3000 12:00:00 AM"
	 * @returns null
	 */
	async addEndData(date="10/22/3000 12:00:00 AM"){
		
		await t
		.expect(this.endDate.exists).eql(true)
		.click(this.endDate);
		await Util.CtlADelete(this.endDate)
		await t
		.typeText(this.endDate,date);
		return null
	}
	/**
	 * @description add a group to a activity based on nth variable
	 * @param nth a zero based index number of which group to select
	 * @returns null
	 */
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
		return null
	}
	/**
	 * @description press the create button of a activity and verify its creation by checking if activity title exists 
	 * @returns null
	*/
	async pressCreateBtn(){
		await t
		.expect(this.createBtn.exists).eql(true)
		.click(this.createBtn)
		.expect(Selector("#activityTitle").exists).eql(true);
		return null
	}
	async addGenericTitleAndDescription(useObj=false,obj=new activityObj()){
		let title;
		let desc;
		if(useObj!=false){
			title=obj.title;
			desc=obj.description;
		}else{
			title+="GenericTitle"+Util.randchar(25);
			desc+="GenericDesc"+Util.randchar(25);
		}
		
		await t
		.expect(this.title.exists).eql(true)
		.click(this.title)
		.typeText(this.title, title)
		.expect(this.description.exists).eql(true)
		.click(this.description)
		.typeText(this.description, desc);
		return {"title":title,"desc":desc}
	}
	/**
	 * @description from the feed page click on an activity and navigate to it and verify it has navigated
	 * @param name a string that represents the name to search for
	 * @returns null
	 */
	async navigateToActivity(name:string){
		feedPage.selectActivity(name)
		return null
	}
}