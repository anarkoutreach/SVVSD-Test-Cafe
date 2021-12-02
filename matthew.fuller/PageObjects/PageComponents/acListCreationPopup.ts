import { Selector, t } from 'testcafe';
import acListObj from './acListObj';
import { roles } from './roles';

export default class ACListCreationPopup {
    nameInput: Selector;

    descriptionInput: Selector;

    dropdownOpenBtn: Selector;

    adminDropDownBtn: Selector;

    activityAuthorDropDownBtn: Selector;

    contentAuthorDropDownBtn: Selector;

    viewerDropDownBtn: Selector;

    wiAuthorDropDownBtn: Selector;

    wiExecutorDropDownBtn: Selector;

    wiManagerDropDownBtn: Selector;

    constructor() {
      this.nameInput = Selector('#name');
      this.descriptionInput = Selector('#description');
      this.dropdownOpenBtn = Selector('.multiSelectDropdown.groupRolesDropdown');
      this.adminDropDownBtn = Selector('div#react-select-2-option-0');
      this.viewerDropDownBtn = Selector('div#react-select-2-option-3');
      this.wiAuthorDropDownBtn = Selector('div#react-select-2-option-4');
      this.wiExecutorDropDownBtn = Selector('div#react-select-2-option-5');
      this.wiManagerDropDownBtn = Selector('div#react-select-2-option-6');
      this.contentAuthorDropDownBtn = Selector('div#react-select-2-option-2');
      this.activityAuthorDropDownBtn = Selector('div#react-select-2-option-1');
    }

    async selectRole(role: string) {
      await t
        .expect(this.dropdownOpenBtn.visible).eql(true)
        .click(this.dropdownOpenBtn);
      switch (role) {
        case roles.ADMIN:
          await t
            .expect(this.adminDropDownBtn.visible).eql(true)
            .click(this.adminDropDownBtn);
          break;
        case roles.VIEWER:
          await t
            .expect(this.viewerDropDownBtn.visible).eql(true)
            .click(this.viewerDropDownBtn);
          break;
        case roles.CONTENTAUTHOR:
          await t
            .expect(this.contentAuthorDropDownBtn.visible).eql(true)
            .click(this.contentAuthorDropDownBtn);
          break;
        case roles.ACTIVITYAUTHOR:
          await t
            .expect(this.activityAuthorDropDownBtn.visible).eql(true)
            .click(this.activityAuthorDropDownBtn);
          break;
        case roles.WIAUTHOR:
          await t
            .expect(this.wiAuthorDropDownBtn.visible).eql(true)
            .click(this.wiAuthorDropDownBtn);
          break;
        case roles.WIEXECUTOR:
          await t
            .expect(this.wiExecutorDropDownBtn.visible).eql(true)
            .click(this.wiExecutorDropDownBtn);
          break;
        case roles.WIMANAGER:
          await t
            .expect(this.wiManagerDropDownBtn.visible).eql(true)
            .click(this.wiManagerDropDownBtn);
          break;
        default:
          break;
      }
    }

    async createAcList(acList: acListObj) {
      await t
        .expect(this.nameInput.visible).eql(true)
        .typeText(this.nameInput, acList.name)
        .expect(this.descriptionInput.visible)
        .eql(true)
        .typeText(this.descriptionInput, acList.description);
      acList.roles.forEach(async (role) => {
        await this.selectRole(role);
      });
    }
}
