import * as https from 'https';
import { t } from 'testcafe';
import ConfigurationManager from '../Configuration/configuration';
import Util from '../Utilities/util';

const user = 'Matthew';
const pass = 'p@ssw0rd';
const configManager = new ConfigurationManager();
const util = new Util();

export default class AnarkAPIFrameWork {
  async post(path, headers, dataToSend, verify = true) {
    const data = {
      statusCode: null,
      data: null,
    };
    const headersDict = { Authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}` };
    const finalHeaders = Object.assign(headersDict, headers);
    const options = {
      port: 443,
      hostname: configManager.serverUrlShort,
      path,
      method: 'POST',
      headers: finalHeaders,
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
      if (util.Errors === true) {
        console.error(error);
      }
    });

    req.write(dataToSend);
    req.end();

    if (verify) {
      t.expect(data.statusCode === 200);
    }
    return data;
  }

  async get(APIPath, headers, verify = true) {
    const data = {
      statusCode: null,
      data: null,
    };
    const headersDict = { Authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}` };
    const finalHeaders = Object.assign(headersDict, headers);
    const options = {
      port: 443,
      hostname: configManager.serverUrlShort,
      path: APIPath,
      method: 'GET',
      headers: finalHeaders,
    };
    let rawData = '';
    const req = https.request(options, (res) => {
      data.statusCode = res.statusCode;

      res.on('data', (chunk) => {
        rawData += chunk;
        if (util.Verbose === true) {
          process.stdout.write(chunk);
          console.log(`statusCode: ${res.statusCode}`);
        }
      });
      res.on('end', () => {
        data.data = rawData;
        console.log(`ended${data.data}`);
      });
    });

    req.on('error', (error) => {
      if (util.Errors === true) {
        console.error(error);
      }
    });

    req.end();

    if (verify) {
      t.expect(data.statusCode === 200);
    }
    data.data = rawData;
    return data;
  }
}
