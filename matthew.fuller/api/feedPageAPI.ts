// import * as https from 'https';
// import { t } from 'testcafe';
import ConfigurationManager from '../Configuration/configuration';
// import Util from '../Utilities/util';
import APIComment from './calls/comment';
import AnarkAPIFrameWork from './apiFrameWork';
import APIConversation from './calls/conversation';
import Config from './apiConfig';

const config = new Config();
// const util = new Util();
const anarkApiFrameWork = new AnarkAPIFrameWork();
export default class FeedPageAPI {
  async getConversations(count = 10, user = config.defaultUserId) {
    const conversation = new APIConversation(user, count);
    return anarkApiFrameWork.get(conversation.path, {});
  }

  async postComment(comment: APIComment, verify = true) {
    const configManager = new ConfigurationManager();
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': comment.data.length,
    };
    anarkApiFrameWork.post(configManager.apiComment, headers, comment.data, verify);
  }
}
