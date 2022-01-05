import { Selector, t } from 'testcafe';
import FeedPage from '../feed-page';
import SharedElements from '../sharedElements';
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

    rolesTextField: Selector;

    acListCreateBtn: Selector;

    acListCancelBtn: Selector;

    constructor() {
      const sharedElements = new SharedElements();
      this.rolesTextField = Selector('div.multiSelectDropdown');
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
      this.acListCreateBtn = sharedElements.genericCreateBtn;
      this.acListCancelBtn = sharedElements.CreateCancelButton;
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

    /**
     * @description create ac list from aclist object on aclist creation popup
     * @param acList aclist object
     * @param type if true the roles will be entered by typing rather than clicking through the list
     * @param clickCreate if true click the create button for the aclist creation menu
     */
    async createAcList(acList: acListObj, clickCreate = true, type = true) {
      await t
        .expect(this.nameInput.visible).eql(true)
        .typeText(this.nameInput, acList.name)
        .expect(this.descriptionInput.visible)
        .eql(true)
        .typeText(this.descriptionInput, acList.description);
      if (type === false) {
        acList.roles.forEach(async (role) => {
          await this.selectRole(role);
        });
      } else {
        acList.roles.forEach(async (role) => {
          await t
            .click(this.rolesTextField)
            .typeText(this.rolesTextField, role)
            .pressKey('enter');
        });
      }
      if (clickCreate) { await t.click(this.acListCreateBtn); }
    }

    async navigateToEditAcList(acList) {
      const feedPage = new FeedPage();
      const sharedElements = new SharedElements();
      const result = await feedPage.getACListSelector(acList);
      await t.expect(await result.visible).eql(true);

      await t
        .expect(sharedElements.ellipsis.visible).eql(true)
        .click(sharedElements.ellipsis);
      const editBtn = sharedElements.pencilIcon;
      await t
        .expect(editBtn.exists).eql(true)
        .click(editBtn)
        .expect(this.nameInput.visible)
        .eql(true);
    }
}
