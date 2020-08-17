/**@description A class represnting the controller that handles configs */
export default class ConfigurationManager {
	serverUrl: string;
	homePage: string;
	
	constructor() {
		this.serverUrl = "https://svvsd.cloud-staging.anark.com";
		this.homePage = this.serverUrl + '/feed';
	}
}
