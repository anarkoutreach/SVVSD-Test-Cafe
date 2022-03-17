/** @description A class represnting the controller that handles configs */
export default class ConfigurationManager {
	/** @description the default server url used by fictures for naviagation */
	serverUrl: string;

	/** @description the url address of the home page of MBE web */
	homePage: string;

	/** @description the url address of the create user page */
	createUserPage: string;

	/** @description the url address of the group creation page */
	groupCreationPage: string;

	/** @description the url address of the activity creation page */
	activityCreationPage: string;

	/** @description the server url without any path after the first slash */
	serverUrlShort: string;

	/** @description the path used to post a comment on MBEweb */
	apiComment: string

	/** @description the defualt user ID used when executing get and post requests through the API */
	userID:string

	/** @description the id of a conversation on the MBE web test server that should not be deleted */
	defaultConversationID: string

	// eslint-disable-next-line global-require
	config = require('./config.json')

	/** @description the defualt end date for things on MBE web that require a date */
	defaultEndDate = '10/22/3000 12:00:00 AM'

	/** @description the defualt end date formatted in javascript Date format */
	defaultJavaScriptEndDate = new Date('3000-12-17T5:12')

	/** @description not entirely sure what this is for */
	defaultEditedEndDate = '10/22/3000 12:00:00 AM'

	/** @description not entirely sure what this is for */
	defaultEditedStartDate = '10/22/2500 12:00:00 AM'

	/** @description the defualt comment id used for testing replys */
	parentID = '6226913edc47403953ef54c2'

	constructor() {
	  this.userID = '5d8a5610e2dfa40022ef0a67';
	  this.defaultConversationID = '6046b44407d21caba9002b52';
	  this.serverUrlShort = 'svvsd.cloud-staging.anark.com';
	  this.serverUrl = 'https://svvsd.cloud-staging.anark.com';
	  this.homePage = `${this.serverUrl}/feed`;
	  this.createUserPage = `${this.serverUrl}/manage/user`;
	  this.groupCreationPage = `${this.serverUrl}/manage/group?tab=User`;
	  this.activityCreationPage = `${this.serverUrl}/manage/activity?tab=Content`;
	}
}
