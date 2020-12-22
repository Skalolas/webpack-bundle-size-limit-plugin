"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processConfigFile = exports.getConfigFilePath = void 0;
const fs_1 = require("fs");
const error_1 = require("./error");
const size_units_1 = require("./size-units");
const parse_max_size_1 = require("./parse-max-size");
exports.getConfigFilePath = (options, compilation) => {
    const packageJsonFile = `${process.cwd()}/package.json`;
    if (options.config) {
        if (!fs_1.existsSync(options.config)) {
            compilation.errors.push(error_1.error(`File "${options.config}" does not exist`));
        }
        else {
            return options.config;
        }
    }
    else {
        if (!fs_1.existsSync(packageJsonFile)) {
            compilation.errors.push(error_1.error(`No package.json exists at "${packageJsonFile}"`));
        }
        return packageJsonFile;
    }
    return null;
};
const getConfig = (configPath, compilation) => {
    try {
        return require(configPath);
    }
    catch (e) {
        compilation.errors.push(error_1.error([`Failed to require config file at "${configPath}"`]));
        return null;
    }
};
exports.processConfigFile = (configPath, compilation, options) => {
    var _a;
    const rawConfig = getConfig(configPath, compilation);
    if (rawConfig) {
        const clonedConfig = Object.assign({}, rawConfig);
        const bundleKey = (_a = options.key) !== null && _a !== void 0 ? _a : 'bundles';
        if (!clonedConfig[bundleKey]) {
            compilation.errors.push(error_1.error(`Config object must have a "${bundleKey}" field`));
            return null;
        }
        if (!(clonedConfig[bundleKey] instanceof Array)) {
            compilation.errors.push(error_1.error([
                `Invalid type for config.${bundleKey}`,
                'Expected: Array',
                `Found:    ${typeof clonedConfig[bundleKey]}`
            ]));
            return null;
        }
        clonedConfig[bundleKey].forEach(bundle => {
            if (!bundle.name) {
                compilation.errors.push(error_1.error('Config entry is missing "name" property'));
                return;
            }
            if (typeof bundle.name !== 'string') {
                compilation.errors.push(error_1.error([
                    `Invalid type for "name" field in config`,
                    'Expected: string',
                    `Found:    ${typeof bundle.name})`
                ]));
                return;
            }
            if (!bundle.maxSize) {
                compilation.errors.push(error_1.error(`Config entry with name "${bundle.name}" is missing "maxSize" property`));
                return;
            }
            if (typeof bundle.maxSize !== 'string') {
                compilation.errors.push(error_1.error([
                    `Invalid type for "maxSize" field in config entry with name "${bundle.name}".`,
                    'Expected: string',
                    `Found:    ${typeof bundle.maxSize})`
                ]));
                return;
            }
            const { unParsedSize, unitForIndex } = parse_max_size_1.parseMaxSize(bundle.maxSize);
            const isValidUnit = Object.keys(size_units_1.sizeUnits).some(validUnit => validUnit === unitForIndex);
            if (!isValidUnit) {
                compilation.errors.push(error_1.error([
                    `Invalid file size unit for "maxSize" field in config entry with name "${bundle.name}"`,
                    'See the README for details on valid units.'
                ]));
                return;
            }
            try {
                const parsedSize = parseFloat(unParsedSize);
                if (isNaN(parsedSize))
                    throw new Error();
                if (unitForIndex) {
                    bundle.unit = unitForIndex;
                    bundle.maxSizeInBytes = parsedSize * size_units_1.sizeUnits[unitForIndex];
                }
            }
            catch (e) {
                compilation.errors.push(error_1.error([
                    `Invalid number for "maxSize" field in config entry with name "${bundle.name}"`,
                    'Expected: valid number',
                    `Found:    ${unParsedSize}`
                ]));
                return;
            }
        });
        return clonedConfig;
    }
    return null;
};
