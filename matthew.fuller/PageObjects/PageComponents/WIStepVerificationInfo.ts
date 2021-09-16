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

    VerificationBtnDecimal: Selector;

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
      this.VerificationButtons = Selector('button.list-group-item');
      this.VerificationBtnText = this.VerificationButtons.filter('button').nth(0);
      this.VerificationBtnDecimal = this.VerificationButtons.filter('button').nth(1);
      this.VerificationBtnInteger = this.VerificationButtons.filter('button').nth(1);
      this.VerificationBtnDate = this.VerificationButtons.filter('button').nth(2);
      this.VerificationBtnCheckbox = this.VerificationButtons.filter('button').nth(3);
      this.VerificationBtnDropdown = this.VerificationButtons.filter('button').nth(4);
      this.VerificationBtnMultiSelect = this.VerificationButtons.filter('button').nth(5);
      this.VerificationBtnUpload = this.VerificationButtons.filter('button').nth(6);
    }
}
