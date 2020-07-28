import { Selector, t } from "testcafe";
export default class util {
  //logging vars
  Verbose = true;
  Errors = true
  Warnings = true;
  /**
   * @description creates a string of random charectors of a specifiyed length
   * @param {number} length a number representing the length of the string
   * @returns string
   */
 randchar(length: number) {
    var result           = '';
    var charlist       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charlength = charlist.length;
    for ( var i = 0; i < length; i++ ) {
       result += charlist.charAt(Math.floor(Math.random() * charlength));
    }
    return result;
 }
  /**
   * @description creates a string of random numbers of a specifiyed length
   * @param {number} length a number representing the length of the string
   * @returns string
   */
 async randnum(length: number){
    var result: string;
    result = await (Math.random() * length).toString();
    return result
 }
 async CtlADelete(field: Selector){
 await t
 .click(field)
 .pressKey('ctrl+a delete');
 }
}