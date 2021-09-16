import { Role } from 'testcafe';
import Util from '../../Utilities/util';
import LoginPage from '../login-page';
import ConfigurationManager from '../../Configuration/configuration';
// login page if used as a global constant here will cause errors,
// try to keep global variables to an absolute minimum as typescript seems not to like them.
const configManager = new ConfigurationManager();

const util = new Util();
util.randChar(40);
export default class UserObj {
/** @description the name of the user */
name: string;

/** @description the email of the user */
email: string;

/** @description the title of the user */
title: string;

/** @description the organization of the user */
organization: string;

/** @description the department of the user */
department: string;

/** @description the login id of the user (the id used to login (username)) */
loginId: string;

/** @description the password of the user */
password: string;

/** @description the site of the user --note: not currently exist */
site: string;

/** @description an array of all the roles a user should have */
roles: Array<string>;

/** @description an array of all the acLists the user should have */
acLists: Array<string>;

/** @description an object to login as this user */
user

/**
 *
 * @param num the number of random charectors to generate for pass and username
 * @param roles an array of strings containing the name of the roles to add
 * @param acLists an array of strings containing the name of the acLists to add
 * @param site the site
 */
constructor(roles = ['Viewer', 'Activity Author'], acLists = [], site = null, num = 5) {
  const loginPage = new LoginPage();
  this.name = configManager.config.defaultData.user.name + util.randChar(num);
  this.email = `${configManager.config.defaultData.user.email + util.randChar(num)}@${configManager.config.defaultData.user.email}${util.randChar(5)}.fake`;
  this.title = configManager.config.defaultData.user.title;
  this.organization = configManager.config.defaultData.user.organization;
  this.department = configManager.config.defaultData.user.department;
  this.loginId = configManager.config.defaultData.user.loginID + util.randChar(num);
  this.password = configManager.config.defaultData.user.password + util.randChar(num);
  this.site = site;
  this.roles = roles;
  this.acLists = acLists;
  this.user = {
    username: this.loginId,
    password: this.password,
    initials: null,
    role: Role(
      // define the server to connect to.
      configManager.serverUrl,
      async () => {
        // define the login function such that when passed to t.use role -> login to MBE web as user
        await loginPage.login(this.loginId, this.password);
      },
      { preserveUrl: true },
    ),
  };
}

async initaliseUserObjFromObj(obj:UserObj) {
  const loginPage = new LoginPage();
  this.department = obj.department;
  this.email = obj.email;
  this.loginId = obj.loginId;
  this.name = obj.name;
  this.organization = obj.organization;
  this.password = obj.password;
  this.site = obj.site;
  this.title = obj.title;
  this.roles = obj.roles;
  this.acLists = obj.acLists;
  this.user = {
    username: this.loginId,
    password: this.password,
    initials: null,
    role: Role(
      // define the server to connect to.
      configManager.serverUrl,
      async () => {
        // define the login function such that when passed to t.use role -> login to MBE web as user
        await loginPage.login(this.loginId, this.password);
      },
      { preserveUrl: true },
    ),
  };
  return this;
}
}
