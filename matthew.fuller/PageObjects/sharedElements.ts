/* eslint-disable consistent-return */
import { Selector, t } from 'testcafe';
import Util from '../Utilities/util';
// import Alerts from './Alerts';
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
    // alerts: Alerts;

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

    /** @description the selector for generic dropdowns containing the text work item non case  */
    dropDownWorkItem: Selector;

    /** @description a default title input selector sharedElements.getCurrentInputs()
	 * must be used before */
    genericTitleInput: Selector;

    /**
	 * @description generic description input selector sharedElements.getCurrentInputs()
	 * must be used before */
    genericDescInput: Selector;

    /** @description generic version input */
    genericVersionInput: Selector;

    /** @description generic revision input */
    genericRevisionInput: Selector;

    /** @description generic partNumberInput */
    genericPartNumberInput: Selector;

    /** @description generic location input */
    genericLocationInput: Selector;

    /** @description generic release status input */
    genericReleaseStatus: Selector;

    /** @description the revise dropdown shared accross the website */
    dropdownRevise: Selector;

    /** @description the side pane containing info on pages */
    infoSidePane: Selector;

    /** @description the more btn always present in the upper right */
  	moreBtn: Selector;

	/**
	 * @description the generic selector for errors on MBE web
	 * note errors do not register as visable on MBEweb, as such .active class is added
	 * to the selector to check if the error is "active" and .exists should be used to check
	 * visibility of the selector
	*/
	genericErr: Selector;

	/** @description the pencil icon used for edit icon in search object options */
	pencilIcon: Selector;

	/** @description the trash icon used for delete icon in search options */
	trashIcon: Selector;

  	constructor() {
  	  /** @type {any} */
  	  this.moreBtn = Selector('.MenuList-icon.fas.fa-bars');
	  this.trashIcon = Selector('.fa-trash-alt');
	  this.pencilIcon = Selector('span.fa-pencil-alt');
  	  this.infoSidePane = Selector('.infoSide-pane');
  	  // this.alerts = new Alerts();
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
	  this.genericErr = Selector('span.error.active');

  	  // case insensitive .withtext
  	  this.dropDownDelete = Selector('a').withText(/delete/gi);
  	  this.dropDownEdit = Selector('a').withText(/edit/gi);
  	  this.dropDownFavorite = Selector('a').withText(/favorite/gi);
  	  this.dropDownAccount = Selector('a').withText(/account/gi);
  	  this.dropDownWorkItem = Selector('a').withText(/work item/gi);
  	  this.dropdownRevise = Selector('a').withText(/revise/gi);
  	  this.ellipsis = Selector('span.fa-ellipsis-h');
  	  this.userIcon = Selector('#navbarUserInfo').find('.initials');
  	  this.feedPageBtn = Selector('span.MenuList-icon.fas.fa-plus-circle');

  	  // creation menu shared inputs
  	}

  	/** @description updates all selectors for inputs */
  	async getCurrentInputs() {
  	  this.genericTitleInput = await this.findGenericInputOrTextarea('title');
  	  this.genericDescInput = await this.findGenericInputOrTextarea('description');
  	  this.genericVersionInput = await this.findGenericInputOrTextarea('version');
  	  this.genericRevisionInput = await this.findGenericInputOrTextarea('revision');
  	  this.genericPartNumberInput = await this.findGenericInputOrTextarea('part number');
  	  this.genericLocationInput = await this.findGenericInputOrTextarea('location');
  	  this.genericReleaseStatus = await this.findGenericInputOrTextarea('release status');
  	}

  	// eslint-disable-next-line class-methods-use-this
  	findGenericDropdownSelector(text) {
  	  const re = new RegExp(text, 'gi');
  	  return Selector('a').withText(re);
  	}

  	/** @description find any input or feild with placeholder matching
     * If both are found function will return input over textarea
     * @returns selector if one is found, returns selector of * if nether are found
     */
  	// eslint-disable-next-line class-methods-use-this
  	async findGenericInputOrTextarea(text) {
  	  const re = new RegExp(`\\b${text}\\b`, 'gi');
  	  const i = Selector('input').withAttribute('placeholder', re);
  	  const x = Selector('textarea').withAttribute('placeholder', re);
  	  if (await i.filterVisible().exists) { return i; }
  	  if (await x.filterVisible().exists) { return x; }
  	  return Selector('');
  	}

  	/**
     * @description from a selector check that a checkbox functions properly
     * @param checkbox the selector of the check box
     * @param checkboxInput the selector with the attr of checked
     */
  	async testCheckboxes(checkbox:Selector, checkboxInput: Selector, state = false) {
  	  const util = new Util();
  	  let isChecked = await checkboxInput.checked;
  	  await t.expect(isChecked === state).eql(false);
  	  if (util.Verbose) console.log(isChecked);
  	  await t.click(checkbox);
  	  isChecked = await checkboxInput.checked;
  	  if (util.Verbose) console.log(isChecked);
  	  await t.expect(isChecked === state).eql(true);
  	}

  	/**
     *
     * @param selector the selectors to check if it has sibling
     * @param sibling the sibling to check if selector has as sibling
     * @returns selector
     */
  	// eslint-disable-next-line class-methods-use-this
  	async withSibling(selector:Selector, sibling:string) {
  	  const count = await selector.count;
  	  for (let i = 0; i < count; i += 1) {
  	    const element = selector.nth(i);
  	    if (await element.sibling(sibling).exists) {
  	      return element;
  	    }
  	    return selector;
  	  }
  	}

  	/**
     * @description cycle through if statements checking if different btns are visible, return
     * one that is
     */
  	async findCancelBtn() {
  	  if (this.genericCancelButton.visible) {
  	    return (this.genericCancelButton);
  	  } if (this.CreateCancelButton.visible) {
  	    return (this.CreateCancelButton);
  	  }
  	  return (this.genericBtn.filter('.cancel'));
  	}

  	/**
     * @description cycle through if statements checking if different btns are visible, return
     * one that is
     */
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
