import { Selector, t } from "testcafe";
import { VerificationTypes} from "./VerificationTypes";
import WIStepVerificationInfo from "./WIStepVerificationInfo"
import util from "../../Utilities/util";
import {status} from "./releasestatus"
var fs = require('fs');
//var images = fs.readdirSync("H:/Onedrive/MBEWeb-Testing/Anark/SVVSD-Test-Cafe/matthew.fuller/Tests/images");
const Status = status;
const Util = new util;
const types = VerificationTypes;
const genericstep = new WIStepVerificationInfo(types.TEXT);
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
    verificationsteps: WIStepVerificationInfo[];
   
    constructor() {
        this.StepNum = null;
        this.verificationsubmitBtn = Selector("button.create.btn.btn-sm.btn-success");
        if(!this.StepShouldNotHaveInformationFilled){
        this.StepSafteyAndComplience = "this is generic saftey" + Util.randchar(25);
        this.StepDescription = "this is a generic step description" + Util.randchar(25);
        }
        this.StepName = "this is a generic step name" + Util.randchar(10);
        this.StepInfoSideBar = Selector("#DWIPlayerSideBar");
        this.editStepDescription = Selector('div.ql-editor').nth(0);
        this.editStepSafetyAndComplience = Selector('div.ql-editor').nth(1);
        this.verificationPanel = Selector("#DWIPlayerSideBar .DWIPlayerSectionContents");
        this.verificationNewVerificationStep = this.verificationPanel.child(".WIStepVerificationInfo");
        this.verificationstepsWIselector = Selector(".well.characteristicEditor").filter('div');
        this.verificationapendBtn = Selector("a.editProcessStepCharacteristics");
        this.verificationsteps = [];
        this.fileExtention = Selector('label').withText('Accepted File Extensions:').sibling();

       
        if(Util.Verbose)console.log("--WIStepsConstructor: New WISteps created");
    }
    
async openVerificationMenu(){
    await t
    .expect(this.verificationapendBtn.exists).eql(true)
    .click(this.verificationapendBtn);
}
    async addVerificationStep(step: WIStepVerificationInfo){
       
        await this.openVerificationMenu()
       switch(step.type){
           case types.TEXT:
            await t
            .click(step.VerificationBtnText);
           break;
           case types.DECIMAL:
            await t
            .click(step.VerificationBtnDecimal);
           break;
           case types.INTEGER:
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
            .typeText(this.fileExtention, ".pdf");
           break;
       }
       let StepExists: boolean;
       if(this.verificationsteps)var NumOfSteps = this.verificationsteps.length;
       var i;
       
      NumOfSteps = await this.CountSteps();
       for(i = 0; i > NumOfSteps; i++)
        {
            if(this.verificationsteps[i].name == step.name){
                while(this.verificationsteps[i].name == step.name){
                if(Util.Errors)console.log("(errors) WI.ts-- AddStep: A step already exists with the text given -changing name with +5 rand char");
                StepExists = true;
                step.name += Util.randchar(5);
                StepExists = false;
                }
                
        };
       
    }
    if(Util.Verbose)console.log("--addverificationstep: adding index--");
    if(this.verificationsteps && this.verificationsteps.length > 0 && step)step.IndexIgnoringType = this.verificationsteps[this.verificationsteps.length].IndexIgnoringType + 1;
    if(!this.verificationsteps && this.verificationsteps.length > 0)step.IndexIgnoringType = 0;
    if(Util.Verbose)console.log("--addverificationstep: adding info--");
    await this.FillVerificationStepNameANDDescription(step);
    await t.expect(this.verificationsubmitBtn.exists).eql(true)
    .click(this.verificationsubmitBtn);
    if(Util.Verbose)console.log("--addVerificationStep: Verifying step--");
    await this.openVerificationMenu();
    var varify =  this.verifystep(step);
    await t.expect(await varify == true).eql(true);
    if(Util.Verbose)console.log("--addVerificationStep: step verifyed -pushing verification step into array--");
    this.verificationsteps.push(step);
    await this.closeVerificationMenu();
    

}
async verifystep(step: WIStepVerificationInfo){
    let NumSteps = await this.verificationstepsWIselector.count;
    var verifyed = false;
    if(Util.Verbose)console.log("--verifystep: verified?: " + verifyed + " number of steps to verify: " + NumSteps);
    



    var i =0;
    for(i; i < NumSteps; i++){
        if(Util.Verbose)console.log("--verifystep: verifying steps");
        var name = await Selector('input.characteristicEditorTitle').nth(i).value;
        if(name == step.name) verifyed = true;  
}
return verifyed;
}
async closeVerificationMenu(){
    if(genericstep.VerificationMenuClose){
    if(Util.Verbose)console.log("--closeVerificationMenu: closing menu--");
    await t
    .expect(genericstep.VerificationMenuClose.exists).eql(true)
    .click(genericstep.VerificationMenuClose)
    .expect(genericstep.VerificationMenuClose.exists).eql(false);
    if(Util.Verbose)console.log("--closeVerificationMenu: menu closed--");
    }else{
        if(Util.Errors)console.log("colseVerificationMenu --menu already closed");
    }
}

async FillVerificationStepNameANDDescription(step: WIStepVerificationInfo){
    if(Util.Verbose)console.log("--FillVerificationStepNameANDDESCRIPTION: filling description--");
    await t
    .expect(step.VerificationStepGeneralDescription.nth(step.IndexIgnoringType).exists).eql(true)
    .click(step.VerificationStepGeneralDescription.nth(step.IndexIgnoringType))
    .typeText(step.VerificationStepGeneralDescription.nth(step.IndexIgnoringType), step.desciption);
    if(Util.Verbose)console.log("--FillVerificationStepNameANDDESCRIPTION: expected text: \"" + step.desciption + "\"  acctual text \"" +  await step.VerificationStepGeneralDescription.nth(step.IndexIgnoringType).textContent + "\"");
    await t
    .expect(await step.VerificationStepGeneralDescription.nth(step.IndexIgnoringType).textContent == step.desciption).eql(true);
    if(Util.Verbose)console.log("--FillVerificationStepNameANDDESCRIPTION: filled description--");
    if(Util.Verbose)console.log("--FillVerificationStepNameANDDESCRIPTION: filling title--");
    await t
    .expect(step.VerificationStepGeneralTitle.exists).eql(true)
    .click(step.VerificationStepGeneralTitle.nth(step.IndexIgnoringType))
    .pressKey('ctrl+a delete')
    .typeText(step.VerificationStepGeneralTitle.nth(step.IndexIgnoringType), step.name);
    if(Util.Verbose)console.log("--FillVerificationStepNameANDDESCRIPTION: expected text: \"" + step.name + "\"  acctual text \"" +  await step.VerificationStepGeneralTitle.nth(step.IndexIgnoringType).value + "\"");
   await t
    .expect(await step.VerificationStepGeneralTitle.nth(step.IndexIgnoringType).value == step.name).eql(true);
    if(Util.Verbose)console.log("--FillVerificationStepNameANDDESCRIPTION: filled title and description--");

}
async CountSteps(){
    if(genericstep.VerificationStepGeneralDescription.count){
        if(Util.Verbose)console.log("--CountSteps: Function is returning VerificationStep count \"" + await genericstep.VerificationStepGeneralDescription.count + "\"");
    return await genericstep.VerificationStepGeneralDescription.count;
    }else{
        if(Util.Verbose)console.log("--CountSteps: function could not find any Verification steps as such returned zero--");
    return 0;
    }
}
async catalogSteps(){
    let NumSteps = await this.CountSteps();
    var i =0;
    for(i; i < NumSteps; i++){
        let step = new WIStepVerificationInfo(types.UNKNOWN);
        if(Util.Verbose)console.log("--catalogSteps: cataloging preexisting VerificationSteps");
        step.desciption = await genericstep.VerificationStepGeneralDescription.nth(i).innerText;
        step.name = await genericstep.VerificationStepGeneralTitle.nth(i).innerText;
        step.ID = await genericstep.VerificationStepGeneralID.nth(i).innerText;
        step.IndexIgnoringType = i; 
        this.verificationsteps.push(step);        
    }
}

}
