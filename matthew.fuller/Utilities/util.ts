import { Selector, t } from "testcafe";
export default class util {
  //logging vars
  Verbose = true;
  Errors = true
 randchar(length) {
    var result           = '';
    var charlist       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charlength = charlist.length;
    for ( var i = 0; i < length; i++ ) {
       result += charlist.charAt(Math.floor(Math.random() * charlength));
    }
    return result;
 }

 async randnum(length){
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