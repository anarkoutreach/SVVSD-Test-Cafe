import { IPage } from "./IPage";

export abstract class MbewebPage implements IPage {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
    
    abstract validatePageLoad();
}