import { Selector } from 'testcafe';
import Alerts from './Alerts';
/** @description the class used to contain functions and elements that are shared across the website
 * IE: things like accept and cancel buttons. This will make it much easier to update these scripts
 * when the website changes.
 */
export default class SharedElements {
    /** @description a selector used to represent generic accpet buttons accros MBE web */
    genericConfimButton: Selector;

    /** @description a selector used to represent the generic cancel buttons accross MBE web */
    genericCancelButton: Selector;

    /** @description a selector used to represent the generic update button accross MBEweb */
    genericUpdateBtn: Selector;

    /** @description a selector used to identify the anark logo in the upper left */
    anarkLogo: Selector;

    /** @description generic button with the class btn */
    genericBtn: Selector;

    /** @description generic button for the search item primary div */
    genericItemPrimaryBtn: Selector;

    /** @description a button used for creation of items on MBE web */
    genericCreateBtn: Selector;

    /** @description a cancel button only used in pairs with creation buttons */
    CreateCancelButton: Selector;

    /** @description a class for alerts accross MBEweb */
    alerts: Alerts;

    constructor() {
      this.alerts = new Alerts();
      this.anarkLogo = Selector('span.navbar-brand');
      this.genericBtn = Selector('button.btn');
      this.genericItemPrimaryBtn = Selector('div.searchItemPrimary');
      this.genericUpdateBtn = Selector('button.update.btn.btn-primary');
      this.genericConfimButton = Selector('button.submit.btn.btn-primary');
      this.genericCancelButton = Selector('button.cancel.btn.btn-default');
      this.CreateCancelButton = this.genericBtn.filter('.createButtons-cancel');
      this.genericCreateBtn = this.genericBtn.filter('.createButtons-submit');
    }

    async findCancelBtn() {
      if (this.genericCancelButton.visible) {
        return (this.genericCancelButton);
      } if (this.CreateCancelButton.visible) {
        return (this.CreateCancelButton);
      }
      return (this.genericBtn.filter('.cancel'));
    }
}