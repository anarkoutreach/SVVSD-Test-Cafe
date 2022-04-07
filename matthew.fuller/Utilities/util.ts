/* eslint-disable class-methods-use-this */
import { ClientFunction, Selector, t } from 'testcafe';
/** @description a Utility class, used for various random functions, and logging variables */
export default class Util {
  // logging vars
  /** @description Wethor or not verbose logs should be loged */
  Verbose = false;

  /** @description Weathor or not Error logs should be loged
   *
   * Note: this refers to errors that will not terminate the program and that i
   * have marked "if(errors)log"
   */
  Errors = true

  /** @description Weathor or not Warning logs should be loged */
  Warnings = true;

  /**
   * @description creates a string of random charectors of a specifiyed length
   * @param {number} length a number representing the length of the string
   * @returns string
   */
  // eslint-disable-next-line class-methods-use-this
  randChar(length: number) {
    let result = '';
    const charlist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charlength = charlist.length;
    for (let i = 0; i < length; i += 1) {
      result += charlist.charAt(Math.floor(Math.random() * charlength));
    }
    return result;
  }

  getURL = ClientFunction(() => document.location.href);

  /**
   * @description creates a string of random numbers of a specifiyed length
   * @param {number} length a number representing the length of the string
   * @returns string
   */
  async randnum(length: number) {
    const result = await (Math.random() * length).toString();
    return result;
  }

  wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  /**
   * @description presses "Ctrl + A" then "delete" through testcafe
   *  @param {Selector} field the editable feild that should be cleared @returns null */
  async CtlADelete(field: Selector) {
    await t
      .click(field)
      .pressKey('ctrl+a delete');
  }

  /** @description presses "enter" through testcafe */
  async pressEnter() {
    await t
      .pressKey('enter');
  }

  async checkAnyErrExists(sharedElements) {
    await t
      .expect(sharedElements.genericErr.exists)
      .eql(true);
  }

  async formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  }
}
