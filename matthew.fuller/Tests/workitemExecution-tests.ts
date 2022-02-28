import { Selector } from 'testcafe';
import FeedPage from '../PageObjects/feed-page';
import { mattUser } from '../Utilities/roles';
import ConfigurationManager from '../Configuration/configuration';
import { tabs } from '../PageObjects/PageComponents/tabs';
import { VerificationTypes } from '../PageObjects/PageComponents/VerificationTypes';
import WIStepVerificationInfo from '../PageObjects/PageComponents/WIStepVerificationInfo';
import WI from '../PageObjects/WI';
import Util from '../Utilities/util';
import WISteps from '../PageObjects/PageComponents/WISteps';
import UPLOAD from '../PageObjects/PageComponents/Upload';
import { WORKITEMTAB } from '../PageObjects/PageComponents/WITAB';
import SharedElements from '../PageObjects/sharedElements';
import Alerts from '../PageObjects/Alerts';

/** @description  An enum representing all possible types for a verification step */
const types = VerificationTypes;
/** @description A class represnting the controller that handles configs */
const configManager = new ConfigurationManager();
/** @description A class represnting the "feedpage" on MBE-web */
const feedPage = new FeedPage();
/** @description A generic workitem object that will be used for all generic tests */
const DefaultWorkItem = new WI();

/*
 * @description A fixture that will login to MBE web, and nothing more,
any WI's created under this fixture need to be removed at the end of their test.
 * --Note: cannot use an after each fixture here to delete WI's as some
of the tests under this fixture do not create a WI
 */
fixture`Work Item execution tests`.page(configManager.homePage).beforeEach(async (t) => {
  t.ctx.user = mattUser;

  await t
    .setNativeDialogHandler(() => true)
    .useRole(t.ctx.user.role);
});
