import APIComment from './comment';

export default class APIReply extends APIComment {
    /** @description the id of the comment to reply to */
    parentID: string

    constructor(userID, conversationID, bodyText, parentID) {
      super(userID, conversationID, bodyText);
      this.parentID = parentID;
      this.addToPayload(this.parentID, 'parentId');
    }
}
