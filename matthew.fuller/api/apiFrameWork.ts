import * as https from 'https';
import { t } from 'testcafe';
import ConfigurationManager from '../Configuration/configuration';
import Util from '../Utilities/util';

const user = 'Matthew';
const pass = 'p@ssw0rd';
const configManager = new ConfigurationManager();
const util = new Util();

class Response {
  statusCode: number

  data: string
}
export default class AnarkAPIFrameWork {
  async post(path, headers, dataToSend, verify = true) {
    const postRequest = new Promise<Response>(async (resolve) => {
      let rawData;
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
        res.on('data', (chunk) => {
          rawData += chunk;
          if (util.Verbose === true) {
            process.stdout.write(chunk);
          }
        });
        res.on('end', async () => {
          data.statusCode = res.statusCode;
          data.data = rawData;
          resolve(data);
        });
      });

      req.on('error', (error) => {
        if (util.Errors === true) {
          console.error(error);
        }
      });
      req.write(dataToSend);
      req.end();
    });

    const promiseThen = await postRequest.then<Response>(async (data) => {
      if (verify) {
        await t.expect(data.statusCode === 200).eql(true);
      }
      return data;
    });
    return promiseThen;
  }

  async get(APIPath, headers, verify = true) {
    const getRequest = new Promise<Response>((resolve) => {
      const headersDict = { Authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}` };
      const data = new Response();
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
        res.on('end', async () => {
          data.data = rawData;
          resolve(data);
        });
      });

      req.on('error', (error) => {
        if (util.Errors === true) {
          console.error(error);
        }
      });

      req.end();
    });

    const promiseThen = await getRequest.then<Response>(async (data) => {
      if (verify) {
        await t.expect(data.statusCode === 200).eql(true);
      }
      return data;
    });
    return promiseThen;
  }
}
