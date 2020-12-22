"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAssetConfig = void 0;
const error_1 = require("./error");
exports.processAssetConfig = (fileName, config, compilation, options) => {
    var _a;
    const key = (_a = options.key) !== null && _a !== void 0 ? _a : 'bundles';
    const bundles = config[key].filter(bundle => bundle.name === fileName);
    if (bundles && bundles.length) {
        return bundles[0];
    }
    const match = config[key]
        .map(bundle => ({ regex: new RegExp(bundle.name), fileName }))
        .filter(fileRegexObj => fileRegexObj.regex.test(fileName));
    if (match && match.length) {
        if (match.length === 1) {
            return config[key].filter(bundle => new RegExp(bundle.name).toString() === match[0].regex.toString())[0];
        }
        compilation.errors.push(error_1.error(`File "${fileName}" matches multiple patterns: ${match
            .map(config => `"${config.fileName}"`)
            .join(', ')}`));
        return null;
    }
    const err = error_1.error(`No config entry for ${fileName}`);
    if (options.enforceForAllBundles === true) {
        compilation.errors.push(err);
    }
    else {
        compilation.warnings.push(err);
    }
    return null;
};
