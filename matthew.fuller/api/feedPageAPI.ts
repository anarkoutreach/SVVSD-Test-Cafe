// import * as https from 'https';
// import { t } from 'testcafe';
// import Util from '../Utilities/util';
import APIComment from './calls/comment';
import AnarkAPIFrameWork from './apiFrameWork';
import APIConversation from './calls/conversation';
import Config from './apiConfig';
import APIReply from './calls/reply';

const config = new Config();
// const util = new Util();
const anarkApiFrameWork = new AnarkAPIFrameWork();
export default class FeedPageAPI {
  async getConversations(count = 10, user = config.defaultUserId) {
    const conversation = new APIConversation(user, count);
    return anarkApiFrameWork.get(conversation.path, {}, true);
  }

  async getFirstConversationID() {
    const response = await this.getConversations(1);
    const json = JSON.parse(response.data);
    return json[0]._id;
  }

  async postComment(comment: APIComment, verify = true) {
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': comment.data.length,
    };
    anarkApiFrameWork.post(comment.path, headers, comment.data, verify);
  }

  async postReply(reply: APIReply, verify = true) {
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': reply.data.length,
    };
    anarkApiFrameWork.post(reply.path, headers, reply.data, verify);
  }
}
