import { Config, WebpackBundleSizeLimitPluginOptions } from './types';
import { Compilation } from './webpack-bundle-size-limit-plugin';
export declare const getConfigFilePath: (options: WebpackBundleSizeLimitPluginOptions, compilation: Compilation) => string | null;
export declare const processConfigFile: (configPath: string, compilation: Compilation, options: WebpackBundleSizeLimitPluginOptions) => Config | null;
