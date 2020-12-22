"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMaxSize = void 0;
const maxSizeRegex = /^(?<unParsedSize>(?:[0-9]+|[0-9]*\.[0-9]+))(?<space>\s)?(?<unit>[A-Za-z]+)$/;
exports.parseMaxSize = (maxSize) => {
    const result = maxSize.match(maxSizeRegex);
    if (result && result.groups) {
        const { unit, unParsedSize, space } = result.groups;
        return {
            exactUnit: unit,
            unitForIndex: unit.toUpperCase(),
            unParsedSize: unParsedSize,
            hasSpace: Boolean(space)
        };
    }
    return {
        exactUnit: null,
        unitForIndex: null,
        unParsedSize: null,
        hasSpace: false
    };
};
