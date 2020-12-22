import { WebpackBundleSizeLimitPluginOptions } from './types';
import { Compiler, compilation as compilationType } from 'webpack';
export declare type Compilation = compilationType.Compilation;
export declare class WebpackBundleSizeLimitPlugin {
    private options;
    constructor(options?: WebpackBundleSizeLimitPluginOptions);
    private filterAssetByFileExtension;
    private fromByteToX;
    private getSizeInBytes;
    apply(compiler: Compiler): void;
}
