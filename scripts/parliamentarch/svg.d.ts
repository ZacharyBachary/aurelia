export interface ClassSeatData {
    /**
     * CSS class or classes to apply to this group of seats.
     */
    readonly class?: string | readonly string[];
}
export interface StandaloneSeatData {
    /**
     * The id of this group of seats.
     */
    readonly id?: string | undefined;
    /**
     * Some human-readable data about this group of seats.
     */
    readonly data?: string | undefined;
    /**
     * Sets the fill color of the seats in this group.
     * In CSS class mode, you can replace this with the "fill" property.
     */
    readonly color: string;
    /**
     * Sets the border size of the seats in this group, as a factor of the seat radius.
     * In CSS class mode, you can replace this with the "stroke-width" property.
     */
    readonly borderSize?: number | undefined;
    /**
     * Sets the color of the border of the seats in this group.
     * In CSS class mode, you can replace this with the "stroke" property.
     */
    readonly borderColor?: string | undefined;
}
export type SeatData = ClassSeatData | StandaloneSeatData;
export type SeatDataWithNumber = SeatData & {
    readonly nSeats?: number | undefined;
};
/**
 * Typically S is a tuple of x/y coordinates.
 * Typically the groups are ordered from the left to the right, and the seats are ordered from left to right.
 * If too few or too many seats are provided, an error is thrown.
 * @param groupSeats a mapping of groups associating the groups in a given order to the number of seats each group holds
 * @param seats an iterable of seats in a given order, its length should be the sum of the values in groupSeats
 * @returns a mapping of each group to the seats it holds
 */
export declare function dispatchSeats<S>(groupSeats: Map<SeatData, number> | readonly SeatDataWithNumber[], seats: Iterable<S>): Map<SeatData, S[]>;
export declare function getSVG(seatCenters: Iterable<[[number, number], SeatData]>, seatActualRadius: number, options?: Partial<GetGroupedSVGOptions>): SVGSVGElement;
export interface GetGroupedSVGOptions {
    canvasSize: number;
    margins: number | [number, number] | [number, number, number, number];
    writeNumberOfSeats: boolean;
    fontSizeFactor: number;
}
export declare function getGroupedSVG(seatCentersByGroup: Iterable<[SeatData, [number, number][]]>, seatActualRadius: number, { canvasSize, margins, writeNumberOfSeats, fontSizeFactor, }?: Partial<GetGroupedSVGOptions>): SVGSVGElement;
