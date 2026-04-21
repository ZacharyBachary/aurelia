export declare const WINGS: readonly ["opposition", "government"];
export type Wing = (typeof WINGS)[number];
export declare const AREAS: readonly ["speak", "opposition", "government", "cross"];
export type Area = (typeof AREAS)[number];
/**
 * Rank-file indices for each seat for each party of each area.
 * The rank-file indices are relative to the top-left corner of the area.
 * The extremum values override the demeter parameters.
 */
export type CoordinatesPerPartyPerArea<Party> = Record<Area, Map<Party, [number, number][]>>;
export declare function newRecord<K extends string, V>(keys: readonly K[], valueGenerator: (key: K) => V): { [k in K]: V; };
