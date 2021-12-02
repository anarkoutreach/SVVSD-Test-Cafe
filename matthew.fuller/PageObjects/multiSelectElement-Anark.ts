/* eslint-disable no-return-assign */
import { Selector, ClientFunction } from 'testcafe';

export default class MultipleSelectElement {
    public readonly selector: Selector;

    constructor(init: string | Selector) {
      this.selector = Selector(init);
    }

    public selectOptionByText = async (text: string): Promise<MultipleSelectElement> => {
      // //select option with given name
      const { selector } = this;
      await ClientFunction(
        () => new Promise((resolve) => resolve(selector()))
          .then((element: HTMLSelectElement) => {
            const options = element.querySelectorAll('option');
            let found: HTMLOptionElement = null;
            options.forEach((option) => {
              if (option.text.toLowerCase() === text.toLowerCase()) {
                found = option;
              }
            });

            element.selectedIndex = found.index;
          }),
        { dependencies: { text, selector } },
      )();

      return this;
    }

    public selectNthOption = async (index): Promise<MultipleSelectElement> => {
      // select option with given index
      const { selector } = this;
      await ClientFunction(
        () => new Promise((resolve) => resolve(selector()))
          .then((element: HTMLSelectElement) => element.selectedIndex = index),
        { dependencies: { index, selector } },
      )();

      return this;
    }
}
