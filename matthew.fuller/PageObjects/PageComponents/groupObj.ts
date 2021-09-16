import util from '../../Utilities/util'
;
const Util = new util();
export default class GroupObj {
    /** @description the variable representing the title of a group: should be a string unless it should be left empty for testing, in which case it can be false */
    title:any

    /** @description the variable representing the description of a group: should be a string unless it should be left empty for testing, in which case it can be false */
    description:any

    /** @description an array of numbers representing the nth place in the list of users on the groups page to add to a group */
    users:Array<number>

    /**
     * @description the constructor for the group obj, allowing specifaction of title and desription and rand char count if wanted/needed
     * @param defaultTitle the title that the group obj should have
     * @param defaultDesc the description that the group obj should have
     * @param num the number of random chars added to the end of both the above
     */
    constructor(defaultTitle = 'genericGroupTitle' as any, defaultDesc = 'genericGroupDescription' as any, num = 20 as any) {
      if (defaultTitle != false) {this.title=defaultTitle+Util.randChar(num)};
      else this.title = null;
      if (defaultDesc != false) {this.description=defaultDesc+Util.randChar(num)};
      else this.description = null;
      this.users = [];
    }
}
