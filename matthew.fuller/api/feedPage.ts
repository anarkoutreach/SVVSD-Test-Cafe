import * as https from 'https';
import { t } from 'testcafe';
import ConfigurationManager from '../Configuration/configuration';
import Util from '../Utilities/util';
import APIComment from './calls/comment';

const util = new Util();
export default class FeedPageAPI {
  async postComment(comment: APIComment, verify = true) {
    const data = {
      statusCode: null,
      data: null,
    };
    const user = 'Matthew';
    const pass = 'p@ssw0rd';
    const configManager = new ConfigurationManager();
    const options = {
      port: 443,
      hostname: configManager.serverUrlShort,
      path: configManager.apiComment,
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`,
        'Content-Type': 'application/json',
        'Content-Length': comment.data.length,
      },
    };

    const req = https.request(options, (res) => {
      data.statusCode = res.statusCode;

      res.on('data', (d) => {
        data.data = d;
        if (util.Verbose === true) {
          process.stdout.write(d);
          console.log(`statusCode: ${res.statusCode}`);
        }
      });
    });

    req.on('error', (error) => {
      console.error(error);
    });

    req.write(comment.data);
    req.end();

    if (verify) {
      t.expect(data.statusCode === 200);
    }
  }
}

const comment = new APIComment('5d8a5610e2dfa40022ef0a67', '6046b44407d21caba9002b52', 'test');
const temp = new FeedPageAPI();
temp.postComment(comment);
