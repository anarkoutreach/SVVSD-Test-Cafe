import { Selector, t } from 'testcafe';
import { VerificationTypes } from './VerificationTypes';
import WIStepVerificationInfo from './WIStepVerificationInfo';
import Util from '../../Utilities/util';
import SharedElements from '../sharedElements';

const util = new Util();
const types = VerificationTypes;
export default class WISteps {
    StepShouldNotHaveInformationFilled = false;

    StepInfoSideBar: Selector;

    StepNum: number;

    editStepDescription: Selector;

    editStepSafetyAndComplience: Selector;

    editStepVerification: Selector;

    StepName: string;

    StepDescription: string;

    StepSafteyAndComplience: string;

    StepVerifications: WIStepVerificationInfo[];

    verificationNewVerificationStep: Selector;

    verificationPanel: Selector;

    verificationstepsWIselector: Selector;

    verificationapendBtn: Selector;

    verificationsubmitBtn: Selector;

    fileExtention: Selector;

    verificationTab: Selector;

    instructionsTab: Selector;

    QPIDArea: Selector;

    QPIDBtn: Selector;

    verificationsteps: WIStepVerificationInfo[];

    genericStep: WIStepVerificationInfo;

    constructor() {
      const sharedElements = new SharedElements();
      this.StepNum = null;
      this.verificationsubmitBtn = sharedElements.genericCreateBtn;
      if (!this.StepShouldNotHaveInformationFilled) {
        this.StepSafteyAndComplience = `this is generic saftey${util.randChar(25)}`;
        this.StepDescription = `this is a generic step description${util.randChar(25)}`;
      }
      this.genericStep = new WIStepVerificationInfo(types.TEXT);
      this.QPIDArea = Selector('div.processStepCharacteristicMoreInfo').child('p');
      this.QPIDBtn = Selector('span.processStepCharacteristicMoreInfoButton').withText('Show QPID');
      this.instructionsTab = Selector('#WIPlayerTabArea-tab-referenceinfo');
      this.verificationTab = Selector('#WIPlayerTabArea-tab-execution');
      this.StepName = `this is a generic step name${util.randChar(10)}`;
      this.StepInfoSideBar = Selector('#DWIPlayerSideBar');
      this.editStepDescription = Selector('div.ql-editor').nth(0);
      this.editStepSafetyAndComplience = Selector('div.ql-editor').nth(1);
      this.verificationPanel = Selector('#DWIPlayerSideBar .DWIPlayerSectionContents');
      this.verificationNewVerificationStep = this.verificationPanel.child('.WIStepVerificationInfo');
      this.verificationstepsWIselector = Selector('div.characteristicEditor').filter('div');
      this.verificationapendBtn = Selector('a.editProcessStepCharacteristics');
      this.verificationsteps = [];
      this.fileExtention = Selector('label').withText('Accepted File Extensions:').sibling();

      if (util.Verbose) { console.log('--WIStepsConstructor: New WISteps created'); }
    }

    async openVerificationMenu() {
      await t
        .expect(this.verificationapendBtn.exists).eql(true)
        .click(this.verificationapendBtn);
    }

    /** @deprecated the tab in question no longer exists */
    async switchToVerificationTab() {
      await t
        .expect(this.verificationTab.exists).eql(true)
        .click(this.verificationTab);
      const str = await this.verificationTab.getAttribute('aria-selected');
      await t.expect(str === 'true').eql(true);
    }

    /** @deprecated the tab in question no longer exists */
    async switchToInstructionsTab() {
      await t
        .expect(this.instructionsTab.exists).eql(true)
        .click(this.instructionsTab);
      const str = await this.instructionsTab.getAttribute('aria-selected');
      await t.expect(str === 'true').eql(true);
    }

    async checkQPID() {
      await t
        .expect(this.QPIDBtn.exists).eql(true)
        .click(this.QPIDBtn);
      await t.expect(this.QPIDArea.visible).eql(true);
    }

    async closeQPID() {
      await t
        .expect(this.QPIDBtn.exists).eql(true)
        .click(this.QPIDBtn);
      await t.expect(this.QPIDArea.visible).eql(false);
    }

    async addVerificationStep(step: WIStepVerificationInfo) {
      await this.openVerificationMenu();
      // no default-case rule as the input for the switch is an enum
      // eslint-disable-next-line default-case
      switch (step.type) {
        case types.TEXT:
          await t
            .click(step.VerificationBtnText);
          break;
        case types.NUMBER:
          await t
            .click(step.VerificationBtnInteger);
          break;
        case types.DATE:
          await t
            .click(step.VerificationBtnDate);
          break;
        case types.CHECKBOX:
          await t
            .click(step.VerificationBtnCheckbox);
          break;
        case types.DROPDOWN:
          await t
            .click(step.VerificationBtnDropdown);
          break;
        case types.MULTISELECT:
          await t
            .click(step.VerificationBtnMultiSelect);
          break;
        case types.FILE:
          await t
            .click(step.VerificationBtnUpload)
            .typeText(this.fileExtention, '.pdf');
          break;
      }
      let i;
      const numOfSteps = await this.CountSteps();
      for (i = 0; i > numOfSteps; i += 1) {
        if (this.verificationsteps[i].name === step.name) {
          while (this.verificationsteps[i].name === step.name) {
            if (util.Errors)console.log('(errors) WI.ts-- AddStep: A step already exists with the text given -changing name with +5 rand char');
            step.name += util.randChar(5);
          }
        }
      }
      if (util.Verbose)console.log('--addverificationstep: adding index--');
      if (this.verificationsteps && this.verificationsteps.length > 0 && step) {
        step.IndexIgnoringType = this.verificationsteps[this.verificationsteps.length]
          .IndexIgnoringType + 1;
      }
      if (!this.verificationsteps && this.verificationsteps.length > 0)step.IndexIgnoringType = 0;
      if (util.Verbose)console.log('--addverificationstep: adding info--');
      await this.FillVerificationStepNameANDDescription(step);
      await t.expect(this.verificationsubmitBtn.exists).eql(true)
        .click(this.verificationsubmitBtn);
      if (util.Verbose)console.log('--addVerificationStep: Verifying step--');
      await this.openVerificationMenu();
      const varify = this.verifystep(step);
      await t.expect(await varify === true).eql(true);
      if (util.Verbose)console.log('--addVerificationStep: step verifyed -pushing verification step into array--');
      this.verificationsteps.push(step);
      await this.closeVerificationMenu();
    }

    async verifystep(step: WIStepVerificationInfo) {
      const NumSteps = await this.verificationstepsWIselector.count;
      let verifyed = false;
      if (util.Verbose)console.log(`--verifystep: verified?: ${verifyed} number of steps to verify: ${NumSteps}`);

      let i = 0;
      for (i; i < NumSteps; i += 1) {
        if (util.Verbose)console.log('--verifystep: verifying steps');
        const name = await Selector('input.characteristicEditorTitle').nth(i).value;
        if (name === step.name) verifyed = true;
      }
      return verifyed;
    }

    async closeVerificationMenu() {
      if (this.genericStep.VerificationMenuClose) {
        if (util.Verbose)console.log('--closeVerificationMenu: closing menu--');
        await t
          .expect(this.genericStep.VerificationMenuClose.exists).eql(true)
          .click(this.genericStep.VerificationMenuClose)
          .expect(this.genericStep.VerificationMenuClose.exists)
          .eql(false);
        if (util.Verbose)console.log('--closeVerificationMenu: menu closed--');
      } else if (util.Errors)console.log('colseVerificationMenu --menu already closed');
    }

    async FillVerificationStepNameANDDescription(step: WIStepVerificationInfo) {
      this.CountSteps();
      if (util.Verbose)console.log('--FillVerificationStepNameANDDESCRIPTION: filling description--');
      await t
        .expect(step.VerificationStepGeneralDescription.nth(step.IndexIgnoringType).exists)
        .eql(true)
        .click(step.VerificationStepGeneralDescription.nth(step.IndexIgnoringType))
        .typeText(step.VerificationStepGeneralDescription
          .nth(step.IndexIgnoringType), step.description);
      if (util.Verbose) {
        console.log(`--FillVerificationStepNameAndDescription: expected text: 
      "${step.description}"  actual text "
      ${await step.VerificationStepGeneralDescription.nth(step.IndexIgnoringType).textContent}"`);
      }
      await t
        .expect(
          await step.VerificationStepGeneralDescription
            .nth(step.IndexIgnoringType).textContent === step.description,
        ).eql(true);
      if (util.Verbose)console.log('--FillVerificationStepNameAndDescription: filled description--');
      if (util.Verbose)console.log('--FillVerificationStepNameAndDescription: filling title--');
      await t
        .expect(step.VerificationStepGeneralTitle.exists).eql(true)
        .click(step.VerificationStepGeneralTitle.nth(step.IndexIgnoringType))
        .pressKey('ctrl+a delete')
        .typeText(step.VerificationStepGeneralTitle.nth(step.IndexIgnoringType), step.name);
      if (util.Verbose) {
        console.log(`--FillVerificationStepNameAndDescription: expected text: "
      ${step.name}"  actual text "
      ${await step.VerificationStepGeneralTitle.nth(step.IndexIgnoringType).value}"`);
      }
      await t
        .expect(
          await step.VerificationStepGeneralTitle.nth(step.IndexIgnoringType).value === step.name,
        ).eql(true);
      if (util.Verbose)console.log('--FillVerificationStepNameAndDescription: filled title and description--');
    }

    async CountSteps() {
      if (this.genericStep.VerificationStepGeneralDescription.count) {
        if (util.Verbose)console.log(`--CountSteps: Function is returning VerificationStep count "${await this.genericStep.VerificationStepGeneralDescription.count}"`);
        return this.genericStep.VerificationStepGeneralDescription.count;
      }
      if (util.Verbose)console.log('--CountSteps: function could not find any Verification steps as such returned zero--');
      return 0;
    }

    async catalogSteps() {
      const NumSteps = await this.CountSteps();
      let i = 0;
      for (i; i < NumSteps; i += 1) {
        const step = new WIStepVerificationInfo(types.UNKNOWN);
        if (util.Verbose)console.log('--catalogSteps: cataloging preexisting VerificationSteps');
        step.description = await this.genericStep.VerificationStepGeneralDescription.nth(i)
          .innerText;
        step.name = await this.genericStep.VerificationStepGeneralTitle.nth(i).innerText;
        step.ID = await this.genericStep.VerificationStepGeneralID.nth(i).innerText;
        step.IndexIgnoringType = i;
        this.verificationsteps.push(step);
      }
    }
}
