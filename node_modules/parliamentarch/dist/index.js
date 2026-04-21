import { getNRowsFromNSeats, getRowThickness, getSeatsCenters } from "./geometry.js";
import { dispatchSeats, getGroupedSVG } from "./svg.js";
export function getSVGFromAttribution(attribution, options = {}, getSeatsCentersOptions = {}, getGroupedSVGOptions = {}) {
    var _a;
    if (!(attribution instanceof Map)) {
        attribution = new Map(attribution.map(seatData => { var _a; return [seatData, (_a = seatData.nSeats) !== null && _a !== void 0 ? _a : 1]; }));
    }
    if (typeof options === "number") {
        options = { seatRadiusFactor: options, ...getSeatsCentersOptions, ...getGroupedSVGOptions };
    }
    (_a = options.seatRadiusFactor) !== null && _a !== void 0 ? _a : (options.seatRadiusFactor = .8);
    const nSeats = [...attribution.values()].reduce((a, b) => a + b, 0);
    const results = getSeatsCenters(nSeats, options);
    const seatCentersByGroup = dispatchSeats(attribution, [...results.keys()].sort((a, b) => results.get(b) - results.get(a)));
    const seatActualRadius = options.seatRadiusFactor * getRowThickness(getNRowsFromNSeats(nSeats));
    return getGroupedSVG(seatCentersByGroup, seatActualRadius, options);
}
//# sourceMappingURL=index.js.map