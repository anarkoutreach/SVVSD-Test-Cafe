/* eslint-disable no-return-assign */
// remade the multi select element selector code as it did not function as I wanted it to
import { Selector } from 'testcafe';

export default class MultipleSelectElement {
  /** @description the root selector that all option elements should be children of */
    public readonly root: Selector;

    constructor(root: string | Selector) {
      this.root = Selector(root);
    }

    async getOptionByText(text: string) {
      const option = this.root.find('option');
      return option.withText(text);
    }
}
