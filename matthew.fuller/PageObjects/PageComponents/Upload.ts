import util from "../../Utilities/util";
const Util = new util();
 export class UPLOAD {
    Index;
    Files: string;
    Title: string;
    Description: string;
    constructor(files){
        this.Files = files;
        this.Title =  "upload: "  +Util.randchar(25);
        this.Description =  "Description: "  +Util.randchar(250);
    }

    

}
 