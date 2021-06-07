import { Selector, t } from "testcafe";
import FeedPage from "./feed-page";
import groupObj from "./PageComponents/groupObj";
const feedpage = new FeedPage()

export default class GroupPage {
	usersAddList: Selector;
	title: Selector;
	description: Selector;
	createBtn: Selector;
	cancelBtn: Selector;
	titleOnEndScreen: Selector;
	constructor() {
		this.titleOnEndScreen = Selector("div#groupTitle");
		this.usersAddList = Selector("button.addButton.btn.btn-primary");
		this.title = Selector("textarea#paneHeaderTitle");
		this.description = Selector("textarea#paneHeaderDesc");
		this.createBtn = Selector("button.create.btn.btn-success");
		this.cancelBtn = Selector("button.cancelCreate.btn.btn-warning");
	}
	async navigateToGroupCreationPage(){
		if(feedpage.userInitialsIcon.exists){
			await feedpage.openGroupMenu()
		}else if(this.title.exists){

		}else{
			await feedpage.returnToHome()
			await feedpage.openGroupMenu()
		}
	}
	/**
	 * @description create a generic group from a defaul and radomised group obj
	 */
	async createGenericGroup(click=true){
		let obj = new groupObj()
		await this.navigateToGroupCreationPage()
		await t
		.expect(this.title.exists).eql(true)
		.typeText(this.title, obj.title)
		.expect(this.description.exists).eql(true)
		.typeText(this.description, obj.description)
		await this.addNthUserToGroup(0)
		if(click)
		await this.clickCreateBtn()
	}
	async createGroupFromGroupObj(obj){
		await this.navigateToGroupCreationPage()
		if(obj.title!=null){
			await t
			.expect(this.title.exists).eql(true)
			.typeText(this.title, obj.title)
		}
		if(obj.description!=null){
			await t
			.expect(this.description.exists).eql(true)
			.typeText(this.description, obj.description)
		}
		if(obj.users.length !=0)
		obj.users.forEach(async user => {
			await this.addNthUserToGroup(user)
		});

		let error = Selector("span.error.createButtons.active")
		await t.expect(this.createBtn.exists).eql(true)
		.click(this.createBtn);
		if(obj.title==null || obj.description || obj.users.length == 0){
			await t.expect(error.exists).eql(true);
		}
		
		
	}
	async clickCreateBtn(){
		await t
		.expect(this.createBtn.exists).eql(true)
		.click(this.createBtn)
		.expect(this.titleOnEndScreen.exists).eql(true);
	}
	async addNthUserToGroup(n){
		let nthObj =this.usersAddList.nth(n);
		await t
		.expect(nthObj.exists).eql(true)
		.click(nthObj);
	}
}