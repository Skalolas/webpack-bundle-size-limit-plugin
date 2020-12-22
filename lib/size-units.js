"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizeUnits = void 0;
const byte = Math.pow(2, 0);
const kiloByte = Math.pow(2, 10);
const megaByte = Math.pow(2, 20);
const gigaByte = Math.pow(2, 30);
const teraByte = Math.pow(2, 40);
exports.sizeUnits = {
    B: byte,
    K: kiloByte,
    M: megaByte,
    G: gigaByte,
    T: teraByte,
    KB: kiloByte,
    MB: megaByte,
    GB: gigaByte,
    TB: teraByte,
    BYTE: byte,
    KILOBYTE: kiloByte,
    MEGABYTE: megaByte,
    GIGABYTE: gigaByte,
    TERABYTE: teraByte,
    BYTES: byte,
    KILOBYTES: kiloByte,
    MEGABYTS: megaByte,
    GIGABYTES: gigaByte,
    TERABYTES: teraByte
};
