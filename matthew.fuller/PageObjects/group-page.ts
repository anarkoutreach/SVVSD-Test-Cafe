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
	/**@description initalise the group page class */
	constructor() {
		this.titleOnEndScreen = Selector("div#groupTitle");
		this.usersAddList = Selector("button.addButton.btn.btn-primary");
		this.title = Selector("textarea#paneHeaderTitle");
		this.description = Selector("textarea#paneHeaderDesc");
		this.createBtn = Selector("button.create.btn.btn-success");
		this.cancelBtn = Selector("button.cancelCreate.btn.btn-warning");
	}
	/**
	 * @description navigate to the group creation page: click the create btn then, click create  group.
	 */
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
	 * @description search for a user by their name or by a query looking to find a specific name under the querry, and then add it to the group if the name is found
	 * @param name the name that will be matched with the list of names 
	 * @param query the query that should be searched to find the name, if left empty this will be the same as the name
	 */
	async addUserByName(name:string,query=false as any){
		if(query!=false){

		}else{
			query=name
		}
		const count = await this.usersAddList.count
		let search =Selector("input#query")
		await t
		.expect(search.exists).eql(true)
		.click(search)
		.typeText(search,query)
		.expect(Selector("button.btn.btn-default").exists).eql(true)
		.pressKey("enter")
		for(let i=0; i<count;i++){
			let element = this.usersAddList.nth(i);
			let userName =await element.parent("div").sibling("article").child("div.searchItemInfo").child("span").innerText;
			let isUser = name.toUpperCase() == userName;
			if(isUser){
				await t
				.expect(element.exists).eql(true)
				.click(element);
				i=Infinity;
			}
		}
	}
	/**
	 * @description create a generic group from a defaul and radomised group obj
	 * @param click, a parameter:bool, that detemines weathor or not to click 
	 * create group at the end of excution of this function
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
	/**
	 * @description a function that takes a group obj and creates a group on mbe web from it
	 * @param obj the group object to use for creation
	 * @param click weathor to click create at the end of execution
	 */
	async createGroupFromGroupObj(obj,click=true){
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
		if(click){
		await t.expect(this.createBtn.exists).eql(true).click(this.createBtn);
		if(obj.title==null || obj.description || obj.users.length == 0){
			await t.expect(error.exists).eql(true);
		}}
		
		
	}
	/**
	 * @description click the create button of a group creation menu
	 * and verify its results
	 */
	async clickCreateBtn(){
		await t
		.expect(this.createBtn.exists).eql(true)
		.click(this.createBtn)
		.expect(this.titleOnEndScreen.exists).eql(true);
	}
	/**
	 * @description add the n'th user in the list of users to a group while in creation or editing
	 * @param n the number var
	 */
	async addNthUserToGroup(n){
		let nthObj =this.usersAddList.nth(n);
		await t
		.expect(nthObj.exists).eql(true)
		.click(nthObj);
	}
}