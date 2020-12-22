"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const basicError = (err) => `webpack-bundle-size-limit-plugin. ${err}`;
exports.error = (errors) => {
    if (!errors.length)
        return '';
    if (typeof errors === 'string')
        return basicError(errors);
    if (errors.length === 1)
        return basicError(errors[0]);
    const errorTitle = errors.shift();
    return errors.reduce((str, nextLine) => (str += `\n  ${nextLine}`), `${basicError(errorTitle)}`);
};
