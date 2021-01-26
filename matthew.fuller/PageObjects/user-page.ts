import { Selector, t } from "testcafe";
import userObj from "./PageComponents/userObj"
import FeedPage from "../PageObjects/feed-page";
/**@description A class represnting the "feedpage" on MBE-web */

export default class UserPage {
	/**@description the input representing the name field in the user create page */
	nameField: Selector;
	/**@description the input representing the Email field in the user create page */
	emailField: Selector;
	/**@description the input representing the Title field in the user create page */
	titleField: Selector;
	/**@description the input representing the Organization field in the user create page */
	OrganizationField: Selector;
	/**@description the input representing the Department field in the user create page */
	DepartmentField: Selector;
	/**@description the input representing the Login Id field in the user create page */
	LoginIdField: Selector;
	/**@description the input representing the Password field in the user create page */
	PasswordField: Selector;
	/**@description the dropdown menu representing the Site user create page */
	SiteField: Selector;
	/**@description the dropdown menu representing the Roles user create page */
	RolesField: Selector;
	/**@description the dropdown menu representing the AcLists user create page */
	ACListsField: Selector;
	/**@description a selector representing the "Create and Invite" btn */
	createBtn: Selector;
	/**@description a selector representing the "Cancel" btn */
	cancelBtn: Selector;
	constructor(){
	this.nameField = Selector("input#formHorizontalName")
	this.emailField = Selector("input#formHorizontalEmail")
	this.titleField = Selector("input#formHorizontalTitle")
	this.OrganizationField = Selector("input#formHorizontalOrg")
	this.DepartmentField = Selector("input#formHorizontalDept")
	this.LoginIdField = Selector("input#formHorizontalUsername")
	this.PasswordField = Selector("input#formHorizontalPwd")
	this.SiteField = Selector("#formHorizontalSite")
	this.RolesField = Selector("#formHorizontalRoles")
	this.ACListsField = Selector("#formHorizontalLists")
	this.createBtn = Selector("button#submit")
	this.cancelBtn = Selector("button#cancel")
	}
	/**
	 * @description checks if currently inside of the userpage
	 * @returns Boolean indicating if in User Page
	 */
 	checkInUserPage(){
		if(this.nameField.visible && this.emailField.visible){
			return true
		} else{
			return false
		}
	}
	/**
	 * @description fill all fields in the new user page based on a userObj
	 * @param userObj an object representing the user to create
	 */
	async fillAllFields(userObj: userObj){
		await t
		.expect(this.nameField.exists).eql(true)
		.click(this.nameField)
		.typeText(this.nameField, userObj.name)
		.expect(this.emailField.exists).eql(true)
		.click(this.emailField)
		.typeText(this.emailField, userObj.email)
		.expect(this.titleField.exists).eql(true)
		.click(this.titleField)
		.typeText(this.titleField, userObj.title)
		.expect(this.OrganizationField.exists).eql(true)
		.click(this.OrganizationField)
		.typeText(this.OrganizationField, userObj.organization)
		.expect(this.DepartmentField.exists).eql(true)
		.click(this.DepartmentField)
		.typeText(this.DepartmentField, userObj.department)
		.expect(this.LoginIdField.exists).eql(true)
		.click(this.LoginIdField)
		.typeText(this.LoginIdField, userObj.loginId)
		.expect(this.PasswordField.exists).eql(true)
		.click(this.PasswordField)
		.typeText(this.PasswordField, userObj.password);
		userObj.roles.forEach(async role => {
			await t
			.expect(this.RolesField.exists).eql(true)
			.click(this.RolesField)
			.typeText(this.RolesField, role)
			.pressKey("enter");
		});
		userObj.acLists.forEach(async ac => {
			await t
			.expect(this.ACListsField.exists).eql(true)
			.click(this.ACListsField)
			.typeText(this.ACListsField, ac)
			.pressKey("enter");
		});
		if(userObj.site != null){
			await t
			.expect(this.SiteField.exists).eql(true)
			.click(this.SiteField)
			.typeText(this.SiteField, userObj.site)
			.pressKey("enter");
		}
		
	}
	/**
	 * @description presses the create btn and handles errors 
	 * @returns true if there were no errors caused, else return error
	 */
	async pressCreateBtn(){
		const feedPage = new FeedPage();
		await t.
		expect(this.createBtn.exists && this.createBtn.visible).eql(true)
		.click(this.createBtn);
		let error = await this.checkErrorsOnPage()
		if(error != null){
			return error
		}else{
			if(feedPage.firstAddCommentBtn.exists){
			return true}else{return"notOnHomePage"}
		}
	}
	async checkErrorsOnPage(){
		let allErrors = Selector("span.error");
		let LoginIdPopUp = allErrors.withText("already taken").visible
		if(LoginIdPopUp){return "loginIdExists"}else{return null}
	}
}