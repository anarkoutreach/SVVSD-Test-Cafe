export default class ConfigurationManager {
	serverUrl: string;
	homePage: string;
	
	constructor() {
		this.serverUrl = "https://svvsd.cloud-staging.anark.com";
		this.homePage = this.serverUrl + '/feed';
	}
}
