import util from "../../Utilities/util";
const Util = new util();
/** @description a class, representing an upload within a Workitem */
 export class UPLOAD {
     /**@description the index of the upload */
    Index;
    /** @description the files to upload */
    Files: string;
    /** @description the title of the upload */
    Title: string;
    /** @description the description of the upload */
    Description: string;
    /**@description the constructor to create a new Upload Object
     * @param files the path to the file, or files that should be uploaded
     */
    constructor(files){
        this.Files = files;
        this.Title =  "upload: "  +Util.randchar(25);
        this.Description =  "Description: "  +Util.randchar(250);
    }

    

}
 