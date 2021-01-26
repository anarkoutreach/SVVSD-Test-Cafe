import util from "../../Utilities/util";
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
/**
 * 
 * @param num the number of random charectors to generate for pass and username
 * @param roles an array of strings containing the name of the roles to add
 * @param acLists an array of strings containing the name of the acLists to add
 * @param site the site
 */
constructor(num = 5, roles = ["Viewer","Activity Author"], acLists = [], site = null){
this.name = "FakeUser:"+ Util.randchar(num);
this.email = "FakeUser"+ Util.randchar(num) + "@"+ "FakeUser"+ Util.randchar(5) +".fake";
this.title = "faker";
this.organization = "RobotsInc"
this.department ="Automation"
this.loginId = "FakeLogin" +Util.randchar(num);
this.password = "FakePass" +Util.randchar(num);
this.site = site
this.roles = roles
this.acLists = acLists
}
}