import { Config, BundleWithAdditions, WebpackBundleSizeLimitPluginOptions } from './types';
import { Compilation } from './webpack-bundle-size-limit-plugin';
export declare const processAssetConfig: (fileName: string, config: Config, compilation: Compilation, options: WebpackBundleSizeLimitPluginOptions) => BundleWithAdditions | null;
