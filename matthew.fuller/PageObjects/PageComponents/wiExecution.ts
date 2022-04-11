/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { Selector, t } from 'testcafe';
import { VerificationTypes } from './VerificationTypes';
import WIStepVerificationInfo from './WIStepVerificationInfo';
import Util from '../../Utilities/util';
import SharedElements from '../sharedElements';
import WI from '../WI';

const sharedElements = new SharedElements();
const util = new Util();
const types = VerificationTypes;
export default class WIExecution {
    /** @description the button to mark a step as completed */
    markCompletedBtn: Selector;

    /** @description the input for the pop-up when a user creates a new executions  */
    executionIndexInput: Selector;

    /** @description the button the create a new execution of a workitem */
    wiComfrimbtn: Selector;

    /** @description the button to save and submit a execution */
    wiSaveAndSubmitBtn: Selector;

    /** @description the selector for the serial number data in the info tab */
    serialNumber: Selector;

    /** @description the current execution within the switch execution menu */
    currentExecution: Selector;

    /** @description a list of the execution selectors */
    allExecutions: Selector;

    // selectors for the verification step inputs in exeuction mode

    /** @description the selector for text verification steps in exeuction */
    textVerificationInput: Selector;

    /** @description the selector for number verification steps in exeuction */
    numberVerificationInput: Selector;

    /** @description the selector for date verification steps in exeuction */
    dateVerificationInput: Selector;

    /** @description the selector for dropdown verification steps in exeuction */
    dropDownVerificationInput: Selector;

    /** @description the selector for multiselect verification steps in exeuction */
    multiselectVerificationInput: Selector;

    /** @description the selector for file verification steps in exeuction */
    fileVerificationInput: Selector;

    /** @description the selector for checkbox verification steps in exeuction */
    checkboxVerificationInput: Selector;

    constructor() {
      this.allExecutions = Selector('#continueWI').find('tr');
      this.currentExecution = Selector('tr.currentExecution');
      this.serialNumber = Selector('tr.propertyEditor').withAttribute('data-property', 'serialnumber').child('td.propertyEditorData').child('input');
      this.wiSaveAndSubmitBtn = Selector('button.btn.btn-warning').withText('SAVE & SUBMIT WORK ITEM');
      this.wiComfrimbtn = Selector(sharedElements.genericCreateBtn.withText('Execute'));
      this.markCompletedBtn = Selector('button.btn.btn-success').withText('MARK COMPLETED');
      this.executionIndexInput = Selector('input.form-control').withAttribute('placeholder', 'String');

      this.numberVerificationInput = Selector('input').withAttribute('placeholder', /number/gi);
      this.textVerificationInput = Selector('input').withAttribute('placeholder', /text/gi);
      this.dateVerificationInput = Selector('input').withAttribute('placeholder', /date/gi);
      this.checkboxVerificationInput = Selector('span.checkbox-switch-slider');
    }

    /** @description create new execution in execution */
    async createNewExecution(num) {
      await this.openSwitchExecutionMenu();
      await this.typeAndSubmitExecutionSerialNumber(num);
    }

    /**
     * @description fills the nth verification type of the type specified
     * @param num the nth from the top to fill (base 0)
     * @param type the type of the verification step
     * @param text the text to fill the verification step with
     */
    async fillNthVerificationStep(num: number, type:VerificationTypes, text:string) {
      async function expectAndFill(selector:Selector, s:string) {
        await t.expect(selector.visible).ok();
        await t.typeText(selector, s);
      }
      switch (type) {
        case VerificationTypes.TEXT:
          await expectAndFill(this.textVerificationInput.nth(num), text);
          break;

        case VerificationTypes.NUMBER:
          await expectAndFill(this.numberVerificationInput.nth(num), text);
          break;

        case VerificationTypes.DATE:
          await expectAndFill(this.dateVerificationInput.nth(num), text);
          break;

        case VerificationTypes.DROPDOWN:
          await expectAndFill(this.dropDownVerificationInput.nth(num), text);
          break;

        case VerificationTypes.MULTISELECT:

          break;

        case VerificationTypes.FILE:

          break;

        case VerificationTypes.CHECKBOX:

          break;

        default:
          break;
      }
    }

    /** @description click the current execution based on its selector in switch menu */
    async clickCurrentExecutionInSwitch() {
      await t
        .expect(this.currentExecution.visible).eql(true)
        .click(this.currentExecution);
    }

    /**
     * @description click the nth execution based on its selector in switch menu
     * @param num the nubmer of the serial number
    */
    async clickNthExecutionInSwitch(num) {
      await t
        .expect(this.allExecutions.nth(num).visible).eql(true)
        .click(this.allExecutions.nth(num));
    }

    /**
     * @description click the nth execution based on its selector in switch menu
     * @param num the nubmer of the serial number
    */
    async clickExecutionInSwitchBySerialNumber(num) {
      for (let index = 0; index < await this.allExecutions.count; index += 1) {
        const execution = this.allExecutions.nth(index);
        console.log(await execution.innerText);
        if (await parseInt(await execution.innerText, 10) === num) {
          await t.click(execution);
        }
      }
    }

    /** @description clcik the markCompletedBtn once */
    async markCurrentStepAsCompleted() {
      await t.click(this.markCompletedBtn);
    }

    /** @description loop clicking the mark completed button until it disapears or is greyed out */
    async markAllStepsAsCompleted() {
      while (await this.markCompletedBtn.visible === true && await this.markCompletedBtn.withAttribute('disabled').exists === false) {
        await t.click(this.markCompletedBtn);
      }
    }

    /** @description open the info tab of an execution */
    async openInfoTab() {
      await t
        .expect(sharedElements.infoIcon.visible).eql(true)
        .click(sharedElements.infoIcon);
    }

    /** @description open the info tab of an execution and return the serial number */
    async getSerialNumber() {
      await this.openInfoTab();
      await t.expect(this.serialNumber.visible).eql(true);
      return this.serialNumber.value;
    }

    /** @description click the save and submit btn */
    async saveAndSubmitExecution() {
      await t
        .expect(this.wiSaveAndSubmitBtn.visible).eql(true)
        .click(this.wiSaveAndSubmitBtn);
    }

    /**
     * @description type the serial number adn then press confirm
     * @param num the nubmer of the serial number
    */
    async typeAndSubmitExecutionSerialNumber(num) {
      await t
        .expect(this.executionIndexInput.visible).eql(true)
        .typeText(this.executionIndexInput, num.toString())
        .click(this.wiComfrimbtn);
    }

    /**
     * @param num the nubmer of the serial number
     * @description start an execution of the workitem the user is currently on
     */

    async startExecutionFromWIPage(num) {
      await t.click(sharedElements.genericCog);
      await t.click(sharedElements.findGenericDropdownSelector('Execute Work Item'));
      await this.typeAndSubmitExecutionSerialNumber(num);
      await t.expect(this.markCompletedBtn.visible).eql(true);
    }

    /** @description click the cog button and then the switch execution btn */
    async openSwitchExecutionMenu() {
      await t.click(sharedElements.genericCog);
      await t.click(sharedElements.findGenericDropdownSelector('Switch'));
    }

    /** @description from a active execution click the cog and delete the current execution */
    async cancelAndDeleteExecution() {
      await t.click(sharedElements.genericCog);
      await t.click(sharedElements.findGenericDropdownSelector('Delete'));
      await t.expect(this.markCompletedBtn.visible).eql(false);
    }
}
