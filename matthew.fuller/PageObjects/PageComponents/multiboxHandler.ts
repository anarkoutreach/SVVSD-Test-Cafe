/** 
 * @description a class designed to help handle 
 * the type of selection boxes that are used for watermark preferences, datamarkings, textboxes, etc...
 */
export default class MultiBoxHandler {
    constructor(){

    }
    /**
     * @description provided with the root of the multibox/muliselect, this function
     * will return all contained values
     * @param root the root value of the box (the farthest out selector that
     *  encompasses all elements involved in the multibox, usually "css-yk16xz-control")
     */
    async getAllMultiValueOptions(root: Selector){
        return root.find('.multivalueOption')
    }

    /**
     * @description provided with a multivalue option of a multi box
     * will return the delete button for the provided multivalue option
     * @param multiValue a selector for one of the values in a multibox
     */
     async getMultiValueOptionDeleteBtn(multiValue: Selector){
        return multiValue.sibling('div.css-xb97g8')
    }
    /**
     * @description provided with the root of the multibox/muliselect, this function
     * will return the selector for the text area of the multibox
     * @param root the root value of the box (the farthest out selector that
     *  encompasses all elements involved in the multibox, usually "css-yk16xz-control")
     */
    async getInput(root: Selector){
        return root.find('.multivalueOption')
    }
}