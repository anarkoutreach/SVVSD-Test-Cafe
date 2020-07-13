import { Selector, t } from "testcafe";
import util from "../Utilities/util";
import { UPLOAD } from "../PageObjects/PageComponents/Upload"
import WISteps from "./PageComponents/WISteps";
const Util = new util();
import Alerts from "./Alerts";
import {location} from "./PageComponents/location";
import {status} from "./PageComponents/releasestatus";
import {WORKITEMTAB} from "./PageComponents/WITAB";
import * as fs from 'fs';

export default class WI {

    AddedContextsHoverText: Selector;
    WorkitemTab: Selector;
    UserTab: Selector;
    ContentTab: Selector;
    UploadTab: Selector;
    getDWItab: Selector;
    Location: location;
    getSelectedStepInput: Selector;
    self: Selector;
    wiTitle: Selector;
    title: string;
    description: string;
    partnum: string;
    revision: string;
    version: string;
    editWITitle: Selector;
    editWIDescription: Selector;
    settingsGearBtn: Selector;
    settingsGearPanel: Selector;
    settingsGearPanelEdit: Selector;
    settingsGearPanelRevise: Selector;
    settingsGearPanelDelete: Selector;
    processStepsPanel: Selector;
    appendProccessStep: Selector;
    activeStep: Selector;
    allsteps: Selector;
    addContext: Selector;
    steps: WISteps[];
    Uploads: UPLOAD[];
    UploadTitle: Selector;
    UploadDescription: Selector;
    UploadFileBtn: Selector;
    SubmitUploadFileBtn: Selector;
    ContextFiles: Selector;
    FeedPageEventEmitter;

    releasestatus: status;
    constructor() {
        this.Uploads = [];
        this.AddedContextsHoverText = Selector("div.contextItemHoverInfo");
        this.ContextFiles = Selector("img.img-responsive");
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
        this.wiTitle = Selector('#dwiTitle');
    this.getDWItab = Selector('#DWIProcessStepListScrollParent');
    this.getSelectedStepInput = Selector('#DWIProcessStepListScrollParent .stepItem.selectedStep').child().filter('input');
    this.description = "i am a generic description";
    this.title = "this is a generic title";
    this.settingsGearBtn = Selector("#dwiSettings");
    this.partnum = "123456789";
    this.revision = '123456789';
    this.version = "123456789";
    this.settingsGearPanel = this.settingsGearBtn.sibling("ul");
    this.settingsGearPanelEdit = this.settingsGearPanel.child(0).child();
    this.settingsGearPanelRevise = this.settingsGearPanel.child(1).child();
    this.settingsGearPanelDelete = this.settingsGearPanel.child().withText("Delete Work Item").child();
    this.processStepsPanel = Selector('#DWIProcessStepListScrollParent');
    this.appendProccessStep = this.processStepsPanel.child(".appendProcessStep");
    this.activeStep = this.processStepsPanel.child(".stepItem.selectedStep");
    this.allsteps = Selector("li.stepItem");
    this.title = this.title + Util.randchar(40);
    this.WorkitemTab = Selector("#dwiTabs-tab-WorkItem");
    this.UserTab = Selector("#dwiTabs-tab-User");
    this.ContentTab = Selector("#dwiTabs-tab-Content");
    this.UploadTab = Selector("#dwiTabs-tab-Upload");
    
    }

    async addChildStepToStep(SelectedStep: WISteps, step: WISteps){
        let selectedstep = await this.GetStep(SelectedStep.StepNum)
        await t
        .expect(selectedstep.exists).eql(true)
        .hover(selectedstep)
        .expect(selectedstep.child(".stepItemRightButtons").exists).eql(true)
        .click(selectedstep.child(".stepItemRightButtons"));

        await this.AddStep(true, step, false, true);
        await this.CatalogSteps();
        await this.FeedPageEventEmitter.Update();
    }
    async VerifyContentIsShown(ContextName){
        const UTIL = new util();
        var finished = false;
        var num = await this.AddedContextsHoverText.count;
        let i =0;
        let title = await this.AddedContextsHoverText.nth(i).innerText;
        var ContextIsPresnet = false;
        for(i; i < num; i++){
            if(await title.toLocaleUpperCase().includes(await ContextName.toLocaleUpperCase())){
                ContextIsPresnet = true;
                if(UTIL.Verbose) console.log("--VerifyContentIsShown, context is present")
            }
        }
        while(finished == false){
            if(i >= num){
                finished = true;
            }
        }
        if(finished == true){
        return ContextIsPresnet;
        }
    }
    async UploadFile(Upload: UPLOAD){
        await this.SwitchWITAB(WORKITEMTAB.UPLOAD);
        await t 
        .expect(this.UploadFileBtn.exists).eql(true)
        .setFilesToUpload(this.UploadFileBtn, [
            Upload.Files
        ])
        .expect(this.UploadTitle.exists).eql(true)
        .click(this.UploadTitle)
        .typeText(this.UploadTitle, Upload.Title)
        .expect(this.UploadDescription.exists).eql(true)
        .click(this.UploadDescription)
        .typeText(this.UploadDescription, Upload.Description)
        .expect(this.SubmitUploadFileBtn.exists).eql(true)
        .click(this.SubmitUploadFileBtn);
        if(this.Uploads.length > 0){
        this.Uploads.forEach(up => {
            Upload.Index = this.Uploads.length + 1;
            if(Upload.Index > up.Index){
                return;
            }
        });
    }else{
        Upload.Index = 0;
    }
        this.Uploads.push(Upload);
        await this.FeedPageEventEmitter.Update();
    }
    async UploadContext(upload){
        await this.SwitchWITAB(WORKITEMTAB.UPLOAD);
        await this.UploadFile(upload);
        await this.SwitchWITAB(WORKITEMTAB.WORKITEM);
    }
    async AddContextToStep(step: WISteps, uplaod: UPLOAD){
        var num = uplaod.Index
        var stepshavebeencataloged = false;
        await this.CatalogSteps().then(value =>{
            if(value === true){
                stepshavebeencataloged = true;
            } else{
                stepshavebeencataloged = false;
            }
        });
        var step2 = await this.GetStep(step.StepNum);
        await t
        .expect(step2.exists).eql(true)
        .click(step2)
        .expect(this.addContext.exists).eql(true)
        .click(this.addContext)
        .expect(this.ContextFiles.nth(num)).ok()
        .click(this.ContextFiles.nth(num))
        .expect(Selector('button[data-id="selectButton"]').exists).eql(true)
        .click(Selector('button[data-id="selectButton"]'));
        await t.expect(await this.VerifyContentIsShown(uplaod.Title)).eql(true);
        await this.FeedPageEventEmitter.Update();
    }
    async EditWIDescription(WorkItem: WI, text: string){
        
        await t
        .expect(this.editWIDescription.exists).eql(true)
        .click(this.editWIDescription);
        await Util.CtlADelete(this.editWIDescription);
        await t
            .click(this.editWIDescription)
            .typeText(this.editWIDescription, text)
            .expect((await this.editWIDescription.innerText).includes(text)).ok;
        WorkItem.description = text;
        await this.FeedPageEventEmitter.Update();
        return WorkItem;
    }
    async EditWITitle(WorkItem: WI, text: string){
        
        await t
        .expect(this.editWITitle.exists).eql(true)
        .click(this.editWITitle);
        await Util.CtlADelete(this.editWITitle);
        await t
            .click(this.editWITitle)
            .typeText(this.editWITitle, text)
            .expect((await this.editWITitle.innerText).includes(text)).ok;
        WorkItem.title = text;
        await this.FeedPageEventEmitter.Update();
        return WorkItem;
    }
    async VerifyWiTitle(WorkItem: WI){
        var text = WorkItem.title;
        await t
        .expect(this.editWITitle.exists).eql(true)
        .expect(this.editWITitle.withText(text)).ok;
        if((await this.editWITitle.innerText).includes(text)){
            return true
        }else{
            return false;
        }
        
    }
    async getStatusDropDown(num: status){
        var split = num.split(" ")
        var num2 = parseInt(split[0]);
        if(Util.Verbose)console.log("--getStatusDropDown split =" + split);
        var alerts = new Alerts
        return alerts.realeasestatusdropdown.child(num2)
    }
    async GetStep(num: number){
        const Util = new util;
        if(Util.Verbose)console.log("-- GetStep: Returning step (from processStepsPanel) with a index of: " + num);
        //return Selector("#DWIProcessStepListScrollParent.WIProcessStepTreeRoot").child(".stepItem").nth(num);
        return Selector("li.stepItem").nth(num);
    }

    async CountSteps (){
        return await this.allsteps.count;
    }
    async CatalogSteps (){
        let test1 = false;
        return new Promise(async resolve => {
            var gettempdata = new Promise(async resolve =>{
                var tempdata;
                fs.readFile("C:\\Users\\mmful\\OneDrive\\MBEWeb - Testing\\git\\SVVSD-Test-Cafe\\matthew.fuller\\saved_data\\ActiveWI.json", (err, data) => {
                if (err) throw err;
                tempdata = JSON.parse(data.toString());
                    resolve(tempdata);
            });
            });
            let tempdata
            await gettempdata.then(value =>{
                 tempdata = value;
                 test1 = true;
            })

        if(test1){
        await tempdata.FeedPageEventEmitter.Update();
        this.allsteps = tempdata.allsteps;
            let finished = false;
            var NumOfSteps = await this.CountSteps();
            var i =0;
            if(this.allsteps.length < NumOfSteps){
            for(i; i < NumOfSteps; i++){
            await t
            .click(this.allsteps.nth(i));
            var step = new WISteps();
            step.StepName = await this.allsteps.nth(i).innerText;
            let stepExists = false;
            let existingStep : WISteps;
            this.steps.forEach(async step9 => {
                if(step9.StepName.includes(step.StepName)){
                    stepExists = true;
                    existingStep = step9;
                }
            })
            if(!stepExists){
            step.StepNum = i;
            step.StepDescription = await step.editStepDescription.innerText;
            step.StepSafteyAndComplience = await step.editStepSafetyAndComplience.innerText;
            if(this.steps)
            this.steps.push(step);
            if(!this.steps)
            this.steps.push(step);
            }else{
                if(!existingStep.StepName) existingStep.StepName = await this.allsteps.nth(i).innerText
                existingStep.StepNum = i;
                if(!existingStep.StepDescription) existingStep.StepDescription = await step.editStepDescription.innerText;
                if(!existingStep.StepSafteyAndComplience) existingStep.StepSafteyAndComplience = await step.editStepSafetyAndComplience.innerText;
            }
            }
    
            if(finished == false){
                if(i >= NumOfSteps){
                    finished = true;
                }
            }
            
            if(finished === true){
                await this.FeedPageEventEmitter.Update();
            resolve(finished);
            }
        }else{
            await this.FeedPageEventEmitter.Update();
            resolve(finished);
        }
    }
        })
        
        
    }
    async fixerthingythingthingy(finished, i, NumOfSteps){
        while(finished == false){
            if(i >= NumOfSteps){
                finished = true;
            }
        }
        if(finished == true){
        return finished;
        }
    }
    async FillallStepFields (step: WISteps){
        await t
        .expect(step.editStepDescription.exists).eql(true)
        .typeText(step.editStepDescription, step.StepDescription)
        .expect(step.editStepSafetyAndComplience.exists).eql(true)
        .typeText(step.editStepSafetyAndComplience, step.StepSafteyAndComplience);
        await this.FeedPageEventEmitter.Update();

       
    }
    async SwitchWITAB(WItab: WORKITEMTAB){
        switch(WItab){
            case "0":
            await t
            .expect(this.WorkitemTab.exists).eql(true)
            .click(this.WorkitemTab);
            break;

            case "1":
                await t
                .expect(this.UserTab.exists).eql(true)
                .click(this.UserTab);
            break;

            case "2":
                await t
                .expect(this.ContentTab.exists).eql(true)
                .click(this.ContentTab);
            break;

            case "3":
                await t
                .expect(this.UploadTab.exists).eql(true)
                .click(this.UploadTab);
            break;
        }

    }
    async CheckError(WiField){
        const alerts = new Alerts;
        await t
        .expect(alerts.errorPopUp.withText("empty"))
    }
    async AddStep (BugWorkaround: boolean, step: WISteps, letDuplicate: boolean, StepIsAlreadyCreated: boolean) {
       let workaroundbug = BugWorkaround;
        let StepExists: boolean;
        const Util = new util;
        if(this.steps)var NumOfSteps = this.steps.length;
        var i;
        
        NumOfSteps = await this.CountSteps();
        
        for(i = 0; i > NumOfSteps; i++)
        {
            while(this.steps[i].StepName == step.StepName && letDuplicate == false){
                if(Util.Errors)console.log("(errors) WI.ts-- AddStep: A step already exists with the text given -changing name with: \"-i\"");
                StepExists = true;
                step.StepName = step.StepName + "-"+ i;
                StepExists = false;
            }
        };
    
         
        if(!StepExists && !letDuplicate){
            if(!StepIsAlreadyCreated){
        await t
            .click(this.appendProccessStep)
            .typeText(this.getSelectedStepInput, step.StepName)
            .pressKey('enter');
            this.validateText(step);
            //WiStep.StepNum = catalog Steps
            if(this.steps)
            this.steps.push(step);
            if(!this.steps)
            this.steps.push(step);
            if(!step.StepShouldNotHaveInformationFilled)
            await this.FillallStepFields(step);
            if(!workaroundbug)return;
            } else if (StepIsAlreadyCreated){
                await t
                .typeText(this.getSelectedStepInput, step.StepName)
                .pressKey('enter');
                this.validateText(step);
                //WiStep.StepNum = catalog Steps
                if(this.steps)
                this.steps.push(step);
                if(!this.steps)
                this.steps.push(step);
                if(!step.StepShouldNotHaveInformationFilled)
                await this.FillallStepFields(step);
                await this.FeedPageEventEmitter.Update();
            }
        }else if(letDuplicate){
            var dupicateError: boolean;
            var alerts = new Alerts();
            
            await t
            .expect(this.appendProccessStep.visible).eql(true)
            .click(this.appendProccessStep)
            .expect(this.getSelectedStepInput.visible).eql(true)
            .typeText(this.getSelectedStepInput, step.StepName)
            .pressKey('enter');
            var WIERRORDUPLICATECHECK =  (await alerts.WIDuplicateError.innerText).includes("Step titles must be unique");
            await t
            .expect(alerts.WIDuplicateError.visible).eql(true)
            .expect(WIERRORDUPLICATECHECK).eql(true);
            
            
            var DuplicateErrorBool = this.TestDuplicteError(step, alerts);
            if(await DuplicateErrorBool == false){
            if(this.steps)
            this.steps.push(step);
            if(!this.steps)
            this.steps.push(step);
            if(!step.StepShouldNotHaveInformationFilled)
            await this.FillallStepFields(step);
            await this.FeedPageEventEmitter.Update();
            if(!workaroundbug)return;
            }
        }
        if(workaroundbug){
            if(NumOfSteps > 0) step.StepNum = NumOfSteps +1;
            if(NumOfSteps == 0) step.StepNum = NumOfSteps;
            // selects a different tab and then goes back to main tab to allow new steps to be created easily
            await this.SwitchWITAB(WORKITEMTAB.USERS);
            await this.SwitchWITAB(WORKITEMTAB.WORKITEM);
            await this.CatalogSteps();
            var step2 = await this.GetStepByName(step);
            
            
            await t
            .expect(step2.exists).eql(true)
            .click(step2);
            return;
        }

        }
        async GetStepByName(step): Promise<Selector> {
            var num: number;
            
            this.steps.forEach(async (step3) => {
                if (step3.StepName === step.StepName)
                return await this.GetStep(step.StepNum);
            });
            return await this.GetStep(0);
        }
        async TestDuplicteError(step, alerts: Alerts){
            var Util = new util();
            await t
            .click(this.appendProccessStep);
            Util.CtlADelete;
            let NumOfSteps = await this.CountSteps();
            let i;
            var DuplicateErrorBool: boolean = (await alerts.WIDuplicateError.innerText).includes("Step titles must be unique");

            for(i = 0; i > NumOfSteps; i++)
            {
                this.CatalogSteps();
            while(this.steps[i].StepName == step.StepName){
                if(Util.Errors)console.log("(errors) WI.ts-- AddStep: A step already exists with the text given -changing name with: \"-i\"");
                var StepExists = true;
                step.StepName + "-"+ i;
                StepExists = false;
            }
        };
            await t
            .typeText(this.getSelectedStepInput, step.StepName)
            .pressKey('enter')
            .expect(alerts.WIDuplicateError.exists).eql(false);
            
            return DuplicateErrorBool;
        }
    private async validateText(step: WISteps) {
        var valid: boolean;
        if(this.steps)var NumOfSteps = this.steps.length;

        if(!NumOfSteps){NumOfSteps = 0; if(Util.Verbose)console.log("--AddStep: Number of steps equaled null, asineing zero");}
        var i;
        for(i = 0; i > NumOfSteps; i++)
        {
            if(this.steps[i].StepName == step.StepName){
                valid = true;
            }
        };
        return valid;
    }
}

