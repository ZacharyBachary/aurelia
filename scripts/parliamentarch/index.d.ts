import { type GetSeatsCentersOptions } from "./geometry.js";
import { type GetGroupedSVGOptions, type SeatData, type SeatDataWithNumber } from "./svg.js";
export { type SeatData, type SeatDataWithNumber } from "./svg.js";
interface GetSVGFromAttributionOptions extends GetSeatsCentersOptions, GetGroupedSVGOptions {
    seatRadiusFactor: number;
}
/**
 * This is the preferred overload.
 */
export declare function getSVGFromAttribution(attribution: Map<SeatData, number> | readonly SeatDataWithNumber[], options?: Partial<GetSVGFromAttributionOptions>): SVGSVGElement;
/**
 * @deprecated
 * This version is deprecated. Please use the overload with the single options object instead.
 */
export declare function getSVGFromAttribution(attribution: Map<SeatData, number> | readonly SeatDataWithNumber[], seatRadiusFactor?: number, getSeatsCentersOptions?: Partial<GetSeatsCentersOptions>, getGroupedSVGOptions?: Partial<GetGroupedSVGOptions>): SVGSVGElement;
