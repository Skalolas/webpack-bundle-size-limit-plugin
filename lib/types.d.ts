import { WebpackBundleSizeLimitPlugin } from './webpack-bundle-size-limit-plugin';
export { WebpackBundleSizeLimitPlugin };
export interface BundleAdditions {
    name: string;
    unit: string;
    maxSizeInBytes: number;
}
export interface Bundle {
    maxSize: string;
}
export declare type BundleWithAdditions = Bundle & BundleAdditions;
export interface Config {
    [key: string]: BundleWithAdditions[];
}
export interface WebpackBundleSizeLimitPluginOptions {
    /**
     * Absolute path to config file. If not specified, the "bundles" field in
     * package.json will be used. If that field does not exist, an error will
     * be thrown.
     */
    config?: string;
    /**
     * By default, all bundles will be analyzed. If specified, the include
     * field narrows down that list to only those bundles with an extension
     * specified in the list. This option is the opposite of the "exclude" option.
     */
    include?: string[];
    /**
     * By default, all bundles will be analyzed. If specified, the exclude
     * field narrows down that list to only those bundles with an extension NOT
     * specified in the list. This option is the opposite of the "include" option.
     */
    exclude?: string[];
    /**
     * By default, this is false. If a bundle is generated by webpack but is not
     * found in the config file, a warning will be logged. If the flag is set
     * to "true", an error will be logged and will fail the webpack build.
     */
    enforceForAllBundles?: boolean;
    /**
     * By default, the "bundles" object in the config file will be used. However, a different
     * config object can be specified by setting the "key" field. This allows clients to have
     * multiple configurations in a single file.
     */
    key?: string;
}
