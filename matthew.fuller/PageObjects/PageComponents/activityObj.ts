import util from "../../Utilities/util";
import { Role } from "testcafe";
import LoginPage from "../../PageObjects/login-page";
import ConfigurationManager from "../../Configuration/configuration";

const configManager = new ConfigurationManager();
const loginPage = new LoginPage();
const Util = new util();
Util.randchar(40);
export default class activityObj {
/**@description the title of the activity*/
title: string;
/**@description the description of the activity*/
description: string;
/**@description the start date of the activity*/
startDate: string;
/**@description the end date of the activity*/
endDate: string;
/**@description an array containing all content item names that have been added to this activity*/
contentItems: Array<string>;
/**@description an array containing all user names that have been added to this activity*/
users: Array<string>;
/**@description an array containing all group names that have been added to this activity*/
groups: Array<string>;

/**
 * 
 * @param num the number of random charectors to generate for pass and username
 */
constructor(title="DefaultActivity",desc="defualtDesc",num = 5,endDate="10/22/3000 12:00:00 AM"){
this.title = title + Util.randchar(num);
this.description = desc+ Util.randchar(num);
//this.startDate = configManager.config.defaultData.user.organization;
this.endDate =endDate
}
}