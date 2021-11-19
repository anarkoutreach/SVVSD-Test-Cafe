import { Selector } from 'testcafe';

export default class SystemPrefPage {
  /** @description system btn, it does nothing it just is used to verify page switch */
  systemBtn: Selector;

  constructor() {
    this.systemBtn = Selector('button.navItem.system.selected.btn.btn-default');
  }
}
