/* eslint-disable import/prefer-default-export */
import { Role } from 'testcafe';
import LoginPage from '../PageObjects/login-page';
import ConfigurationManager from '../Configuration/configuration';

const configManager = new ConfigurationManager();
const loginPage = new LoginPage();
const genericPassword = 'p@ssw0rd';

export const mattUser = {
  username: 'matthew',
  password: genericPassword,
  initials: 'MF',
  role: Role(
    configManager.serverUrl,
    async () => {
      await loginPage.login('matthew', genericPassword);
    },
    { preserveUrl: true },
  ),
};
