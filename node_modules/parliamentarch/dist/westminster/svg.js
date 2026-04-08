import { AREAS, newRecord } from "./common.js";
/**
 * Makes the document constant available, whether in a browser or in Node.js,
 * without ever importing it in browser mode.
 */
if (!globalThis.document) {
    await import("jsdom")
        .then(m => globalThis.document = new m.JSDOM().window.document)
        .catch(() => console.warn("Failed to load jsdom or the document constant at ParliamentArch load time : you need to set globalThis.document before generating SVGs in Node.js"));
}
const SVG_NS = "http://www.w3.org/2000/svg";
function defaultOptions({ roundingRadius = 0, spacingFactor = 0.1, } = {}) {
    return {
        roundingRadius,
        spacingFactor,
    };
}
export function buildSVG(poseidon, options = {}) {
    const { roundingRadius, spacingFactor } = defaultOptions(options);
    const svg = document.createElementNS(SVG_NS, "svg");
    const [maxX, maxY] = addGroupedSeats(svg, poseidon, { roundingRadius, spacingFactor });
    populateHeader(svg, [maxX, maxY]);
    return svg;
}
function populateHeader(svg, [viewBoxWidth, viewBoxHeight]) {
    svg.setAttribute("xmlns", SVG_NS);
    svg.setAttribute("version", "1.1");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
    svg.appendChild(document.createComment("Created with ParliamentArch (https://github.com/Gouvernathor/ParliamentArch-TS)"));
}
function extremum() {
    const f = (v) => {
        if (f.min === null || v < f.min)
            f.min = v;
        if (f.max === null || v > f.max)
            f.max = v;
    };
    f.min = null;
    f.max = null;
    return f;
}
function addGroupedSeats(container, poseidon, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const extremums = newRecord(AREAS, () => ({ x: extremum(), y: extremum() }));
    const areaContainers = newRecord(AREAS, (area) => {
        const areaContainer = createArea(poseidon[area], extremums[area], options);
        areaContainer.setAttribute("id", `area-${area}`);
        return container.appendChild(areaContainer);
    });
    const maxWingsNCols = Math.max(((_a = extremums.opposition.x.max) !== null && _a !== void 0 ? _a : -1) + 1, ((_b = extremums.government.x.max) !== null && _b !== void 0 ? _b : -1) + 1);
    const oppositionRowsWithAisle = +((_d = (_c = extremums.opposition.y.max) !== null && _c !== void 0 ? _c : extremums.government.y.max) !== null && _d !== void 0 ? _d : -1) + 1
        + 2; // aisle
    const totalWingsNRowsWithAisle = oppositionRowsWithAisle
        + ((_f = (_e = extremums.government.y.max) !== null && _e !== void 0 ? _e : extremums.opposition.y.max) !== null && _f !== void 0 ? _f : -1) + 1;
    // start with the opposition, which will give us the bottom opposition y coordinate
    const oppositionXOffset = 1; // because of the speaker
    const oppositionYOffset = 0;
    areaContainers.opposition.setAttribute("transform", `translate(${oppositionXOffset}, ${oppositionYOffset})`);
    // then the government using that bottom, which will give us the bottom y coordinate
    const governmentXOffset = 1; // because of the speaker
    const governmentYOffset = oppositionRowsWithAisle;
    areaContainers.government.setAttribute("transform", `translate(${governmentXOffset}, ${governmentYOffset})`);
    // then the speaker from the bottom y coordinate
    const speakerXOffset = 0;
    const speakerYOffset = (totalWingsNRowsWithAisle - (((_g = extremums.speak.y.max) !== null && _g !== void 0 ? _g : -1) + 1)) / 2;
    areaContainers.speak.setAttribute("transform", `translate(${speakerXOffset}, ${speakerYOffset})`);
    // then the crossbenchers from the bottom y coordinate and the right x coordinate of the wings
    // we have the right x coordinate of the wings from the max x of both wings
    const crossXOffset = 1 /*speaker*/ + maxWingsNCols + 1 /*gap*/;
    const crossYOffset = (totalWingsNRowsWithAisle - (((_h = extremums.cross.y.max) !== null && _h !== void 0 ? _h : -1) + 1)) / 2;
    areaContainers.cross.setAttribute("transform", `translate(${crossXOffset}, ${crossYOffset})`);
    return [
        crossXOffset + ((_j = extremums.cross.x.max) !== null && _j !== void 0 ? _j : -1) + 1,
        totalWingsNRowsWithAisle,
    ];
}
function createArea(a, ex, { roundingRadius, spacingFactor }) {
    var _a;
    const areaGroup = document.createElementNS(SVG_NS, "g");
    for (const [party, seats] of a) {
        const partyGroup = areaGroup.appendChild(document.createElementNS(SVG_NS, "g"));
        populatePartyGroup(partyGroup, party);
        const partyOptions = {
            roundingRadius: (_a = party.roundingRadius) !== null && _a !== void 0 ? _a : roundingRadius,
            spacingFactor,
        };
        for (const [x, y] of seats) {
            ex.x(x);
            ex.y(y);
            partyGroup.appendChild(rectWithCoordinates(x, y, partyOptions));
        }
    }
    return areaGroup;
}
function populatePartyGroup(partyGroup, party) {
    var _a;
    if (party.id !== undefined) {
        partyGroup.setAttribute("id", party.id);
    }
    if (party.data !== undefined) {
        partyGroup.appendChild(document.createElementNS(SVG_NS, "title"))
            .textContent = party.data;
    }
    partyGroup.setAttribute("fill", party.color);
    if (party.borderSize !== undefined) {
        partyGroup.setAttribute("stroke-width", party.borderSize.toString());
        partyGroup.setAttribute("stroke", (_a = party.borderColor) !== null && _a !== void 0 ? _a : "black");
    }
}
function rectWithCoordinates(x, y, { roundingRadius, spacingFactor }) {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", (spacingFactor / 2 + x).toString());
    rect.setAttribute("y", (spacingFactor / 2 + y).toString());
    rect.setAttribute("width", (1 - spacingFactor).toString());
    rect.setAttribute("height", (1 - spacingFactor).toString());
    rect.setAttribute("rx", roundingRadius.toString());
    rect.setAttribute("ry", roundingRadius.toString());
    return rect;
}
//# sourceMappingURL=svg.js.map