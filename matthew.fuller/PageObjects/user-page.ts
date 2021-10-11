import { Selector, t } from 'testcafe';
import UserObj from './PageComponents/userObj';
import FeedPage from './feed-page';
import SharedElements from './sharedElements';
/** @description A class represnting the "feedpage" on MBE-web */
const sharedElements = new SharedElements();
export default class UserPage {
	/** @description the input representing the name field in the user create page */
	nameField: Selector;

	/** @description the input representing the Email field in the user create page */
	emailField: Selector;

	/** @description the input representing the Title field in the user create page */
	titleField: Selector;

	/** @description the input representing the Organization field in the user create page */
	OrganizationField: Selector;

	/** @description the input representing the Department field in the user create page */
	DepartmentField: Selector;

	/** @description the input representing the Login Id field in the user create page */
	LoginIdField: Selector;

	/** @description the input representing the Password field in the user create page */
	PasswordField: Selector;

	/** @description the dropdown menu representing the Site user create page */
	SiteField: Selector;

	/** @description the dropdown menu representing the Roles user create page */
	RolesField: Selector;

	/** @description the dropdown menu representing the AcLists user create page */
	ACListsField: Selector;

	/** @description a selector representing the "Create and Invite" btn */
	createBtn: Selector;

	/** @description a selector representing the "Cancel" btn */
	cancelBtn: Selector;

	constructor() {
	  this.nameField = Selector('input#formHorizontalName');
	  this.emailField = Selector('input#formHorizontalEmail');
	  this.titleField = Selector('input#formHorizontalTitle');
	  this.OrganizationField = Selector('div').withText('organization');
	  this.DepartmentField = Selector('input#formHorizontalDept');
	  this.LoginIdField = Selector('input#formHorizontalUsername');
	  this.PasswordField = Selector('input#formHorizontalPwd');
	  this.SiteField = Selector('div').withText('site');
	  this.RolesField = Selector('#formHorizontalRoles');
	  this.ACListsField = Selector('div').withText('AC');
	  this.createBtn = sharedElements.genericCreateBtn;
	  this.cancelBtn = sharedElements.CreateCancelButton;
	}

	/**
	 * @description checks if currently inside of the userpage
	 * @returns Boolean indicating if in User Page
	 */
 	checkInUserPage() {
	  if (this.nameField.visible && this.emailField.visible) {
	    return true;
	  }
	  return false;
	}

	/**
	 * @description fill all fields in the new user page based on a userObj
	 * @param userObj an object representing the user to create
	 */
	async fillAllFields(userObj: UserObj) {
	  await t
	    .expect(this.nameField.visible).eql(true)
	    .click(this.nameField)
	    .typeText(this.nameField, userObj.name, { paste: true })
	    .expect(this.emailField.visible)
	    .eql(true)
	    .click(this.emailField)
	    .typeText(this.emailField, userObj.email)
	    .expect(this.titleField.visible)
	    .eql(true)
	    .click(this.titleField)
	    .typeText(this.titleField, userObj.title)
	    .expect(this.OrganizationField.visible)
	    .eql(true)
	    .click(this.OrganizationField)
	    .typeText(this.OrganizationField, userObj.organization)
	    .expect(this.DepartmentField.visible)
	    .eql(true)
	    .click(this.DepartmentField)
	    .typeText(this.DepartmentField, userObj.department)
	    .expect(this.LoginIdField.visible)
	    .eql(true)
	    .click(this.LoginIdField)
	    .typeText(this.LoginIdField, userObj.loginId)
	    .expect(this.PasswordField.visible)
	    .eql(true)
	    .click(this.PasswordField)
	    .typeText(this.PasswordField, userObj.password);
	  userObj.roles.forEach(async (role) => {
	    await t
	      .expect(this.RolesField.visible).eql(true)
	      .click(this.RolesField)
	      .typeText(this.RolesField, role)
	      .pressKey('enter');
	  });
	  userObj.acLists.forEach(async (ac) => {
	    await t
	      .expect(this.ACListsField.visible).eql(true)
	      .click(this.ACListsField)
	      .typeText(this.ACListsField, ac)
	      .pressKey('enter');
	  });
	  if (userObj.site != null) {
	    await t
	      .expect(this.SiteField.visible).eql(true)
	      .click(this.SiteField)
	      .typeText(this.SiteField, userObj.site)
	      .pressKey('enter');
	  }
	}

	/**
	 * @description presses the create btn and handles errors
	 * @returns true if there were no errors caused, else return error
	 */
	async pressCreateBtn() {
	  const feedPage = new FeedPage();
	  await t
	    .expect(this.createBtn.exists && this.createBtn.visible).eql(true)
	    .click(this.createBtn);
	  const error = await this.checkErrorsOnPage();
	  if (error != null) {
	    return error;
	  }
	  if (feedPage.firstAddCommentBtn.exists) {
	    return true;
	  } return 'notOnHomePage';
	}

	/**
	 * @description check if any errors are on the user page
	 * @returns an array containing all errors on the page
	 * "loginIdExists" if the login id is taken
	 * other will be added if needed
	 *
	 */
	// eslint-disable-next-line class-methods-use-this
	async checkErrorsOnPage() {
	  const errors = [];
	  const allErrors = Selector('span.error');
	  const LoginIdPopUp = allErrors.withText('already taken').exists && allErrors.withText('already taken').visible;
	  const invalidEmail = allErrors.withText('valid email').exists && allErrors.withText('valid email').visible;
	  // console.log(await LoginIdPopUp)
	  if (await LoginIdPopUp)errors.push('loginIdExists');
	  if (await invalidEmail)errors.push('invalidEmail');
	  return errors;
	}

	/**
	 * @description create a user and with a role and test if the role was properly assigned
	 * @param roles an array of strings with the roles to assign, CASE SENSITIVE
	 * @return user obj
	*/
	// eslint-disable-next-line class-methods-use-this
	async testRoleAssignment(roles: string[]) {
	  const userPage = new UserPage();
	  const feedPage = new FeedPage();
	  const user = new UserObj(roles);
	  await userPage.fillAllFields(user);
	  await userPage.pressCreateBtn();
	  await feedPage.returnToHome();
	  // await feedPage.signOut()
	  await t.useRole(user.user.role);
	  await feedPage.verifyUserAndRoles(user);
	  if (roles[0] === 'Viewer' && roles.length === 1) {
	    await t.expect(feedPage.createButton.visible).eql(false);
	  } else {
	    await t.expect(feedPage.createButton.visible).eql(true);
	  }
	  return user;
	}
}
