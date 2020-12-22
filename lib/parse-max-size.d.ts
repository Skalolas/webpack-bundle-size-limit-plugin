interface MaxSize {
    exactUnit: string | null;
    unitForIndex: string | null;
    unParsedSize: string | null;
    hasSpace: boolean;
}
export declare const parseMaxSize: (maxSize: string) => MaxSize;
export {};
