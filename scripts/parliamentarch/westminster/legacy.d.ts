export declare const wings: readonly ["left", "right"];
export type Wing = (typeof wings)[number];
export declare const areas: readonly ["head", "left", "right", "center"];
export type Area = (typeof areas)[number];
export declare function treat_inputlist(optionWingrows: number | undefined, partylist: Iterable<SeatDataWithNumber>, cozy: boolean, fullwidth: boolean, centercols: number, roundingRadius: number, spacing: number): SVGSVGElement;
export interface SeatData {
    color: string;
    group: Area;
    id?: string | undefined;
    data?: string | undefined;
}
export interface SeatDataWithNumber extends SeatData {
    nSeats: number;
}
export declare function buildSVG(parties: Iterable<SeatDataWithNumber>, poslist: Iterable<[Area, [number, number][]]>, blockside: number, fullwidthOrCozy: boolean, roundingRadius: number, svgwidth: number, svgheight: number): SVGSVGElement;
