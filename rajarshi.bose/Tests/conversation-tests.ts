import FeedPage from "../PageObjects/feed-page";
import { adminUser } from "../Utilities/roles";
import ConfigurationManager from "../Configuration/configuration";
import Navbar from "../PageObjects/PageComponents/navbar";
import Utilities = require("../Utilities/utilities");
const moment = require('moment');

const configManager = new ConfigurationManager();

fixture`Conversation Tests`
    .page(configManager.homePage)
    .beforeEach(async t => {
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

        await setup(t)
    });

const feedPage = new FeedPage();
const navbar = new Navbar();

var setup = async function (t: TestController) {
    if (t.fixtureCtx.conversationSetup !== true) {
        var addEditActivityPage = await navbar.createActivity();
        await addEditActivityPage.setTitle(Utilities.getUuid());
        await addEditActivityPage.setDescription(Utilities.getUuid());
        await addEditActivityPage.setEndDate(moment(new Date()).add(30, 'd').toDate());
        await addEditActivityPage.addContentByIndex(1);
        await addEditActivityPage.addGroupByIndex(1);
        await addEditActivityPage.createActivity();
        t.fixtureCtx.conversationSetup = true;
    }
}

test('can add comment', async t => {
    const conversation = feedPage.getFirstConversation();
    await conversation.addComment('efgh');
});

test('can add reply', async t => {
    const conversation = feedPage.getFirstConversation();
    const commentText = 'abcd';
    const comment = await conversation.addComment(commentText);
    await comment.addReply('lmnop');
});
