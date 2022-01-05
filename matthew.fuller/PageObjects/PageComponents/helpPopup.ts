import { Selector, t } from 'testcafe';

export default class HelpPopup {
    /**
     * @description an element of the page that I beleive is unlikely to change
     * used to identify and ensure switching to pages are succsessful
     * */
    identifier: Selector;

    userReferenceLink: Selector;

    constructor() {
      this.userReferenceLink = Selector('a.pdfLink');
      this.identifier = Selector('#mbewebHelpLinksHeading');
    }

    async clickUserReferenceBtn() {
      await t.click(this.userReferenceLink);
    }

    async closeHelpTab() {
      const helpWindow = await t.getCurrentWindow();
      await t.closeWindow(helpWindow);
    }
}
