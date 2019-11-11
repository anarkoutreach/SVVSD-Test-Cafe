import { Selector, t } from "testcafe";
import TemplateModal from "./template-modal";
import AccessControlListModal from "./access-control-list-modal";
import DwiModal from "./dwi-modal";
import UserPage from "../user-page";
import AddEditActivityPage from "../add-edit-activity-page";
import GroupPage from "../group-page";
import FeedPage from "../feed-page";

export default class Navbar {
    createButton: Selector;
    profileButton: Selector;
    createOptionsMenu: Selector;
    createOptions: Selector;
    createDwiOption: Selector;
    createTemplateOption: Selector;
    createGroupOption: Selector;
    createActivityOption: Selector;
    createAccessControlListOption: Selector;
    createUserOption: Selector;
    logo: Selector;

    constructor() {
        //create menu
        this.createButton = Selector('#navbarCreate');
        this.createOptionsMenu = Selector('ul.createOptions');
        this.createOptions = this.createOptionsMenu.find('.createOptionText');
        this.createUserOption = this.createOptions.filter('.user');
        this.createAccessControlListOption = this.createOptions.filter('.list');
        this.createActivityOption = this.createOptions.filter('.activity');
        this.createGroupOption = this.createOptions.filter('.group');
        this.createTemplateOption = this.createOptions.filter('.template');
        this.createDwiOption = this.createOptions.filter('.dwi');

        //profile options
        this.profileButton = Selector('#navbarUserInfo');

        //logo
        this.logo = Selector('a.navbar-brand');
    }

    async addUser() : Promise<UserPage> {
        await t.click(this.createButton)
                .click(this.createUserOption);

        return Promise.resolve(new UserPage());
    }
    async createGroup() : Promise<GroupPage> {
        await t.click(this.createButton)
                .click(this.createGroupOption);

        return Promise.resolve(new GroupPage());
    }
    async createActivity() : Promise<AddEditActivityPage> {
        await t.click(this.createButton)
                .click(this.createActivityOption);

        return Promise.resolve(new AddEditActivityPage());
    }
    async createAccessControlList() : Promise<AccessControlListModal> {
        await t.click(this.createButton)
                .click(this.createAccessControlListOption);

        return Promise.resolve(new AccessControlListModal());
    }
    async uploadTemplate() : Promise<TemplateModal> {
        await t.click(this.createButton)
                .click(this.createTemplateOption);

        return Promise.resolve(new TemplateModal());
    }
    async authorWorkInstruction() : Promise<DwiModal> {
        await t.click(this.createButton)
                .click(this.createDwiOption);

        return Promise.resolve(new DwiModal());
    }

    async clickLogo() : Promise<FeedPage> {
        await t.click(this.logo);

        return Promise.resolve(new FeedPage());
    }
}
