import util from "../../Utilities/util"
const Util = new util()
export default class groupObj{

    title:any
    description:any
    users:Array<number>
    constructor(defaultTitle="genericGroupTitle" as any,defaultDesc="genericGroupDescription" as any,num=20 as any){
        if(defaultTitle != false)
        this.title=defaultTitle+Util.randchar(num)
        else this.title =null;
        if(defaultDesc != false)
        this.description=defaultDesc+Util.randchar(num)
        else this.description=null;
        this.users =[]
    }
}