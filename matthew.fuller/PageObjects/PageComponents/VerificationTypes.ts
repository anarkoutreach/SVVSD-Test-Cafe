/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/** * @enum  An enum representing all possible types for a verification step
 */
// eslint-disable-next-line import/prefer-default-export
export enum VerificationTypes {
    TEXT = 'text',
    DECIMAL = 'decimal',
    INTEGER = 'integer',
    DATE = 'date',
    CHECKBOX = 'checkbox',
    DROPDOWN = 'dropdown',
    MULTISELECT = 'multi-select',
    FILE = 'file',
    UNKNOWN = 'unknown'
}
