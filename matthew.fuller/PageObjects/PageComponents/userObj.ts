import util from "../../Utilities/util";
import { Role } from "testcafe";
import LoginPage from "../../PageObjects/login-page";
import ConfigurationManager from "../../Configuration/configuration";

const configManager = new ConfigurationManager();
const loginPage = new LoginPage();
const Util = new util();
Util.randchar(40);
export default class userObj {
/**@description the name of the user*/
name: string;
/**@description the email of the user*/
email: string;
/**@description the title of the user*/
title: string;
/**@description the organization of the user*/
organization: string;
/**@description the department of the user*/
department: string;
/**@description the login id of the user (the id used to login (username))*/
loginId: string;
/**@description the password of the user*/
password: string;
/**@description the site of the user --note: not currently exist*/
site: string;
/**@description an array of all the roles a user should have*/
roles: Array<string>;
/**@description an array of all the acLists the user should have*/
acLists: Array<string>;
/**@description an object to login as this user*/
user
/**
 * 
 * @param num the number of random charectors to generate for pass and username
 * @param roles an array of strings containing the name of the roles to add
 * @param acLists an array of strings containing the name of the acLists to add
 * @param site the site
 */
constructor(roles = ["Viewer","Activity Author"], acLists = [], site = null, num = 5){
this.name = configManager.config.defaultData.user.name + Util.randchar(num);
this.email = configManager.config.defaultData.user.email+ Util.randchar(num) + "@"+ configManager.config.defaultData.user.email +Util.randchar(5) +".fake";
this.title = configManager.config.defaultData.user.title;
this.organization = configManager.config.defaultData.user.organization;
this.department =configManager.config.defaultData.user.department;
this.loginId = configManager.config.defaultData.user.loginID +Util.randchar(num);
this.password = configManager.config.defaultData.user.password +Util.randchar(num);
this.site = site
this.roles = roles
this.acLists = acLists
this.user = {
    username: this.loginId,
	password: this.password,
	initials: null,
	role: Role(
		//define the server to connect to.
		configManager.serverUrl,
		async t => {
			// define the login function such that when passed to t.use role -> login to MBE web as user
			await loginPage.login(this.loginId, this.password);
		},
		{ preserveUrl: true }
	)
}
}
}