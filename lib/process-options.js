"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOptions = void 0;
const error_1 = require("./error");
const processIncludeExclude = (options, compilation, includeExclude) => {
    if (options[includeExclude]) {
        if (!(options[includeExclude] instanceof Array)) {
            compilation.errors.push(error_1.error([
                `Invalid type for options.${includeExclude}`,
                'Expected: Array',
                `Found:    ${typeof options[includeExclude]}`
            ]));
        }
        else {
            for (const option of options[includeExclude]) {
                if (typeof option !== 'string') {
                    compilation.errors.push(error_1.error([
                        `Invalid type for options.${includeExclude} for "${option}"`,
                        'Expected: string',
                        `Found:    ${typeof option}`
                    ]));
                }
                if (!option.startsWith('.')) {
                    compilation.warnings.push(error_1.error([
                        '',
                        `Each entry in options.${includeExclude} should start with "." to avoid common pitfalls (e.g. should be ".${option}" instead of "${option}")`
                    ]));
                }
            }
        }
    }
};
exports.processOptions = (rawOptions, compilation) => {
    var _a;
    const options = Object.assign({}, rawOptions);
    if (options.include && options.exclude) {
        compilation.errors.push(error_1.error('Only one of the following options can be specified: [include, exclude]'));
    }
    processIncludeExclude(options, compilation, 'include');
    processIncludeExclude(options, compilation, 'exclude');
    options.enforceForAllBundles = (_a = options.enforceForAllBundles) !== null && _a !== void 0 ? _a : false;
    return options;
};
