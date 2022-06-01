import { Selector } from 'testcafe';
import SharedElements from '../../sharedElements';

const sharedElements = new SharedElements();
/** @description a class containing all selectors and
 * functions relating to the publishing tab of the system preferences page */
export default class SystemPrefPublishingTab {
    /**
     * @description a selector representing the
     * "Template ID for Publishing Images" drop box style input
     * */
    templateIdForImgSelector: Selector;

    /** @description a selector for the save preferences button of the system
     * Preferences publishing tab */
    savePreferencesBtn: Selector;

    /**
     * @description a selector representing the
     * "Template ID for Publishing Paginated Content" drop box style input
     * */
    templateIdForPaginatedContentSelector: Selector;

    /** @description a selector for the content thumbnail width input */
    contentThumbWidthSelector: Selector;

    /** @description a selector for the "Published Content Thumbnail Height" Field */
    contentThumbHeightSelector: Selector;

    /** @description a selector for the "Publishing User" Field */
    publishingUserSelector: Selector;

    /** @description a selector for the "publishing password" field */
    publishingPasswordSelector: Selector;

    /** @description a selector for the "Show password" checkbox */
    showPasswordCheckBoxSelector: Selector;

    // watermark selectors
    /** @description a selector for the Watermark Preferences multibox */
    watermarkPreferencesMultiBoxSelector: Selector;

    /** @description a selector for the text field of the watermark preferences set up */
    watermarkTextInputSelector: Selector;

    /** @description a selector for the font opacity field of the watermark preferences set up */
    watermarkFontOpacitySelector: Selector

    /** @description a selector for the font field of the watermark preferences set up */
    watermarkFontSelector: Selector

    /** @description a selector for the font color field of the watermark preferences set up */
    watermarkFontColorSelector: Selector

    /** @description a selector for the font size field of the watermark preferences set up */
    watermarkFontSizeSelector: Selector

    /** @description a selector for the text align field of the watermark preferences set up */
    watermarkTextAlignSelector: Selector

    /** @description a selector for the rotation field of the watermark preferences set up */
    watermarkRotationSelector: Selector

    /** @description a selector for the horizontal position field of
     * the watermark preferences set up */
    watermarkHorizontalPositionSelector: Selector

    /** @description a selector for the Vertical position field of
     * the watermark preferences set up */
    watermarkVerticalPositionSelector: Selector;

    /** @description a selector for the horizontal offset field of
     * the watermark preferences set up */
    watermarkHorizontalOffsetSelector: Selector

    /** @description a selector for the vertical offset field of the watermark preferences set up */
    watermarkVerticalOffsetSelector: Selector

    /** @description a selector for the start page [pdf] field of
     * the watermark preferences set up */
    watermarkStartPageSelector: Selector

    /** @description a selector for the end page [pdf] field of the watermark preferences set up */
    watermarkEndPageSelector: Selector

    /** @description a selector for the "add watermark" button in the watermark settings */
    addWatermarkBtn: Selector;

    // data markings selectors
    /** @description a selector for the "Marking Template" Multibox */
    dataMarkingsTemplateSelector: Selector;

    /** @description a selector for the name field of the data marking settings */
    dataMarkingsNameSelector: Selector;

    /** @description a selector for the "Component Type" field of the data markings settings */
    dataMarkingsComponentTypeSelector: Selector;

    /** @description a selector for the "Left Margin [%]" field of the data markings settings */
    dataMarkingsLeftMarginSelector: Selector;

    /** @description a selector for the "Bottom Margin [%]" field of the data markings settings */
    dataMarkingsBottomMarginSelector: Selector;

    /** @description a selector for the "Right Margin [%]" field of the data markings settings */
    dataMarkingsRightMarginSelector: Selector;

    /** @description a selector for the "Top Margin [%]" field of the data markings settings */
    dataMarkingsTopMarginSelector: Selector;

    // data markings text boxes selections
    /** @description a selector for the multibox allowing creation and selection of new textboxes */
    textBoxMultibox: Selector;

    /** @description a selector for the "name" field of the data markings text boxes settings */
    textBoxName: Selector;

    /** @description a selector for the "type" field of the data markings text boxes settings */
    textBoxType: Selector;

    /** @description a selector for the "target number of text lines" field
     * of the data markings text boxes settings */
    textBoxTargetLines: Selector;

    /** @description a selector for the "rich text" field of the
     * data markings text boxes settings */
    textBoxRichText: Selector;

    /** @description a selector for the "text alignment" field of the
     * data markings text boxes settings */
    textBoxTextAlignment: Selector;

    /** @description a selector for the "text box placement" field of the
     * data markings text boxes settings */
    textBoxPlacement: Selector;

    /** @description a selector for the "width" field of the data markings text boxes settings */
    textBoxWidth: Selector;

    /** @description a selector for the "height" field of the data markings text boxes settings */
    textBoxHeight: Selector;

    /** @description a selector for the "add template" button of the data markings panel */
    addTemplateBtn: Selector;

    /** @description a selector for the "add text box" button of the data markings panel */
    addTextBoxBtn: Selector;

    constructor() {
      // this.templateIdForImgSelector = sharedElements
      /// .withSibling(Selector("div.prefHeader.publishimageid"),Selector("div.prefTitle")
      //   .withText('Template ID for Publishing Images')
      // this.templateIdForPaginatedContentSelector
      this.contentThumbWidthSelector = Selector('input.publish_thumbnailwidth.form-control');
      this.contentThumbHeightSelector = Selector('input.publish_thumbnailheight.form-control');
      this.publishingUserSelector = Selector('input.publishuser.form-control');
      this.publishingPasswordSelector = Selector('input.publishpassword').withAttribute('type', 'password');
      // this.watermarkPreferencesMultiBoxSelector = Selector('');
      this.watermarkTextInputSelector = Selector('#formHorizontalWatermarkText');
      this.watermarkFontOpacitySelector = Selector('#formHorizontalFontOpacity');
      this.watermarkFontSelector = Selector('#formHorizontalFontFamily');
      this.watermarkFontColorSelector = Selector('#formHorizontalFontColor');
      // this.watermarkTextAlignSelector = Selector('');
      this.watermarkRotationSelector = Selector('#formHorizontalRotation');
      // this.watermarkHorizontalPositionSelector = Selector('');
      // this.watermarkVerticalPositionSelector = Selector('');
      this.watermarkHorizontalOffsetSelector = Selector('#formHorizontalOffset');
      this.watermarkVerticalOffsetSelector = Selector('#formVerticalOffset');
      this.watermarkStartPageSelector = Selector('#formStartPage');
      this.watermarkEndPageSelector = Selector('#formEndPage');
      this.addWatermarkBtn = sharedElements.genericBtn.withText(/add watermark/gi);
      this.dataMarkingsTemplateSelector = Selector('#markings-select-col').find('div.css-1g6gooi');
      this.dataMarkingsNameSelector = Selector('#formHorizontalName');
      // this.dataMarkingsComponentTypeSelector = Selector;
      this.dataMarkingsLeftMarginSelector = Selector('#formHorizontalLeftMargin');
      this.dataMarkingsBottomMarginSelector = Selector('#formHorizontalBottomMargin');
      this.dataMarkingsRightMarginSelector = Selector('#formHorizontalRightMargin');
      this.dataMarkingsTopMarginSelector = Selector('#formHorizontalTopMargin');
      // this.textBoxMultibox
      this.textBoxName = Selector('#formHorizontalTextBoxName');
      // this.textBoxType = Selector()
      this.textBoxTargetLines = Selector('#formHorizontalTargetRows');
      this.textBoxRichText = Selector('#editor');
      // this.textBoxTextAlignment = Selector
      // this.textBoxPlacement = Selector
      this.textBoxWidth = Selector('#formHorizontalWidth');
      this.textBoxHeight = Selector('#formHorizontalHeight');
      this.addTemplateBtn = sharedElements.genericBtn.withText(/add template/gi);
      this.addTextBoxBtn = sharedElements.genericBtn.withText(/add text box/gi);
      this.savePreferencesBtn = sharedElements.genericBtn.withText(/Save Preferences/gi);
    }
}
