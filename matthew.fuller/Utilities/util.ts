import { Selector, t } from "testcafe";
/** @description a Utility class, used for various random functions, and logging variables*/
export default class util {
   /** @description the empty constructor a Utility class, used for various random functions, and logging variables*/
   constructor(){}
  //logging vars
  /**@description Wethor or not verbose logs should be loged */
  Verbose = true;
  /**@description Weathor or not Error logs should be loged
   * 
   * Note: this refers to errors that will not terminate the program and that i have marked "if(errors)log" 
   */
  Errors = true
  /**@description Weathor or not Warning logs should be loged */
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
 /** @description presses "Ctrl + A" then "delete" through testcafe @param {Selector} field the editable feild that should be cleared @returns null */
 async CtlADelete(field: Selector){
 await t
 .click(field)
 .pressKey('ctrl+a delete');
 }
}