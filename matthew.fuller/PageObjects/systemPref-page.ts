import { Selector, t } from 'testcafe';
import { SysPrefTabs } from './PageComponents/sytemPrefTABS';

export default class SystemPrefPage {
  /** @description system btn, it does nothing it just is used to verify page switch */
  systemBtn: Selector;

  tabList: Selector;

  contentTab: Selector;

  activityTab: Selector;

  usersTab: Selector;

  workmanagmentTab: Selector;

  publishingTab: Selector;

  notificationsTab: Selector;

  searchTab: Selector;

  miscTab: Selector;

  constructor() {
    this.tabList = Selector('.nav').withAttribute('role', 'tablist');
    this.systemBtn = Selector('button.navItem.system.selected.btn.btn-default');

    this.contentTab = this.tabList.find('.nav-item').withText(/cont/gi);
    this.activityTab = this.tabList.find('.nav-item').withText(/act/gi);
    this.usersTab = this.tabList.find('.nav-item').withText(/user/gi);
    this.workmanagmentTab = this.tabList.find('.nav-item').withText(/work/gi);
    this.publishingTab = this.tabList.find('.nav-item').withText(/pub/gi);
    this.notificationsTab = this.tabList.find('.nav-item').withText(/not/gi);
    this.searchTab = this.tabList.find('.nav-item').withText(/search/gi);
    this.miscTab = this.tabList.find('.nav-item').withText(/misc/gi);
  }

  private async _expectAndClick(selector: Selector) {
    await t
      .expect(selector.visible).eql(true)
      .click(selector);
  }

  async switchTab(tab: SysPrefTabs) {
    switch (tab) {
      case SysPrefTabs.CONTENT:
        await this._expectAndClick(this.contentTab);
        break;

      case SysPrefTabs.ACTIVIY:
        await this._expectAndClick(this.activityTab);
        break;

      case SysPrefTabs.USERS:
        await this._expectAndClick(this.usersTab);
        break;

      case SysPrefTabs.WORKMANAGMENT:
        await this._expectAndClick(this.workmanagmentTab);
        break;

      case SysPrefTabs.PUBLISHING:
        await this._expectAndClick(this.publishingTab);
        break;

      case SysPrefTabs.NOTIFICATION:
        await this._expectAndClick(this.notificationsTab);
        break;

      case SysPrefTabs.SEARCH:
        await this._expectAndClick(this.searchTab);
        break;

      case SysPrefTabs.MISC:
        await this._expectAndClick(this.miscTab);
        break;
      default:
        break;
    }
  }
}
