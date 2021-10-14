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

    /** @description the title of objects on the website that are refered to as apps */
    appTitle: Selector;

    /** @description the generic search bar for WBEweb */
    searchbar: Selector;

    /** @description the generic selector that will select most cog icons accrsos the website. */
    genericCog: Selector;

    /** @description the drop down delete button (should be the same accross most of the website) */
    dropDownDelete: Selector;

    /** @description the drop down edit button (should be the same accross most of the website) */
    dropDownEdit: Selector;

    /** @description the drop down account button
     *  (should be the same accross most of the website) */
    dropDownAccount: Selector;

    /** @description the drop down add to favorite button
     * (should be the same accross most of the website) */
    dropDownFavorite: Selector;

    /** @description generic elpipisis */
    ellipsis: Selector;

    /** @description the user icon at the top right of the page */
    userIcon: Selector;

    /** @description feed page btn */
    feedPageBtn: Selector;

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
      this.appTitle = Selector('div.appTitle');
      this.searchbar = Selector('input.searchBar');
      this.genericCog = Selector('span.fas.fa-cog');

      // case insensitive .withtext
      this.dropDownDelete = Selector('a').withText(/delete/gi);
      this.dropDownEdit = Selector('a').withText(/edit/gi);
      this.dropDownFavorite = Selector('a').withText(/favorite/gi);
      this.dropDownAccount = Selector('a').withText(/account/gi);

      this.ellipsis = Selector('span.fa-ellipsis-h');
      this.userIcon = Selector('#navbarUserInfo').find('.initials');
      this.feedPageBtn = Selector('span.MenuList-icon.fas.fa-plus-circle');
    }

    async findCancelBtn() {
      if (this.genericCancelButton.visible) {
        return (this.genericCancelButton);
      } if (this.CreateCancelButton.visible) {
        return (this.CreateCancelButton);
      }
      return (this.genericBtn.filter('.cancel'));
    }

    async findConfirmBtn() {
      if (this.genericUpdateBtn.visible) {
        return (this.genericUpdateBtn);
      } if (this.genericConfimButton.visible) {
        return (this.genericConfimButton);
      } if (this.genericCreateBtn.visible) {
        return (this.genericCreateBtn);
      } if (this.genericBtn.filter('.confirm').visible) {
        return (this.genericBtn.filter('.confirm'));
      }
      return (this.genericBtn);
    }
}
