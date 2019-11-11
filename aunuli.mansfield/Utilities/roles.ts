import { Role } from "testcafe";
import LoginPage from "../PageObjects/login-page";
import ConfigurationManager from "../Configuration/configuration";

const configManager = new ConfigurationManager();
const loginPage = new LoginPage();
const genericPassword = 'p@ssw0rd';

export const axelUser = {
	username: 'axel',
	password: genericPassword,
	initials: "AL",
	role: Role(
		configManager.serverUrl,
		async t => {
			await loginPage.login('axel', genericPassword);
		},
		{ preserveUrl: true }
	)
};

export const lukeUser = {
	username: 'luke',
	password: genericPassword,
	initials: "LP",
	role: Role(
		configManager.serverUrl,
		async t => {
			await loginPage.login("luke", "p@ssw0rd");
		},
		{ preserveUrl: true }
	)
};
