import { Selector } from 'testcafe';

export default class HelpPopup {
    /**
     * @description an element of the page that I beleive is unlikely to change
     * used to identify and ensure switching to pages are succsessful
     * */
    identifier: Selector;

    constructor() {
      this.identifier = Selector('#mbewebHelpLinksHeading');
    }
}
