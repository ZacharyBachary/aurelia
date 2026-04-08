export const WINGS = ["opposition", "government"];
export const AREAS = ["speak", ...WINGS, "cross"];
export function newRecord(keys, valueGenerator) {
    return Object.fromEntries(keys.map(k => [k, valueGenerator(k)]));
}
//# sourceMappingURL=common.js.map