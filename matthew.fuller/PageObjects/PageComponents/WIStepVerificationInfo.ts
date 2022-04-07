import { Selector } from 'testcafe';
import Util from '../../Utilities/util';
import { VerificationTypes } from './VerificationTypes';

const util = new Util();
export default class WIStepVerificationInfo {
    IndexWithinType: number;

    IndexIgnoringType: number;

    VerificationMenuClose: Selector;

    VerificationEditPanel: Selector;

    VerificationHeader: Selector;

    VerificationButtons: Selector;

    VerificationBtnText: Selector;

    VerificationBtnInteger: Selector;

    VerificationBtnDate: Selector;

    VerificationBtnCheckbox: Selector;

    VerificationBtnDropdown: Selector;

    VerificationBtnMultiSelect: Selector;

    VerificationBtnUpload: Selector;

    VerificationStepGeneralDescription: Selector;

    VerificationStepGeneralTitle: Selector;

    VerificationStepGeneralID: Selector

    type: VerificationTypes;

    ID: string;

    description: string;

    name: string;

    constructor(type: VerificationTypes) {
      this.IndexIgnoringType = 0;
      this.type = type;
      this.name = `this is a generic name rand: ${util.randChar(15)} type: "${type}"`;
      this.description = `this is a generic description${util.randChar(100)}`;
      this.VerificationEditPanel = Selector('div.addCharacteristicsButtons .list-group');
      this.VerificationHeader = this.VerificationEditPanel.child(1);
      this.VerificationStepGeneralDescription = Selector('textarea.characteristicEditorDescription');
      this.VerificationStepGeneralTitle = Selector('input.characteristicEditorTitle');
      this.VerificationStepGeneralID = Selector('div.characteristicEditorQPID');
      this.VerificationMenuClose = Selector('button.close');
      this.VerificationButtons = Selector('div.addCharacteristicsButtons.list-group');
      this.VerificationBtnText = Selector('div').withAttribute('data-controltype', 'input').withAttribute('data-inputtype', 'string');
      this.VerificationBtnInteger = Selector('div').withAttribute('data-controltype', 'input').withAttribute('data-inputtype', 'number');
      this.VerificationBtnDate = Selector('div').withAttribute('data-controltype', 'date');
      this.VerificationBtnCheckbox = Selector('div').withAttribute('data-controltype', 'checkbox');
      this.VerificationBtnDropdown = Selector('div').withAttribute('data-controltype', 'dropdown');
      this.VerificationBtnMultiSelect = Selector('div').withAttribute('data-controltype', 'multiselect');
      this.VerificationBtnUpload = Selector('div').withAttribute('data-controltype', 'upload');
    }
}
