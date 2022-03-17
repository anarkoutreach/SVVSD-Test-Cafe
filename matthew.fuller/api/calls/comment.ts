import genericCall from './genericCall';

export default class APIComment extends genericCall {
    /** @description the id of the author */
    userID: string

    /** @description the id of the conversation */
    conversationID: string

    /** @description the text that should be included in the comment */
    bodyText: string

    /** @description the json formatted inline with MBEweb api standards */
    data: string

    /** @description create a json object formatted inline with MBEweb api */
    constructor(userID, conversationID, bodyText) {
      super();
      this.path = '/api/comments';
      this.userID = userID;
      this.conversationID = conversationID;
      this.bodyText = bodyText;
      this.buildPayload();
    }

    buildPayload() {
      this.data = JSON.stringify({
        text: this.bodyText,
        author: this.userID,
        conversationId: this.conversationID,
        uploaded: false,
      });
    }
}
