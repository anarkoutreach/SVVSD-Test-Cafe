/**@description A class represnting the controller that handles configs */
export default class ConfigurationManager {
	serverUrl: string;
	homePage: string;
	config=require("./config.json")
	defaultEndDate = "10/22/3000 12:00:00 AM"
	defaultEditedEndDate = "10/22/3000 12:00:00 AM"
	defaultEditedStartDate = "10/22/2500 12:00:00 AM"
	constructor() {
		this.serverUrl = "https://svvsd.cloud-staging.anark.com";
		this.homePage = this.serverUrl + '/feed';
		
	}
}
