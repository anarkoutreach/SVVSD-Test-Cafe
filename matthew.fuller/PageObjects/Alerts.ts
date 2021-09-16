import { Selector, t } from 'testcafe';
import Util from '../Utilities/util';
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

    /** @description ?? */
    getModalForm: Selector

    /** @description the slider in the wi create menu */
    editslider: Selector;

    /** @description the input for location in the wi creat emenu */
    editlocation: Selector;

    /** @description the input for the relese status of the wi create menu */
    editreleasestatus: Selector;

    /** @description relese status input for wi create menu */
    realeasestatusdropdown: Selector;

    /** @description the annark login the upper right */
    getAnarkLogo: Selector;

    /** @description a specific error for dupliciutes */
    WIDuplicateError: Selector;

    /** @description unknown */
    getAWIIsLatestVersionInput: Selector;

    /** @description the consturctor class used to represent alerts accross MBE web */
    constructor() {
      this.WIDuplicateError = Selector('span.error.processStepTitleInlineError.active');
      this.errorPopUp = Selector('span.error.createButtons');
      this.getGenericConfirmBtn = Selector('#okayConfirm');
      this.getGenericCancelBtn = Selector('#cancelConfirm');
      this.getAnarkLogo = Selector('#navApp .navbar-brand');

      // AWI/DWI

      this.getAWICreateBtn = Selector('button#dwiOK');
      this.getAWICancelBtn = Selector('button.btn-default').withText('Cancel');

      this.getAWIWorkItemTitleInput = Selector('input#title');
      this.getAWIDescriptionInput = Selector('textarea#description');
      this.getAWIPartNumberInput = Selector('span[data-property=partnumber]').child('input');
      this.getAWIRevisionInput = Selector('span[data-property=revision]').child('input');
      this.getAWIVersionInput = Selector('span[data-property=version]').child('input');
      this.getAWIIsLatestVersionInput = Selector('span[data-property=islatestrevision]').child('input');
      this.getModalForm = Selector('form#modalForm');
      this.editlocation = Selector('span[data-property=location]').child('input');
      this.realeasestatusdropdown = Selector('span[data-property=release_status]').child('input');
      this.editreleasestatus = Selector('span[data-property=release_status]').child('input');

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
     * @param workitem the work item object
     * @returns nulls
     */
    async FillForm(form, text, workitem: WI) {
      switch (form) {
        case 1:
          await t
            .click(this.getAWIWorkItemTitleInput)
            .typeText(this.getAWIWorkItemTitleInput, text)
            .expect(this.getAWIWorkItemTitleInput.value).eql(text);
          break;
        case 2:
          await t
            .click(this.getAWIDescriptionInput)
            .typeText(this.getAWIDescriptionInput, text)
            .expect(this.getAWIDescriptionInput.value).eql(text);
          break;
        case 3:

          await t
            .click(this.getAWIPartNumberInput)
            .typeText(this.getAWIPartNumberInput, text)
            .expect(this.getAWIPartNumberInput.value).eql(text);
          break;

        case 4:
          await t
            .click(this.getAWIRevisionInput)
            .typeText(this.getAWIRevisionInput, text)
            .expect(this.getAWIRevisionInput.value).eql(text);
          break;
        case 5:

          await t
            .click(this.getAWIVersionInput)
            .typeText(this.getAWIVersionInput, text)
            .expect(this.getAWIVersionInput.value).eql(text);
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
            .expect(this.editlocation.exists).eql(true)
            .click(this.editlocation)
            .typeText(this.editlocation, workitem.Location);

          if (util2.Verbose)console.log('--fillform-alerts "7" was passed, ignoring location dropdown currently');
          return;
        case 8:
          await t
            .expect(this.editreleasestatus.exists).eql(true)
            .click(this.editreleasestatus)
            .typeText(this.editreleasestatus, workitem.releasestatus);

          break;

        default:
          console.log('please enter a number 1-5');
          break;
      }
    }
}
