import { adminUser } from "../Utilities/roles";
import ConfigurationManager from "../Configuration/configuration";
import Navbar from "../PageObjects/PageComponents/navbar";

const configManager = new ConfigurationManager();

fixture('Access Control List Tests').page(configManager.homePage).beforeEach(async t => {
    t.ctx.user = adminUser;

    await t
        .useRole(t.ctx.user.role)
        .setNativeDialogHandler((type, text, url) => {
            switch (type) {
                case 'confirm':
                    switch (text) {
                        case 'Do you want to subscribe?':
                            return false;
                        case 'Do you want to delete your account?':
                            return true;
                        default:
                            throw 'Unexpected confirm dialog!';
                    }
                case 'prompt':
                    return 'Hi there';
                case 'alert':
                    throw 'An alert was invoked!';
            }
        });
});

const navbar = new Navbar();

test('can navigate to access control list modal', async t => {
    const templateUploadModal = await navbar.uploadTemplate();
    await templateUploadModal.validateModalLoad();    
});
