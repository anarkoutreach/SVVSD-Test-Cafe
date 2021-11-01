import { Selector, t } from 'testcafe';
import Util from '../Utilities/util';
import SharedElements from './sharedElements';
import WI from './WI';

/** @description the class used to represent alerts accross MBE web */
export default class Alerts {
    /** @description the generic, and most common Comfirm Btn accross MBE web */
    getGenericConfirmBtn: Selector;

    /** @description the generic, and most common Cancel Btn accross MBE web */
    getGenericCancelBtn: Selector;

    // AWI/DWI\
    /** @description any error popups on the page */
    errorPopUp: Selector;

    /** @description the create btn in the WI create menu */
    getAWICreateBtn: Selector;

    /** @description the cancel btn in the WI create menu */
    getAWICancelBtn: Selector;

    /** @description part number input in the Wi create menu */
    getAWIPartNumberInput: Selector;

    /** @description title input in wi create menu */
    getAWIWorkItemTitleInput: Selector;

    /** @description descrption input in wi create menu */
    getAWIDescriptionInput: Selector;

    /** @description revision input in the wi create menu */
    getAWIRevisionInput: Selector;

    /** @description version inpout in the WI create menu */
    getAWIVersionInput: Selector;

    /** @description any model form */
    getModalForm: Selector

    /** @description the slider in the wi create menu */
    editslider: Selector;

    /** @description the input for location in the wi creat emenu */
    editlocation: Selector;

    /** @description the input for the relese status of the wi create menu */
    editreleasestatus: Selector;

    /** @description relese status input for wi create menu */
    relesceStatusInput: Selector;

    /** @description the annark login the upper right */
    getAnarkLogo: Selector;

    /** @description a specific error for dupliciutes */
    WIDuplicateError: Selector;

    /** @description unknown */
    getAWIIsLatestVersionInput: Selector;

    /** @description the location input of the WBEweb create wi from */
    locationInput: Selector;

    /** @description the consturctor class used to represent alerts accross MBE web */
    constructor() {
      this.WIDuplicateError = Selector('span.error.processStepTitleInlineError.active');
      this.errorPopUp = Selector('span.error');
      this.getGenericConfirmBtn = Selector('button.btn').filter('.createButtons-submit');
      this.getGenericCancelBtn = Selector('button.btn').filter('.createButtons-cancel');
      this.getAnarkLogo = Selector('span.navbar-brand');
      /** @deprecated */
      this.getAWIWorkItemTitleInput = Selector('input#title');
      /** @deprecated */
      this.getAWIDescriptionInput = Selector('textarea#description');

      this.getAWIPartNumberInput = Selector('div[data-property=partnumber]').find('input');
      this.getAWIRevisionInput = Selector('div[data-property=revision]').find('input');
      this.getAWIVersionInput = Selector('div[data-property=version]').find('input');
      this.getAWIIsLatestVersionInput = Selector('div[data-property=islatestrevision]').find('input');
      this.locationInput = Selector('div[data-property=location]').find('input');
      this.getModalForm = Selector('form#modalForm');
      this.editlocation = Selector('div[data-property=location]').find('input');
      this.relesceStatusInput = Selector('div[data-property=release_status]').find('input');
      this.editreleasestatus = Selector('div[data-property=release_status]').find('input');

      this.editslider = Selector('span.checkbox-switch-slider');
    }

    /** @deprecated no longer used */
    getlocationbutton(num) {
      this.getAWIDescriptionInput;
      const util = new Util();

      const split = num.split(' ');
      const num2 = parseInt(split[0], 10);
      if (util.Verbose)console.log(`--getStatusDropDown split =${split}`);

      if (util.Errors && num2 > 4) { console.log('-getlocationbutton() alerts.ts was given a number greater than 4'); return null; }
      return Selector('span[data-property=location]').child('.singleSelectDropdown').child('.css-26l3qy-menu').child()
        .child(num2);
    }

    /**
     *
     * @param form 1-8 number assosiated with the form of a wi in the wi create menu t ofill
     * @param text the text to fill the field with
     * @param workItem the work item object
     * @returns nulls
     */
    async FillForm(form, text, workItem: WI) {
      const sharedElements = new SharedElements();
      await sharedElements.getCurrentInputs();
      switch (form) {
        case 1:
          await t
            .click(sharedElements.genericTitleInput)
            .typeText(sharedElements.genericTitleInput, text)
            .expect(sharedElements.genericTitleInput.value).eql(text);
          break;
        case 2:
          await t
            .click(sharedElements.genericDescInput)
            .typeText(sharedElements.genericDescInput, text)
            .expect(sharedElements.genericDescInput.value).eql(text);
          break;
        case 3:
          await t
            .expect(this.getAWIVersionInput.exists).eql(true)
            .click(this.getAWIVersionInput)
            .typeText(this.getAWIVersionInput, text)
            .expect(this.getAWIVersionInput.value)
            .eql(text);
          break;

        case 4:
          await t
            .click(this.getAWIRevisionInput)
            .typeText(this.getAWIRevisionInput, text)
            .expect(this.getAWIRevisionInput.value).eql(text);
          break;
        case 5:

          await t
            .click(this.getAWIPartNumberInput)
            .typeText(this.getAWIPartNumberInput, text)
            .expect(this.getAWIPartNumberInput.value).eql(text);
          break;
        case 6:
          await t
            .expect(this.editslider.exists).eql(true)
            .click(this.editslider);
          break;
        case 7:
          // eslint-disable-next-line no-case-declarations
          const util2 = new Util();
          await t
            .expect(this.locationInput.exists).eql(true)
            .click(this.locationInput)
            .typeText(this.locationInput, workItem.Location);

          if (util2.Verbose)console.log('--fillform-alerts "7" was passed, ignoring location dropdown currently');
          return;
        case 8:
          await t
            .expect(this.relesceStatusInput.exists).eql(true)
            .click(this.relesceStatusInput)
            .typeText(this.relesceStatusInput, workItem.releasestatus);

          break;

        default:
          console.log('please enter a number 1-5');
          break;
      }
    }
}
