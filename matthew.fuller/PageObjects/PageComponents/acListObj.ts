import Util from '../../Utilities/util';

const util = new Util();
export default class ACListObj {
    name:string

    description: string

    roles: string[]

    constructor(name:string = `ACLISt-${util.randChar(20)}`, description:string = 'desc', roles:string[] = ['viewer']) {
      this.name = name;
      this.description = description;
      this.roles = roles;
    }
}
