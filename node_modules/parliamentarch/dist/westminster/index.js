import { AREAS, newRecord } from "./common.js";
import { getSeatCoordinatesPerArea } from "./geometry.js";
import { buildSVG } from "./svg.js";
function extractSeats(party) {
    return [party, party.nSeats];
}
function localAttri1to0(attribution) {
    return new Map(attribution);
}
function localAttri2to0(attribution) {
    return new Map(attribution.map(extractSeats));
}
function attri12ToNSeatsPerPartyPerArea(attribution) {
    return newRecord(AREAS, area => {
        const entriesThisArea = attribution[area];
        if (!entriesThisArea) {
            return new Map();
        }
        const entriesAsArray = Array.isArray(entriesThisArea) ?
            entriesThisArea :
            [...entriesThisArea];
        if (entriesAsArray.length === 0) {
            return new Map();
        }
        const first = entriesAsArray[0];
        if (Array.isArray(first)) {
            // 1
            return localAttri1to0(entriesAsArray);
        }
        else {
            // 2
            return localAttri2to0(entriesAsArray);
        }
    });
}
function attri3ArrayToNSeatsPerPartyPerArea(attribution) {
    return newRecord(AREAS, area => {
        return new Map((attribution.filter(([p,]) => p.area === area)));
    });
}
function attri4ToNSeatsPerPartyPerArea(attribution) {
    return newRecord(AREAS, area => {
        return new Map(attribution.filter(p => p.area === area).map(extractSeats));
    });
}
function anyAttributionToNSeatsPerPartyPerArea(attribution) {
    if (AREAS.some(area => area in attribution)) {
        // 1 or 2
        return attri12ToNSeatsPerPartyPerArea(attribution);
    }
    // 3 or 4
    const attributionArray = [...attribution];
    if (attributionArray.length === 0) {
        return newRecord(AREAS, () => new Map());
    }
    if (AREAS.some(area => area in attributionArray[0])) {
        // 4
        return attri4ToNSeatsPerPartyPerArea(attributionArray);
    }
    else {
        // 3
        return attri3ArrayToNSeatsPerPartyPerArea(attributionArray);
    }
}
export function getSVGFromAttribution(attribution, options = {}) {
    return buildSVG(getSeatCoordinatesPerArea(anyAttributionToNSeatsPerPartyPerArea(attribution), options), options);
}
//# sourceMappingURL=index.js.map