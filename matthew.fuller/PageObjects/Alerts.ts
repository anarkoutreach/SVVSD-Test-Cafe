import { Selector, t } from "testcafe";
import util from "../Utilities/util";
import WI from "./WI";
import {tabs} from "./PageComponents/tabs";
import SearchPage from "./search-page"
import {status} from "./PageComponents/releasestatus"
import { doesNotThrow } from "assert";

export default class Alerts {
    getGenericConfirmBtn: Selector;
    getGenericCancelBtn: Selector;

    // AWI/DWI
    errorPopUp: Selector;
    getAWICreateBtn: Selector;
    getAWICancelBtn: Selector;
    getAWIPartNumberInput: Selector;
    getAWIWorkItemTitleInput: Selector;
    getAWIDescriptionInput: Selector;
    getAWIRevisionInput: Selector;
    getAWIVersionInput: Selector;
    getModalForm: Selector;
    editslider: Selector;
    editlocation: Selector;
    editreleasestatus: Selector;
    realeasestatusdropdown: Selector;
    getAnarkLogo: Selector;
    WIDuplicateError: Selector;
    getAWIIsLatestVersionInput: Selector;

    constructor() {
        this.WIDuplicateError = Selector('span.error.processStepTitleInlineError.active');
        this.errorPopUp = Selector("span.error.createButtons");
    this.getGenericConfirmBtn = Selector('#okayConfirm');
    this.getGenericCancelBtn = Selector('#cancelConfirm');
    this.getAnarkLogo = Selector('#navApp .navbar-brand')
    
        // AWI/DWI

    this.getAWICreateBtn = Selector('button#dwiOK')
    this.getAWICancelBtn = Selector('button.btn-default').withText('Cancel');

    this.getAWIWorkItemTitleInput = Selector('input#title');
    this.getAWIDescriptionInput = Selector('textarea#description');
    this.getAWIPartNumberInput = Selector("span[data-property=partnumber]").child("input");
    this.getAWIRevisionInput = Selector("span[data-property=revision]").child("input");
    this.getAWIVersionInput =  Selector("span[data-property=version]").child("input");
    this.getAWIIsLatestVersionInput =  Selector("span[data-property=islatestrevision]").child("input");
    this.getModalForm = Selector('form#modalForm');
    this.editlocation = Selector("span[data-property=location]").child(".singleSelectDropdown");
    this.realeasestatusdropdown = Selector("span[data-property=release_status]").child("div.singleSelectDropdown").child(".css-26l3qy-menu").child(0);
        this.editreleasestatus = Selector("span[data-property=release_status]").child("div.singleSelectDropdown");
        
        this.editslider = Selector("span.checkbox-switch-slider");
    }
    
    getlocationbutton(num){
        const Util = new util;
        
        var split = num.split(" ")
        var num2 = parseInt(split[0]);
        if(Util.Verbose)console.log("--getStatusDropDown split =" + split);
        var alerts = new Alerts
        if(Util.Errors && num2 > 4){console.log("-getlocationbutton() alerts.ts was given a number greater than 4"); return null}
        return Selector("span[data-property=location]").child(".singleSelectDropdown").child(".css-26l3qy-menu").child().child(num2);
    }
    
	async FillForm(form, text, workitem: WI) {
      
       
        switch(form){
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
                let Util2 = new util;
                await t
                .expect(this.editlocation.exists).eql(true)
                .click(this.editlocation)
                .expect(this.getlocationbutton(workitem.Location).exists).eql(true)
                .click(this.getlocationbutton(workitem.Location))
                

                if(Util2.Verbose)console.log("--fillform-alerts \"7\" was passed, ignoring location dropdown currently")
            return
            break;
            case 8:
                var complate1 = false;
                await t
                .expect(this.editreleasestatus.exists).eql(true)
                .click(this.editreleasestatus);
                 complate1 = true;
                await t
                .expect(complate1).eql(true)
                .expect(this.realeasestatusdropdown.exists).eql(true)
                .expect((await workitem.getStatusDropDown(workitem.releasestatus)).exists).eql(true)
                .click(await workitem.getStatusDropDown(workitem.releasestatus));
            
                break;

            default:
            console.log("please enter a number 1-5");
            break;
            const Util = new util;
            if(Util.Verbose)console.log("Fillform: entered text into field \"" + form + "\"");
         }

        };

		
	}
