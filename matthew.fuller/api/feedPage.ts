import https from 'https';
import ConfigurationManager from '../Configuration/configuration';

const user = 'Matthew';
const pass = 'p@ssw0rd';
const data2 = JSON.stringify({
  text: 'gesgse', author: '5d8a5610e2dfa40022ef0a67', conversationId: '6046b44407d21caba9002b52', uploaded: false,
});
const configManager = new ConfigurationManager();
const options = {
  hostname: configManager.serverUrlShort,
  path: configManager.apiComment,
  method: 'POST',

};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
