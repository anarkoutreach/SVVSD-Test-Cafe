import { Role } from "testcafe";
import LoginPage from "../PageObjects/login-page";
import ConfigurationManager from "../Configuration/configuration";

const configManager = new ConfigurationManager();
const loginPage = new LoginPage();
const genericPassword = 'p@ssw0rd';

export const adminUser = {
	username: 'axel',
	password: genericPassword,
	initials: "AU",
	role: Role(
		configManager.serverUrl,
		async t => {
			await loginPage.login('axel', genericPassword);
		},
		{ preserveUrl: true }
	)
};
