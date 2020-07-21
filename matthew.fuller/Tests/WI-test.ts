import FeedPage from "../PageObjects/feed-page";
import { mattUser } from "../Utilities/roles";
import ConfigurationManager from "../Configuration/configuration";
import Alerts from "../PageObjects/Alerts";
import {tabs} from "../PageObjects/PageComponents/tabs";
import {VerificationTypes} from "../PageObjects/PageComponents/VerificationTypes"
import WIStepVerificationInfo from "../PageObjects/PageComponents/WIStepVerificationInfo"
import randchar from "../Utilities/util";
import WI from "../PageObjects/WI";
import util from "../Utilities/util";
import WISteps from "../PageObjects/PageComponents/WISteps";
import { UPLOAD } from "../PageObjects/PageComponents/Upload";
import { WORKITEMTAB } from"../PageObjects/PageComponents/WITAB";

const types = VerificationTypes;
const alerts = new Alerts();
const configManager = new ConfigurationManager();
const feedPage = new FeedPage();
const DefaultWorkItem = new WI
fixture`Login`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;

    await t
        .useRole(t.ctx.user.role);
});
//tests that only use log in fixture
test('add a lot of steps and child steps', async t => {
    
    const UTIL = new util();
    

    DefaultWorkItem.title = "this is a generic stress test id: " + UTIL.randchar(50);
    await feedPage.createWI(DefaultWorkItem, 20);
    await feedPage.returnToHome();
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    for(let g = 0; g < 100; g++){
    var step = new WISteps();
    step.StepShouldNotHaveInformationFilled = true;
    //var step4 = new WISteps();
    let i = 0;
    await DefaultWorkItem.AddStep(true, step, false, false);
        var step3 = step;
    //loop to add five nested children
    for(i; i < 3; i++){
    let step2 =new WISteps();
    step2.StepShouldNotHaveInformationFilled = true;
    await DefaultWorkItem.addChildStepToStep(step3, step2);
    console.log(i);
     step3 = step2;
    }
    //add ten children
    for(let y = 0; y <10; y++){
        let step2 =new WISteps();
        step2.StepShouldNotHaveInformationFilled = false;
        await DefaultWorkItem.addChildStepToStep(step, step2);
    }

}
await feedPage.returnToHome();
    await feedPage.deleteWI(tabs.WORKITEMS, DefaultWorkItem);
});
test("can open WI menu fill in all feilds then cancel", async t => {
    const DefaultWorkItem = new WI
    DefaultWorkItem.title =   feedPage.combineStringWithRandID(DefaultWorkItem.title, 40);
    await feedPage.openAWICreateMenu();
    await feedPage.FillallWIFields(DefaultWorkItem);
    await feedPage.closeAWIMenu();
});

test("can open WI menu and close", async t => {
    const DefaultWorkItem = new WI
    
    await feedPage.openAWICreateMenu();
    await feedPage.closeAWIMenu();
});
test("can open WI menu and close", async t => {
    const DefaultWorkItem = new WI
    const Util = new util;
    await feedPage.openAWICreateMenu();
    await feedPage.FillallWIFields(DefaultWorkItem);
    Util.CtlADelete(alerts.getAWIWorkItemTitleInput);
   
    
});



fixture`WI test initalisation`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;

    await t
        .useRole(t.ctx.user.role);
   
        
    
    await feedPage.createWI(DefaultWorkItem, 20);
    await feedPage.returnToHome();
}).afterEach(async t => {
    await feedPage.returnToHome();
    await feedPage.deleteWI(tabs.WORKITEMS, DefaultWorkItem);
});

test('can add child step to wistep', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    var step = new WISteps();
    step.StepShouldNotHaveInformationFilled = true;
    var step2 = new WISteps();
    await DefaultWorkItem.AddStep(true, step, false, false);
    await DefaultWorkItem.addChildStepToStep(step, step2);
});
test('can switch between all WI tabs', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.UPLOAD);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.WORKITEM);
});
test('can remove content to WI', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
    await DefaultWorkItem.AddContentByIndex(1);
    await DefaultWorkItem.RemoveContentByIndex(0);
});
test('can add user to WI', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
    await DefaultWorkItem.AddUserByIndex(1);
});
test('can add multiple users to WI', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
    await DefaultWorkItem.AddUserByIndex(1);
    await DefaultWorkItem.AddUserByIndex(2);
    await DefaultWorkItem.AddUserByIndex(3);
});
test('can add all avalible users to WI', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
    //all from first page
    await DefaultWorkItem.AddAllAvalibleUsers();
});
test('can go to the next page of users through the \" next button \"', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
    await DefaultWorkItem.ClickNextUserPageBtn();
});
test('can go to the previous page of users through the \" previous button \"', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
    await DefaultWorkItem.ClickNextUserPageBtn();
    await DefaultWorkItem.ClickPrevUserPageBtn();
}).only;

test('can add first page of users to WI', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
    //all from first page
    await DefaultWorkItem.AddFirstPageOfUsers();
});
test('can remove user from WI', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.USERS);
    await DefaultWorkItem.AddUserByIndex(1);
    //zero base index, but don't remove self
    await DefaultWorkItem.RemoveUserByIndex(1);
});
test('can add content to WI', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
    await DefaultWorkItem.AddContentByIndex(1);
});
test('can add multiple content to WI', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
    await DefaultWorkItem.AddContentByIndex(1);
    await DefaultWorkItem.AddContentByIndex(2);
    await DefaultWorkItem.AddContentByIndex(3);
});
test('can add all avalible content to WI', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    await DefaultWorkItem.SwitchWITAB(WORKITEMTAB.CONTENT);
    await DefaultWorkItem.AddAllAvalibleContent();
});
test('cannot add child wi step to a wi step with information filled', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    var step = new WISteps();
    step.StepShouldNotHaveInformationFilled = false;
    var step2 = new WISteps();
   
    await DefaultWorkItem.AddStep(true, step, false, false);
    let selectedstep = await this.GetStep(step.StepNum);
    await t.hover(selectedstep).expect(selectedstep.child(".stepItemRightButtons").exists).eql(false);
    //await DefaultWorkItem.addChildStepToStep(step, step2);
});
test('cannot add child wi step to a child wi step (with information filled) of a wi step', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    var step = new WISteps();
    step.StepShouldNotHaveInformationFilled = true;
    var step2 = new WISteps();
    
    await DefaultWorkItem.AddStep(true, step, false, false);
    await DefaultWorkItem.addChildStepToStep(step, step2);
    let selectedstep = await this.GetStep(step2.StepNum);
    await t.hover(selectedstep).expect(selectedstep.child(".stepItemRightButtons").exists).eql(false);
});
test('can add child step to child step', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    var step = new WISteps();
    step.StepShouldNotHaveInformationFilled = true;
    var step2 = new WISteps();
    step2.StepShouldNotHaveInformationFilled = true;
    var step3 = new WISteps();
    //var step4 = new WISteps();
    await DefaultWorkItem.AddStep(true, step, false, false);
    await DefaultWorkItem.addChildStepToStep(step, step2);
    await DefaultWorkItem.addChildStepToStep(step2, step3);
})
test('can add (a lot of) child step to child step', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem)
    var step = new WISteps();
    step.StepShouldNotHaveInformationFilled = true;
    //var step4 = new WISteps();
    let i = 0;
    await DefaultWorkItem.AddStep(true, step, false, false);
    for(i; i < 5; i++){
    let step2 =new WISteps();
    step2.StepShouldNotHaveInformationFilled = true;
    await DefaultWorkItem.addChildStepToStep(step, step2);
    console.log(i);
    step = step2;
    }

});


//tests that create a WI before and delete after
test('can edit title of WI', async t => {
    const Util = new util;
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    var editedWI = await DefaultWorkItem.EditWITitle(DefaultWorkItem, "Edited Title " + Util.randchar(50));

});
test('can edit WI description', async t =>{
    const Util = new util;
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    await DefaultWorkItem.EditWIDescription(DefaultWorkItem, "edited description" +DefaultWorkItem.description + Util.randchar(50));
})
test('can edit description and title', async t => {
    const Util = new util;
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    await DefaultWorkItem.EditWITitle(DefaultWorkItem, "Edited Title " + Util.randchar(50));
    await DefaultWorkItem.EditWIDescription(DefaultWorkItem, "edited description" +DefaultWorkItem.description + Util.randchar(50));
})
test('can upload context to step', async t => {
    const Util = new util;
    var upload = new UPLOAD("C:\\Users\\mmful\\Desktop\\github\\SVVSD-Test-Cafe\\matthew.fuller\\Tests\\images\\IMG-0211.JPG");
    var step = new WISteps();
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    await DefaultWorkItem.UploadContext(upload);
    await DefaultWorkItem.AddStep(false, step, false, false);
    await DefaultWorkItem.AddContextToStep(step, upload);

})
test('can create WI then delete', async t => { 
    const Util = new util;
    if(Util.Verbose)console.log("--test-\"can create WI then delete\" running blank test, only fixtures--");
});
test('Add one verification step', async t => { 
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    let WIstep = new WISteps();
    await DefaultWorkItem.AddStep(true, WIstep, false, false);
    var VerificationStep = new WIStepVerificationInfo(types.TEXT);
    await WIstep.addVerificationStep(VerificationStep);
    await feedPage.returnToHome();
});

test('Cannot add duplicate steps', async t => { 
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    let WIstep = new WISteps();
    WIstep.StepName = "Step w/S-Name"
    await DefaultWorkItem.AddStep(true, WIstep, false, false);
    await DefaultWorkItem.AddStep(true, WIstep, true, false);
})

fixture`tests that most likly will not fail`.page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = mattUser;

    await t
        .useRole(t.ctx.user.role);
   

    
    await feedPage.createWI(DefaultWorkItem, 20);
    await feedPage.returnToHome();
}).afterEach(async t => {
    await feedPage.returnToHome();
    await feedPage.deleteWI(tabs.WORKITEMS, DefaultWorkItem);
});
test('add a text verification steps', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    var i;

    let WIstep = new WISteps();
    await DefaultWorkItem.AddStep(true, WIstep, false, false);
    var VerificationStep = new WIStepVerificationInfo(types.TEXT);
    await WIstep.addVerificationStep(VerificationStep);
    
    await feedPage.returnToHome();
});
test('add a checkbox verification steps', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    var i;

    let WIstep = new WISteps();
    await DefaultWorkItem.AddStep(true, WIstep, false, false);
    var VerificationStep = new WIStepVerificationInfo(types.CHECKBOX);
    await WIstep.addVerificationStep(VerificationStep);
    
    await feedPage.returnToHome();
});
test('add a date verification steps', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    var i;

    let WIstep = new WISteps();
    await DefaultWorkItem.AddStep(true, WIstep, false, false);
    var VerificationStep = new WIStepVerificationInfo(types.DATE);
    await WIstep.addVerificationStep(VerificationStep);
    
    await feedPage.returnToHome();
});
test('add a file verification steps', async t => {
    
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    var i;

    let WIstep = new WISteps();
    await DefaultWorkItem.AddStep(true, WIstep, false, false);
    var VerificationStep = new WIStepVerificationInfo(types.FILE);
    await WIstep.addVerificationStep(VerificationStep);
    
    await feedPage.returnToHome();
});

test('add a decimal verification steps', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    var i;

    let WIstep = new WISteps();
    await DefaultWorkItem.AddStep(true, WIstep, false, false);
    var VerificationStep = new WIStepVerificationInfo(types.DECIMAL);
    await WIstep.addVerificationStep(VerificationStep);
    
    await feedPage.returnToHome();
});

test('add a dropdown verification steps', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    var i;

    let WIstep = new WISteps();
    await DefaultWorkItem.AddStep(true, WIstep, false, false);
    var VerificationStep = new WIStepVerificationInfo(types.DROPDOWN);
    await WIstep.addVerificationStep(VerificationStep);
    
    await feedPage.returnToHome();
});
test('add a intager verification steps', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    var i;

    let WIstep = new WISteps();
    await DefaultWorkItem.AddStep(true, WIstep, false, false);
    var VerificationStep = new WIStepVerificationInfo(types.INTEGER);
    await WIstep.addVerificationStep(VerificationStep);
    
    await feedPage.returnToHome();
});
test('add a multiselect verification steps', async t => {
    await feedPage.NavigateToEditWI(tabs.WORKITEMS, DefaultWorkItem);
    var i;

    let WIstep = new WISteps();
    await DefaultWorkItem.AddStep(true, WIstep, false, false);
    var VerificationStep = new WIStepVerificationInfo(types.MULTISELECT);
    await WIstep.addVerificationStep(VerificationStep);
    
    await feedPage.returnToHome();
});



