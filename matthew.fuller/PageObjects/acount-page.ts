import { Selector, t } from 'testcafe';
import SharedElements from './sharedElements';

export default class AccountPage {
    /** @description the selector representing the emailField field on the accout page */
    emailField: Selector;

    /** @description the selector representing the name field on the accout page */
    nameField: Selector;

    /** @description the selector representing the title field on the accout page */
    titleField: Selector;

    /** @description the selector representing the department field on the accout page */
    departmentField: Selector;

    emailNotificationSwitch: Selector;

    emailNotificationSwitchInput: Selector;

    constructor() {
      this.nameField = Selector('#formHorizontalName');
      this.emailField = Selector('#formHorizontalEmail');
      this.titleField = Selector('#formHorizontalTitle');
      this.departmentField = Selector('#formHorizontalDept');
      this.emailNotificationSwitchInput = Selector('label.checkbox-switch').child('input');
      this.emailNotificationSwitch = Selector('label.checkbox-switch');
    }

    async getSwitchBool() {
      return this.emailNotificationSwitchInput.checked;
    }

    async navigateFromHomeToAccountPage() {
      const sharedElements = new SharedElements();
      await t
        .click(sharedElements.userIcon)
        .click(await sharedElements.findGenericDropdownSelector('account'));
    }
}
