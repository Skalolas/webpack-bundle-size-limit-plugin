"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackBundleSizeLimitPlugin = void 0;
const process_config_file_1 = require("./process-config-file");
const size_units_1 = require("./size-units");
const process_options_1 = require("./process-options");
const process_asset_config_1 = require("./process-asset-config");
const fs_1 = require("fs");
const error_1 = require("./error");
const parse_max_size_1 = require("./parse-max-size");
class WebpackBundleSizeLimitPlugin {
    constructor(options = {}) {
        this.options = null;
        this.options = options;
    }
    filterAssetByFileExtension(file) {
        var _a, _b, _c, _d;
        let shouldFilter = false;
        if ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.include) === null || _b === void 0 ? void 0 : _b.length) {
            shouldFilter = !this.options.include.some(ext => file.endsWith(ext));
        }
        if ((_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.exclude) === null || _d === void 0 ? void 0 : _d.length) {
            shouldFilter = this.options.exclude.some(ext => file.endsWith(ext));
        }
        return shouldFilter;
    }
    fromByteToX(numBytes, config) {
        const { unitForIndex, hasSpace, exactUnit } = parse_max_size_1.parseMaxSize(config.maxSize);
        const unit = unitForIndex;
        const rawSize = Math.round((numBytes / size_units_1.sizeUnits[unit]) * 100) / 100;
        return `${rawSize}${hasSpace ? ' ' : ''}${exactUnit}`;
    }
    getSizeInBytes(asset, { outputPath }) {
        return fs_1.statSync(`${outputPath}/${asset.split('?')[0]}`).size;
    }
    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync('WebpackBundleSizeLimitPlugin', (compilation, callback) => {
            const options = process_options_1.processOptions(this.options, compilation);
            const configFilePath = process_config_file_1.getConfigFilePath(options, compilation);
            if (configFilePath) {
                const config = process_config_file_1.processConfigFile(configFilePath, compilation, options);
                if (config) {
                    for (const asset in compilation.assets) {
                        if (!this.filterAssetByFileExtension(asset)) {
                            const fileWithAssetConfig = {
                                asset,
                                sizeInBytes: this.getSizeInBytes(asset, compiler),
                                config: process_asset_config_1.processAssetConfig(asset, config, compilation, options)
                            };
                            if (fileWithAssetConfig.config &&
                                fileWithAssetConfig.sizeInBytes >
                                    fileWithAssetConfig.config.maxSizeInBytes) {
                                compilation.errors.push(error_1.error([
                                    'Bundle size exceeded. Please check dependencies',
                                    `Bundle name:  ${fileWithAssetConfig.asset}`,
                                    `Bundle size:  ${this.fromByteToX(fileWithAssetConfig.sizeInBytes, fileWithAssetConfig.config)}`,
                                    `Bundle limit: ${fileWithAssetConfig.config.maxSize}`
                                ]));
                            }
                        }
                    }
                }
            }
            callback();
        });
    }
}
exports.WebpackBundleSizeLimitPlugin = WebpackBundleSizeLimitPlugin;
