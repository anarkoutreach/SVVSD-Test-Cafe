import { Selector, t } from 'testcafe';
import ConfigurationManager from '../../Configuration/configuration';
import months from './months';
import Util from '../../Utilities/util';

const util = new Util();
const configManager = new ConfigurationManager();
export default class CalendarWidget {
    /** @description the icon used for the calendar in MBE web */
    calendarIcon: Selector;

    /** @description the calendar start date input */
    calendarStartDate: Selector;

    /** @description the calendar end date input */
    calendarEndDate: Selector;

    /** @description a selector looking for a input with a placeholder containing the word "date" */
    calendarTextInput: Selector;

    /** @description the next button on the calendar widget */
    calendarNextBtn: Selector;

    /** @description the back button on the calendar widget */
	calendarBackBtn: Selector;

	/** @description the month button on the calendar widget */
	calendarMonthBtn: Selector;

    /** @description all days in the current month in the calendar days grid */
    calendarSelectionMenuDays: Selector;

    constructor() {
	  this.calendarIcon = Selector('.fas.fa-calendar-alt ');
	  this.calendarStartDate = Selector('input.createStartDate');
	  this.calendarEndDate = Selector('input.createEndDate');
      this.calendarMonthBtn = Selector('th.rdtSwitch');
	  this.calendarNextBtn = Selector('th.rdtNext');
	  this.calendarBackBtn = Selector('th.rdtPrev');
      this.calendarSelectionMenuDays = Selector('td.rdtDay:not(.rdtOld)');
	  // Check global case insensitive if attribute contains "date"
	  this.calendarTextInput = Selector('input').withAttribute('placeholder', /date/gi);
    }

    /**
     * @description check if the icon that MBEweb uses to indicate calendar fields is
     *  present and visible on the page */
    async checkIfCalendarWidgetVisible() {
	  return this.calendarIcon.visible;
    }

    /**
	 * @description in calendar menu click next month
	 */
    async clickToNextMonth(endOrStart = 'end', lOrR = 'r') {
      const month = await this.getCurrentMonth();
      await this.clickArrowInCalendarMenu(endOrStart, lOrR);
      const month2 = await this.getCurrentMonth();
      await t.expect(months[month + 1]).eql(months[month2]);
    }

    /**
	 * @description in calendar menu click previous month
	 */
	 async clickToPreviousMonth(endOrStart = 'end', lOrR = 'l') {
      const month = await this.getCurrentMonth();
      await this.clickArrowInCalendarMenu(endOrStart, lOrR);
      const month2 = await this.getCurrentMonth();
      await t.expect(months[month - 1]).eql(months[month2]);
    }

    /**
	 * @description filters through currently visible items to find the top layer
	 * @returns a selector for the back button
	 */
    async getCalendarNextBtn() {
      return (this.calendarNextBtn.filterVisible());
    }

    /**
	 * @description checks the open calendar window for index of month
	 * @returns the index of the current month in the menu
	 */
    async getCurrentMonth() {
      const currentMonth = (await (await this.getCalendarMonthSelector()).innerText).toLowerCase();
      let month2;
      if (months.includes(currentMonth)) {
        months.forEach((month) => {
          if (month === currentMonth) {
            month2 = months.indexOf(month);
          }
        });
      }
      return month2;
    }

    /**
	 * @description filters through currently visible items to find the top layer
	 * @returns a selector for the back btn
	 */
    async getCalendarBackBtn() {
      return (this.calendarBackBtn.filterVisible());
    }

    /**
         * @description get a selector for the mont hfeild at the top of the calend menu
         * @returns a selector for the month object at the top of the calender menu
         */
    async getCalendarMonthSelector() {
      return (this.calendarMonthBtn.filterVisible());
    }

    /**
     * @description in the activities creation menu click on
     * to the calender and then select a day */
    async clickOnDayInCurrentMonth(day:string, endOrStart = 'end') {
      if (endOrStart === 'end') {
        await t
          .click(this.calendarEndDate)
          .wait(5000);
      } else {
        await t
          .click(this.calendarStartDate);
      }
      const date = await this.getSpecificDayInCalenderMenu(day);
      await t
        .hover(date)
        .click(date);
    }

    /** @description in the activities creation menu click on to the calender
       *  and then click the left or right arrow
       * @param  endOrStart weahtor to click the end date or the start date ("end" or "start")
       * @param arrow weathor to click the right of left arror "l or r" */
    async clickArrowInCalendarMenu(endOrStart = 'end', arrow = 'r') {
      if (endOrStart === 'end') {
        await t
          .click(this.calendarEndDate);
      } else {
        await t
          .click(this.calendarStartDate);
      }
      if (arrow === 'r') {
        await t.click(await this.getCalendarNextBtn());
      } else {
        await t.click(await this.getCalendarBackBtn());
      }
    }

    /**
	 * @description add a end date to a activity
	 * @param date the date to be added with a default value of "10/22/3000 12:00:00 AM"
	 * @returns null
	 */
    async addEndDate(date = configManager.defaultEndDate) {
      await t
        .expect(this.calendarEndDate.exists).eql(true)
        .click(this.calendarEndDate);
      await util.CtlADelete(this.calendarEndDate);
      await t
        .typeText(this.calendarEndDate, date);
      return null;
    }

    /** @description get a day in the calendar menu */
    async getSpecificDayInCalenderMenu(day) {
      // Selector('td.rdtDay').withAttribute('data-value', '30');
      return this.calendarSelectionMenuDays.withAttribute('data-value', day).filterVisible();
    }

    /** @description format a javascript date obj into the form used by the MBEweb calendar */
    async formatDate(date:Date) {
      // note that Date uses a zero based index for days of week and months and day
      // of month but not years
      const time = await util.formatAMPM(date);
      const day = date.getDate() + 1;
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedDate = `${month}/${day}/${year} ${time}`;
      return formattedDate;
    }

    /**
     * @description MBEweb uses what I believe to be an odd way of typing dates:
     * the user must move the cursor behind the number they want to change and then type
     * a number to replace the one in front of the cursor. After the user types that
     * character the cursor is reset to the end of the string. This function
     * allows javascript formatted dates to be typed in this manner into MBEweb
     * calendar inputs
     * @param field the selector for the calendar input
     * @param date a javascript date object of the date to type
    */
    async changeDateByTyping(field: Selector, date: Date = new Date(3000, 11, 17, 5, 12)) {
      const day = date.getDate() + 1;
      console.log(day);
      // clear the calendar field
      await util.CtlADelete(field);
      await t.click(field)
        .pressKey('home')
        // reset the calendar field to 01/01/2022 12:00 AM by pressing "1" at the beginning of it
        .pressKey('1');
      const formattedDate = await this.formatDate(date);
      console.log(formattedDate);
      for (let index = 0; index < formattedDate.length; index += 1) {
        const char = formattedDate[index];
        await t.pressKey('home');
        for (let x = 0; x < index; x += 1) {
          await t.pressKey('right');
        }
        if (char !== '/' && char !== ' ') {
          await t.pressKey(char);
        } else if (char === ' ') {
          await t.pressKey('space');
        }
      }
      await t.expect((await field.value).includes(formattedDate)).eql(true);
    }
}
