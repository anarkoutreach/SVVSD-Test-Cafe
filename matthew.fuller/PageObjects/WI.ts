import { Selector, t } from 'testcafe';
import * as fs from 'fs';
import Util from '../Utilities/util';
import UPLOAD from './PageComponents/Upload';
import WISteps from './PageComponents/WISteps';
import Alerts from './Alerts';
import { location } from './PageComponents/location';
import { status } from './PageComponents/releasestatus';
import { WORKITEMTAB } from './PageComponents/WITAB';
import SharedElements from './sharedElements';

const util = new Util();
// everything (in this file) is documented in JSDOCs YAY!!!!
/**
 * @description A class representing a WorkItem on MBEWeb
 */
export default class WI {
    // selectors
    /** @description total added Context? */
    AddedContextsHoverText: Selector;

    /** @description the workitem tab of the WI */
    WorkitemTab: Selector;

    /** @description the user tab button of the WI */
    UserTab: Selector;

    /** @description the content tab button of the WI */
    ContentTab: Selector;

    /** @description the Upload tab button of the WI */
    UploadTab: Selector;

    /** @description probably the active tab of the WI? */
    getDWItab: Selector;

    /** @description the location of the WI */
    Location: location;

    /** @description The selected step's editable input */
    getSelectedStepInput: Selector;

    /** @description a blank selector */
    self: Selector;

    /** @description A DOM element that conatins a non-editable title of the current WI */
    wiTitle: Selector;

    /** @description A dom element that contains the name of a work item while in view mode */
    wiViewTitle: Selector;

    /** @description The Editable field that represents the WI's Title */
    editWITitle: Selector;

    /** @description  the editable field that contains to WIDescription */
    editWIDescription: Selector;

    /** @description The settings gear, that allows the edit,
     * revise, delete options to be seen on a WI */
    settingsGearBtn: Selector;

    /** @description The settings gear, that allows the view, revise,
     * delete options to be seen on a WI the button when in the "view"
     * mode is different from the "edit" mode this one appears in edit */
    settingsGearBtnEdit: Selector;

    /** @description The DOM element that contains the settings gear panel options */
    settingsGearPanel: Selector;

    /** @description The DOM element that contains the settings
     * gear panel options !In the Edit Mode */
    settingsGearPanelEdit: Selector;

    /** @description Once the setting gear has been clicked,
     * this represents the revise button within it */
    settingsGearPanelRevise: Selector;

    settingsGearPanelReviseEdit: Selector;

    /** @description Once the setting gear has been clicked,
     * this represents the delete button within it */
    settingsGearPanelDelete: Selector;

    settingsGearPanelDeleteEdit: Selector;

    /** @description Once the setting gear has been clicked,
     * this represents the view button within it */
    settingsGearPanelView: Selector;

    settingsGearPanelViewEdit: Selector;

    /** @description the DOM element that contains all the steps of a WI */
    processStepsPanel: Selector;

    /** @description the "plus" button next at the bottom of the step list of a WI,
     *  allowing the user to add a step */
    appendProccessStep: Selector;

    /** @description The currently active step within a wi */
    activeStep: Selector;

    /** @description A selector representing all steps within a WI,
     * selecting all li.stepitem objects */
    allsteps: Selector;

    /** @description The button to upon the menu for adding context to a step within a WI */
    addContext: Selector;

    /** @description the input field for an upload title within the "upload tab" of a wi */
    UploadTitle: Selector;

    /** @description the "Previous" button a the bottom of the "User/Owner" tab of a WI */
    UserPagePrevBtn: Selector;

    /** @description the description TextArea field of a Upload within the Upload tab of a WI */
    UploadDescription: Selector;

    /** @description the  "Choose" button,
     * the button used to select what files to upload within the "upload" tab of a WI */
    UploadFileBtn: Selector;

    /** @description the "submit" button at the buttom of the "upload" tab of a WI */
    SubmitUploadFileBtn: Selector;

    /** @description Inside of the menu to add context, this selector refers to all context items */
    ContextFiles: Selector;

    /** @description the "next" btn at the buttom of the user tab of a WI */
    UserPageNextBtn: Selector;

    /** @description the btn that will show the top drop down within WI */
    smallAnarkLogo: Selector;

    // attributes
    /** @description the title of a WI */
    title: string;

    /** @description the description of a WI */
    description: string;

    /** @description the partnumber of a WI */
    partnum: string;

    /** @description the revision of a WI */
    revision: string;

    /** @description the version of a WI */
    version: string;

    /** @description the release status of a WI */
    releasestatus: status;

    // emmiter
    /**
     * @description a event emitter sent to every WI allowing WIs
     *  to write to a file when the function of Update is fired,
     *  by doing so, even if a user creates a new WI object
     *  they may retain the properties of the last if needed
     *
     *be careful using this.
     */
    FeedPageEventEmitter;

    // -arrays

    // "STEPS" --an array containg all steps on this WI.
    /** @description an array containing all steps within a WI */
    steps: WISteps[];

    /** @description An array containing all Uploads within a WI */
    Uploads: UPLOAD[];

    allButtons: Selector;

    /**
     * @description the constructor for the WI object, representing a Workitem on MBEWeb
     */
    constructor() {
      this.allButtons = Selector('button.addButton.btn.btn-primary');
      this.wiViewTitle = Selector('div.WIPlayerTopToolbarFirstRow');
      this.smallAnarkLogo = Selector('#WIPlayerMetadataDrawerButton');
      this.Uploads = [];
      this.AddedContextsHoverText = Selector('div.contextItemHoverInfo');
      this.ContextFiles = Selector('img.img-responsive');
      this.SubmitUploadFileBtn = Selector('button#uploadFileButton');
      this.UploadFileBtn = Selector('input#uploadFile');
      this.UploadTitle = Selector('input#uploadTitle');
      this.UploadDescription = Selector('textarea#uploadDescription');
      this.addContext = Selector('div.addContextPlusContainer');
      this.releasestatus = status.DRAFT;
      this.Location = location.BOULDER;
      this.steps = [];
      this.editWITitle = Selector('#dwiTitleInput');
      this.editWIDescription = Selector('#dwiDescription');
      this.wiTitle = Selector('div#dwiTitle');
      this.getDWItab = Selector('#DWIProcessStepListScrollParent');
      this.getSelectedStepInput = Selector('#DWIProcessStepListScrollParent .stepItem.selectedStep').child().filter('input');
      this.description = 'i am a generic description';
      this.title = 'this is a generic title';
      this.settingsGearBtn = Selector('#dwiSettings');
      this.settingsGearBtnEdit = Selector('button#dwiSettings');
      this.partnum = '123456789';
      this.revision = '123456789';
      this.version = '123456789';
      this.settingsGearPanel = Selector('.dropdown-menu.dropdown-menu-right');
      this.settingsGearPanelEdit = Selector('.dropdown-menu.dropdown-menu-right');
      this.settingsGearPanelEdit = this.settingsGearPanel.child('li').withText('Edit Work Item').child();
      this.settingsGearPanelRevise = this.settingsGearPanel.child().withText('Delete Work Item').child();
      this.settingsGearPanelDelete = this.settingsGearPanel.child().withText('Delete Work Item').child();
      this.settingsGearPanelView = this.settingsGearPanel.child().withText('View Work Item').child();
      this.settingsGearPanelReviseEdit = this.settingsGearPanelEdit.child().withText('Delete Work Item').child();
      this.settingsGearPanelDeleteEdit = this.settingsGearPanelEdit.child().withText('Delete Work Item').child();
      this.settingsGearPanelViewEdit = this.settingsGearPanelEdit.child().withText('View Work Item').child();
      this.processStepsPanel = Selector('#DWIProcessStepListScrollParent');
      this.appendProccessStep = this.processStepsPanel.child('.appendProcessStep');
      this.activeStep = this.processStepsPanel.child('.stepItem.selectedStep');
      this.allsteps = Selector('li.stepItem');
      this.title += util.randChar(40);
      this.WorkitemTab = Selector('#dwiTabs-tab-WorkItem');
      this.UserTab = Selector('#dwiTabs-tab-User');
      this.ContentTab = Selector('#dwiTabs-tab-Content');
      this.UploadTab = Selector('#dwiTabs-tab-Upload');
      this.UserPageNextBtn = Selector('button#next');
      this.UserPagePrevBtn = Selector('button#prev');
    }

    /** @description Clicks the "append child step" btn, on an existing step.
 * @param {WISteps} SelectedStep The step, that the child step should be added to
 * @return null
 */
    async addChildStepToStep(SelectedStep: WISteps, step: WISteps) {
      const selectedstep = await this.GetStep(SelectedStep.StepNum);
      await t
        .expect(selectedstep.exists).eql(true)
        .hover(selectedstep)
        .expect(selectedstep.child('.stepItemRightButtons').exists)
        .eql(true)
        .click(selectedstep.child('.stepItemRightButtons'));

      await this.AddStep(true, step, false, true);
      await this.CatalogSteps();
      await this.FeedPageEventEmitter.Update();
    }

    /** @description Verifies if a Context item is shown
    * @param {string} ContextName A string, representing the name of the context item to be verified
    * @return promise<Bool>
    */
    async VerifyContextIsShown(ContextName: string) {
      return new Promise(async (resolve) => {
        const num = await this.AddedContextsHoverText.count;
        let i = 0;
        const title = await this.AddedContextsHoverText.nth(i).innerText;
        let ContextIsPresent = false;
        for (i; i < num; i += 1) {
          if (await title.toLocaleUpperCase().includes(await ContextName.toLocaleUpperCase())) {
            ContextIsPresent = true;
            if (util.Verbose) console.log('--VerifyContextIsShown, context is present');
          }
        }

        if (i >= num) {
          resolve(ContextIsPresent);
        }
      });
    }

    /** @description presses the button to add a content item to a workitem, from the CONTENT TAB.
     *
     * * !MUST BE USED FROM CONTENT TAB
     *
     * Note: The "Content" and "User" tabs are almost identical,
     * the Content scripts are reused in the User scripts.
    * @param {number} num the number representing the spot in a
    * zero based index to add to the work-item.
    * @return null
    */
    async AddContentByIndex(num: number) {
      await t
        .expect(this.allButtons.nth(num).exists).eql(true)
        .click(this.allButtons.nth(num))
        .expect(this.allButtons.nth(num).exists)
        .eql(true)
        .click(this.allButtons.nth(num))
        .expect(Selector('span.error.active').exists)
        .eql(true);
    }

    /** @description Clicks the "Next" Btn at the bottom of the User tab of a WI.
    * @return null
    */
    async ClickNextUserPageBtn() {
      /** * @description This Selector represents the first
       * "userdata" object, on a page, found based upon the "allbuttons" selector */
      const FirstUserData = this.allButtons.nth(0).parent('div').sibling('article.search-result.row').child('div.searchItemInfo')
        .child('ul')
        .child('li')
        .nth(0)
        .child('span.small.text-muted').innerText;
      const FirstUserName = await FirstUserData;
      await t
        .expect(this.UserPageNextBtn.exists).eql(true)
        .click(this.UserPageNextBtn);
      if (util.Verbose) {
        console.log(` -- clickNextUserPageBtn: original page first username: ${FirstUserName}  second page name:  ${await this.allButtons.nth(0).parent('div').sibling('article.search-result.row').child('div.searchItemInfo')
          .child('ul')
          .child('li')
          .nth(0)
          .child('span.small.text-muted').innerText}`);
      }
      await t
        .expect(FirstUserName === await this.allButtons.nth(0).parent('div').sibling('article.search-result.row').child('div.searchItemInfo')
          .child('ul').innerText).eql(false);
    }

    /** @description Clicks the "Prev" Btn at the bottom of the User tab of a WI.
    * @return null
    */
    async ClickPrevUserPageBtn() {
      const allbuttons = Selector('button.addButton.btn.btn-primary');
      const FirstUserData = allbuttons.nth(0).parent('div').sibling('article.search-result.row');
      const FirstUserName = await FirstUserData.child('div.searchItemInfo').child('span').innerText;
      await t
        .expect(this.UserPagePrevBtn.exists).eql(true)
        .click(this.UserPagePrevBtn);
      if (util.Verbose) {
        console.log(` -- clickPrevUserPageBtn: original page first username: ${FirstUserName}  second page name:  ${await allbuttons.nth(0).parent('div').sibling('article.search-result.row').child('div.searchItemInfo')
          .child('ul')
          .child('li')
          .nth(0)
          .child('span.small.text-muted').innerText}`);
      }
      await t
        .expect(FirstUserName === await allbuttons.nth(0).parent('div').sibling('article.search-result.row').child('div.searchItemInfo')
          .child('ul')
          .child('li')
          .nth(0)
          .child('span.small.text-muted').innerText).eql(false);
    }

    /** @description presses the button to add a user to a workitem, from the USER TAB.
     *
     * !MUST BE USED FROM USER TAB
     *
     * Note: This script just runns the Identical "AddContentByIndex" script
     *
    * @param {number} num the number representing the spot in
    * a zero based index to add to the workitem.
    * @return null
    */
    async AddUserByIndex(num: number) {
      await this.AddContentByIndex(num);
    }
    /**
     * @description Adds all active users to a WorkItem, from all pages.
     *
     * !MUST BE USED FROM USER TAB
     *
     * Note: each page of users take 10 sec to add, 100+ will realy start to slow stuff down.
     *
     * @returns null
     *
    */

    async AddAllAvalibleUsers() {
      // only the first page
      while (this.UserPageNextBtn.exists) {
        await this.AddAllAvalibleContent();
        if (this.UserPageNextBtn.exists) await this.ClickNextUserPageBtn();
      }
    }

    /**
     * @description Adds the first page (10) users to a Workitem.
     *
     * !MUST BE USED FROM USER TAB
     *
     * @returns null
     */
    async AddFirstPageOfUsers() {
      // only the first page
      await this.AddAllAvalibleContent();
    }

    /**
     * @description Removes a user from a WI by a specified index
     *
     * !MUST BE USED FROM USER TAB
     *
     * Note: The index for removing a user is the list of added users -IE:
     * if you add a user with index of 3
     * its idex will not stay the same to remove, as it is in a different list
     *
     * @param {number} num the position in a zero based index that
     * correlates to the user to remove.
     * @returns null
     */
    async RemoveUserByIndex(num: number) {
      const userdata = this.allButtons.nth(num).sibling('.searchItemInfo');
      const username = await userdata.child('span').innerText;

      await t
        .expect(this.allButtons.nth(num).exists).eql(true)
        .click(this.allButtons.nth(num))
        .expect(Selector('button#okayConfirm').exists)
        .eql(true)
        .click(Selector('button#okayConfirm'))
        .expect(username === await this.allButtons.nth(num).sibling('.searchItemInfo').child('span').innerText)
        .eql(true);
    }

    /**
     * @description adds the first page of content items to a WI item
     *
     * !MUST BE USED FROM WORKITEM TAB
     *
     * @returns null
     */
    async AddAllAvalibleContent() {
      // only the first page
      const count = await this.allButtons.count;
      for (let i = 0; i < count; i += 1) {
        await t
          .expect(this.allButtons.nth(i).exists).eql(true)
          .click(this.allButtons.nth(i))
          .expect(this.allButtons.nth(i).exists)
          .eql(true)
          .click(this.allButtons.nth(i));
        const alertAppears = Selector('span.error.active').exists;
        const contentAdded = (await alertAppears === true);
        await t
          .expect(contentAdded).eql(true);
      }
    }

    /**
     * @description Removes a content item from a WI based on a zero based index
     *
     * !MUST BE USED FROM CONTENT TAB
     * @param {number} num the possition in a zero based index to remove
     * @returns null
     */
    async RemoveContentByIndex(num: number) {
      await t
        .expect(this.allButtons.nth(num).exists).eql(true)
        .click(this.allButtons.nth(num))
        .expect(Selector('button#okayConfirm').exists)
        .eql(true)
        .click(Selector('button#okayConfirm'))
        .expect(this.allButtons.nth(num).exists)
        .eql(false);
    }

    /**
     * @description Uploads a file to a WI based upon an UPLOAD object
     *
     * Note: can be used from any tab, it will switch to the proper tab
     * @param {UPLOAD}Upload an "UPLOAD" object that represents the upload,
     * containing title, file, etc....
     * @returns null
     */
    async UploadFile(Upload: UPLOAD) {
      await this.SwitchWITAB(WORKITEMTAB.UPLOAD);
      await t
        .expect(this.UploadFileBtn.exists).eql(true)
        .setFilesToUpload(this.UploadFileBtn, [
          Upload.Files,
        ])
        .expect(this.UploadTitle.exists)
        .eql(true)
        .click(this.UploadTitle)
        .typeText(this.UploadTitle, Upload.Title)
        .expect(this.UploadDescription.exists)
        .eql(true)
        .click(this.UploadDescription)
        .typeText(this.UploadDescription, Upload.Description)
        .expect(this.SubmitUploadFileBtn.exists)
        .eql(true)
        .click(this.SubmitUploadFileBtn);
      if (this.Uploads.length > 0) {
        this.Uploads.forEach(() => {
          Upload.Index = this.Uploads.length + 1;
        });
      } else {
        Upload.Index = 0;
      }
      this.Uploads.push(Upload);
      await this.FeedPageEventEmitter.Update();
    }

    async UploadContext(upload) {
      await this.SwitchWITAB(WORKITEMTAB.UPLOAD);
      await this.UploadFile(upload);
      await this.SwitchWITAB(WORKITEMTAB.WORKITEM);
    }

    async AddContextToStep(step: WISteps, uplaod: UPLOAD) {
      const num = uplaod.Index;
      await this.CatalogSteps();
      const step2 = await this.GetStep(step.StepNum);
      await t
        .expect(step2.exists).eql(true)
        .click(step2)
        .expect(this.addContext.exists)
        .eql(true)
        .click(this.addContext)
        .expect(this.ContextFiles.exists)
        .ok({ timeout: 100000 })
        .expect(this.ContextFiles.nth(num).exists)
        .ok()
        .click(this.ContextFiles.nth(num))
        .expect(Selector('button[data-id="selectButton"]').exists)
        .eql(true)
        .click(Selector('button[data-id="selectButton"]'));
      await t.expect(await this.VerifyContextIsShown(uplaod.Title)).eql(true);
      await this.FeedPageEventEmitter.Update();
    }

    /**
     * @description changes a Workitem's description from the "edit mode" of a WI
     *
     * !MUST BE RUN INSIDE A WI THAT IS EDITABLE
     *
     * @param {WI} WorkItem a workitem object, representing the workitem to edit
     * @param {string} text a string of text represeting the new description of the work item.
     * @returns Promise<WI>
     */
    async EditWIDescription(WorkItem: WI, text: string) {
      await t
        .expect(this.editWIDescription.exists).eql(true)
        .click(this.editWIDescription);
      await util.CtlADelete(this.editWIDescription);
      await t
        .click(this.editWIDescription)
        .typeText(this.editWIDescription, text)
        .expect((await this.editWIDescription.innerText).includes(text)).ok;
      WorkItem.description = text;
      await this.FeedPageEventEmitter.Update();
      return WorkItem;
    }

    /**
     *  @description changes a Workitem's title from the "edit mode" of a WI
     *
     * !MUST BE RUN INSIDE A WI THAT IS EDITABLE
     * @param {WI} WorkItem a workitem object, representing the workitem to edit
     * @param {string} text a string of text represeting the new title of the work item.
     * @returns Promise<WI>
     */
    async EditWITitle(WorkItem: WI, text: string) {
      await t
        .expect(this.editWITitle.exists).eql(true)
        .click(this.editWITitle);
      await util.CtlADelete(this.editWITitle);
      await t
        .click(this.editWITitle)
        .typeText(this.editWITitle, text)
        .expect((await this.editWITitle.innerText).includes(text)).ok;
      WorkItem.title = text;
      await this.FeedPageEventEmitter.Update();
      return WorkItem;
    }

    /**
     * @description Verifies the title of a Workitem based upon the "title" attribute of a WI
     * @param {WI} WorkItem
     * @returns Promise<bool>
     */
    async VerifyWiTitle(WorkItem: WI) {
      const text = WorkItem.title;
      await t
        .expect(this.editWITitle.exists).eql(true)
        .expect(this.editWITitle.withText(text)).ok;
      if ((await this.editWITitle.innerText).includes(text)) {
        return true;
      }
      return false;
    }

    /**
     * @deprecated no longer a drop down
     * @description Gets the dropdown button to click from the Release status dropdown.
     *
     * @param {status} num An object from an Enum representing the status of the work item to return
     * @returns Promise<Selector> -the selector representing the status to click
     */
    // eslint-disable-next-line class-methods-use-this
    async getStatusDropDown(num: status) {
      const split = num.split(' ');
      if (util.Verbose)console.log(`--getStatusDropDown split =${split}`);
      const sharedElements = new SharedElements();
      return sharedElements.findGenericDropdownSelector('Release');
    }

    /**
     * @description returns a li.stepitem based upon a zero based index.
     * @param {number} num the possition in a zero based index to retrive
     * @returns Promise<Selector> -the wanted li.stepitem
     */
    // eslint-disable-next-line class-methods-use-this
    async GetStep(num: number) {
      if (util.Verbose)console.log(`-- GetStep: Returning step (from processStepsPanel) with a index of: ${num}`);
      return Selector('li.stepItem').nth(num);
    }

    /**
     * @description Counts all steps on the current page
     *
     * @returns promise<Number> -total number of steps
     */
    async CountSteps() {
      return this.allsteps.count;
    }

    /**
     * @description CatalogSteps() will add steps that are not in the "step array"
     * into the step array, thus keeping everything nice.
     *
     * Note: should be safe to run pretty much anywhere,
     * it is designed to run a as a safe gaurd to ensure the step array is up to date,
     * by using this, if any functions do not add a step to its array,
     * this will fix it
     *
     * @returns Promise<Bool>
     */
    async CatalogSteps() {
      let test1 = false;
      return new Promise(async (resolve) => {
        // eslint-disable-next-line no-shadow
        const gettempdata = new Promise(async (resolve) => {
          let tempdata;
          fs.readFile('./saved_data/ActiveWI.json', (err, data) => {
            if (err) throw err;
            tempdata = JSON.parse(data.toString());
            resolve(tempdata);
          });
        });
        let tempdata;
        await gettempdata.then((value) => {
          tempdata = value;
          test1 = true;
        });

        if (test1) {
          // this.allsteps = tempdata.allsteps;
          let finished = false;
          const NumOfSteps = await this.CountSteps();
          let i = 0;
          // eslint-disable-next-line no-empty
          if (this.steps.length >= tempdata.steps.length) {

          } else {
            this.steps = tempdata.steps;
          }

          if (this.steps.length < NumOfSteps) {
            for (i; i < NumOfSteps; i += 1) {
              await t
                .click(this.allsteps.nth(i));
              const step = new WISteps();
              step.StepName = await this.allsteps.nth(i).innerText;
              let stepExists = false;
              let existingStep : WISteps;
              this.steps.forEach(async (step9) => {
                if (step9.StepName.includes(step.StepName)) {
                  stepExists = true;
                  existingStep = step9;
                }
              });
              if (!stepExists) {
                step.StepNum = i;
                step.StepDescription = await step.editStepDescription.innerText;
                step.StepSafteyAndComplience = await step.editStepSafetyAndComplience.innerText;
                if (this.steps) { this.steps.push(step); }
                if (!this.steps) { this.steps.push(step); }
              } else {
                if (!existingStep.StepName) {
                  existingStep.StepName = await this.allsteps.nth(i).innerText;
                }
                existingStep.StepNum = i;
                if (!existingStep.StepDescription) {
                  existingStep.StepDescription = await step.editStepDescription.innerText;
                }
                if (!existingStep.StepSafteyAndComplience) {
                  // eslint-disable-next-line max-len
                  existingStep.StepSafteyAndComplience = await step.editStepSafetyAndComplience.innerText;
                }
              }
            }

            if (finished === false) {
              if (i >= NumOfSteps) {
                finished = true;
              }
            }

            if (finished === true) {
              await this.FeedPageEventEmitter.Update();
              resolve(finished);
            }
          } else {
            await this.FeedPageEventEmitter.Update();
            resolve(finished);
          }
        }
      });
    }

    /** @deprecated this would switch between verficiation to referance tab,
     * but that tab was removed */
    // eslint-disable-next-line class-methods-use-this
    async switchToReferanceTab() {
      await t
        .expect(Selector('#WIPlayerTabArea-tab-referenceinfo').exists).eql(true)
        .click(Selector('#WIPlayerTabArea-tab-referenceinfo'));
    }

    /**
     * @description Fills in the Description and Saftey and compliance
     * fields of a WorkitemStep based upon a WIsteps object
     * @param {WISteps} step the step object that will be used to provide
     * text for description and saftey and compliance.
     * @returns null
     */
    async FillallStepFields(step: WISteps) {
      await t
        .expect(step.editStepDescription.exists).eql(true)
        .typeText(step.editStepDescription, step.StepDescription)
        .expect(step.editStepSafetyAndComplience.exists)
        .eql(true)
        .typeText(step.editStepSafetyAndComplience, step.StepSafteyAndComplience);
      await this.FeedPageEventEmitter.Update();
    }

    /**
     * @description Clicks a tab at the top of a workitem based upon a number 0-3
     * @param {WORKITEMTAB} WItab a number 0-3 representing the workitem tab to switch to.
     *
    WORKITEM = "0",
    USERS = "1",
    CONTENT = "2",
    UPLOAD = "3"

    @returns null
     */
    async SwitchWITAB(WItab: WORKITEMTAB) {
      // eslint-disable-next-line default-case
      switch (WItab) {
        case '0':
          await t
            .expect(this.WorkitemTab.exists).eql(true)
            .click(this.WorkitemTab);
          break;

        case '1':
          await t
            .expect(this.UserTab.exists).eql(true)
            .click(this.UserTab);
          break;

        case '2':
          await t
            .expect(this.ContentTab.exists).eql(true)
            .click(this.ContentTab);
          break;

        case '3':
          await t
            .expect(this.UploadTab.exists).eql(true)
            .click(this.UploadTab);
          break;
      }
    }

    /**
     * @description Adds a new step to a WI (AppendStep Btn) then fills the
     * information and initalises the step into storage
     *
     *
     * @param {Boolean} BugWorkaround When a step is added, the user cannot add
     *  another step, until they have switched to a different wi tab and back.
     * If true, this will switch to a differnt tab and back, working around the bug.
     * @param {WISteps} step The step object that should be created then stored
     * into the array of all steps
     * @param {Boolean} letDuplicate Weathor or not the script will allow a
     * duplicate step to be created. If false, the script will add a -x to
     * the end of a duplicate name and contuine, logging a console warning.
     * @param {Boolean} StepIsAlreadyCreated Used in the case of adding a child step to a step
     * (skips creation the step, instead only adding data, and adding it to the array of steps)

     * @returns null
     */
    // eslint-disable-next-line max-len
    async AddStep(BugWorkaround: boolean, step: WISteps, letDuplicate: boolean, StepIsAlreadyCreated: boolean) {
      const workaroundbug = BugWorkaround;
      let StepExists: boolean;
      let NumOfSteps;
      if (this.steps) NumOfSteps = this.steps.length;
      let i;

      NumOfSteps = await this.CountSteps();

      for (i = 0; i > NumOfSteps; i += 1) {
        while (this.steps[i].StepName === step.StepName && letDuplicate === false) {
          if (util.Warnings)console.log('(Warnings) WI.ts-- AddStep: A step already exists with the text given -changing name with: "-i"');
          StepExists = true;
          step.StepName = `${step.StepName}-${i}`;
          StepExists = false;
        }
      }

      if (!StepExists && !letDuplicate) {
        if (!StepIsAlreadyCreated) {
          await t
            .click(this.appendProccessStep)
            .typeText(this.getSelectedStepInput, step.StepName)
            .pressKey('enter');
          this.validateText(step);
          // WiStep.StepNum = catalog Steps
          if (this.steps) this.steps.push(step);
          if (!this.steps) this.steps.push(step);
          if (!step.StepShouldNotHaveInformationFilled) await this.FillallStepFields(step);
          if (!workaroundbug) return;
        } else if (StepIsAlreadyCreated) {
          await t
            .typeText(this.getSelectedStepInput, step.StepName)
            .pressKey('enter');
          this.validateText(step);
          // WiStep.StepNum = catalog Steps
          if (this.steps) this.steps.push(step);
          if (!this.steps) this.steps.push(step);
          if (!step.StepShouldNotHaveInformationFilled) await this.FillallStepFields(step);
          await this.FeedPageEventEmitter.Update();
        }
      } else if (letDuplicate) {
        const alerts = new Alerts();

        await t
          .expect(this.appendProccessStep.visible).eql(true)
          .click(this.appendProccessStep)
          .expect(this.getSelectedStepInput.visible)
          .eql(true)
          .typeText(this.getSelectedStepInput, step.StepName)
          .pressKey('enter');
        const WIERRORDUPLICATECHECK = (await alerts.WIDuplicateError.innerText).includes('Step titles must be unique');
        await t
          .expect(alerts.WIDuplicateError.visible).eql(true)
          .expect(WIERRORDUPLICATECHECK).eql(true);

        const DuplicateErrorBool = this.TestDuplicteError(step, alerts);
        if (await DuplicateErrorBool === false) {
          if (this.steps) this.steps.push(step);
          if (!this.steps) this.steps.push(step);
          if (!step.StepShouldNotHaveInformationFilled) await this.FillallStepFields(step);
          await this.FeedPageEventEmitter.Update();
          if (!workaroundbug) return;
        }
      }
      if (workaroundbug) {
        NumOfSteps = await this.CountSteps();
        if (NumOfSteps > 0) step.StepNum = NumOfSteps - 1;
        if (NumOfSteps === 0) step.StepNum = NumOfSteps;
        // selects a different tab and then goes back to main tab to allow
        // new steps to be created easily
        await this.SwitchWITAB(WORKITEMTAB.USERS);
        await this.SwitchWITAB(WORKITEMTAB.WORKITEM);
        await this.CatalogSteps();
        const step2 = await this.GetStepByName(step);

        await t
          .expect(step2.exists).eql(true)
          .click(step2);
      }
    }

    /**
         * @description gets the selector of a step based upon its name attribute
         * @param {WISteps} step the step object to get information from
         * @returns Promise<Selector>
         */
    async GetStepByName(step: WISteps): Promise<Selector> {
      // eslint-disable-next-line consistent-return
      this.steps.forEach(async (step3) => {
        if (step3.StepName === step.StepName) { return this.GetStep(step.StepNum); }
      });
      return this.GetStep(0);
    }

    /**
         * @description test if duplicate step error appears?
         * @param {WISteps} step a wistep item
         * @param {Alerts} alerts
         */
    async TestDuplicteError(step: WISteps, alerts: Alerts) {
      await t
        .click(this.appendProccessStep);
      util.CtlADelete;
      const NumOfSteps = await this.CountSteps();
      let i;
      const DuplicateErrorBool: boolean = (await alerts.WIDuplicateError.innerText).includes('Step titles must be unique');

      for (i = 0; i > NumOfSteps; i += 1) {
        this.CatalogSteps();
        while (this.steps[i].StepName === step.StepName) {
          if (util.Errors)console.log('(errors) WI.ts-- AddStep: A step already exists with the text given -changing name with: "-i"');
          `${step.StepName}-${i}`;
        }
      }
      await t
        .typeText(this.getSelectedStepInput, step.StepName)
        .pressKey('enter')
        .expect(alerts.WIDuplicateError.exists).eql(false);

      return DuplicateErrorBool;
    }

    /**
         * @description checks if the name of a idiviual step object is the
         * same as a setp in the array
         * @param {WISteps} step the step that needs to be validated
         * @returns promise <bool>
         */
    private async validateText(step: WISteps) {
      let valid: boolean;
      let NumOfSteps;
      if (this.steps) NumOfSteps = this.steps.length;

      if (!NumOfSteps) { NumOfSteps = 0; if (util.Verbose)console.log('--AddStep: Number of steps equaled null, asineing zero'); }
      let i;
      for (i = 0; i > NumOfSteps; i += 1) {
        if (this.steps[i].StepName === step.StepName) {
          valid = true;
        }
      }
      return valid;
    }
}
