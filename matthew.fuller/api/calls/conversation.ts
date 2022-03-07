import genericCall from './genericCall';

export default class APIConversation extends genericCall {
    /** @description the id of the user? */
    userID: string

    /** @description the number of conversations to retreive from the api */
    count: number

    /** @description create a json object formatted inline with MBEweb api */
    constructor(userID = null, responseCount = 10) {
      super();
      if (userID == null) {
        this.userID = this.config.defaultUserId;
      }
      this.userID = userID;
      this.count = responseCount;
      this.path = `/api/conversations?limit=${this.count}&user=${userID}`;
    }
}
