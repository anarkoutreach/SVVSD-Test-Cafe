import Util from '../../Utilities/util';

const util = new Util();
util.randChar(40);
export default class ActivityObj {
/** @description the title of the activity */
title: string;

/** @description the description of the activity */
description: string;

/** @description the start date of the activity */
startDate: string;

/** @description the end date of the activity */
endDate: string;

/** @description an array containing all content item names that have been added to this activity */
contentItems: Array<string>;

/** @description an array containing all user names that have been added to this activity */
users: Array<string>;

/** @description an array containing all group names that have been added to this activity */
groups: Array<string>;

/**
 *
 * @param num the number of random charectors to generate for pass and username
 */
constructor(title = 'DefaultActivity', desc = 'defualtDesc', num = 5, endDate = '10/22/3000 12:00:00 AM', add = true) {
  if (add === true) {
    this.title = title + util.randChar(num);
    this.description = desc + util.randChar(num);
  } else {
    this.title = title;
    this.description = desc;
  }
  // this.startDate = configManager.config.defaultData.user.organization;
  this.endDate = endDate;
}
}
