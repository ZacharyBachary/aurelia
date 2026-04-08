var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ParliamentArch_shadow, _ParliamentArch_attribution, _ParliamentArch_options, _ParliamentArch_observer;
import { FillingStrategy } from "./geometry.js";
import { getSVGFromAttribution } from "./index.js";
const partyInnerTagsLowercase = new Set([
    "party",
    "group",
    "seat-data",
]);
/**
 * This element will generate a parliament arch SVG. Its tag name is `<parliament-arch>`.
 * It takes the same data as `getSVGFromAttribution`, in two possible ways:
 * - through its constructor, with the same signature as `getSVGFromAttribution`
 * - through its attributes and children.
 * - through the `setAttributionAndOptions` method (same signature as `getSVGFromAttribution`).
 *
 * The attributes set the options. They are of the form `data-*`,
 * where `*` is the kebab-case version of the option name.
 * For example, `data-seat-radius-factor="0.8"` sets the `seatRadiusFactor` option to 0.8.
 * The attributes override the values set in the constructor.
 *
 * When passed through its children, there may be one or multiple party nodes.
 * The party nodes may be `<party>`, `<group>`, or `<seat-data>`.
 * The attributes are of the form data-*, where `*` is the kebab-case version of the property name.
 * For example, `data-border-size="0.05"` sets the `borderSize` property to 0.05,
 * and `data-data="Some info"` sets the `data` property to "Some info".
 * The number of seats of the party may be specified
 * either through the `data-n-seats` attribute or through the text content of the node.
 * As with `SeatData`, the color (`data-color`) is required.
 * If any party node is present, the parties passed through the constructor are discarded.
 *
 * It is advised to only set the attribution and options through one of the three methods.
 */
export class ParliamentArch extends HTMLElement {
    constructor(attribution = [], options = {}) {
        super();
        _ParliamentArch_shadow.set(this, void 0);
        _ParliamentArch_attribution.set(this, void 0);
        _ParliamentArch_options.set(this, void 0);
        _ParliamentArch_observer.set(this, void 0);
        __classPrivateFieldSet(this, _ParliamentArch_shadow, this.attachShadow({ mode: "open" }), "f");
        __classPrivateFieldSet(this, _ParliamentArch_attribution, attribution, "f");
        __classPrivateFieldSet(this, _ParliamentArch_options, options, "f");
        // Setup MutationObserver to watch child changes
        __classPrivateFieldSet(this, _ParliamentArch_observer, new MutationObserver(() => this.updateAttribution()), "f");
    }
    /**
     * This method resets and overrides both the attribution and the options.
     * If the DOM is updated, either through the attributes or the children,
     * the changes will override the values set through this method.
     *
     * The changes will not take effect until the next call to `render()`.
     */
    setAttributionAndOptions(attribution, options = {}) {
        __classPrivateFieldSet(this, _ParliamentArch_attribution, attribution, "f");
        __classPrivateFieldSet(this, _ParliamentArch_options, options, "f");
    }
    connectedCallback() {
        // Start observing when the component is added to the DOM
        __classPrivateFieldGet(this, _ParliamentArch_observer, "f").observe(this, { childList: true });
        // Initial data processing
        this.updateAttribution();
    }
    disconnectedCallback() {
        // Stop observing when removed from the DOM
        __classPrivateFieldGet(this, _ParliamentArch_observer, "f").disconnect();
    }
    attributeChangedCallback(_name, _oldValue, _newValue) {
        this.updateOptions(this.dataset);
    }
    updateOptions(data) {
        for (const numberOption of ["seatRadiusFactor", "minNRows", "spanAngle", "canvasSize", "fontSizeFactor"]) {
            if (numberOption in data) {
                const value = +(data[numberOption]);
                if (!Number.isNaN(value)) {
                    __classPrivateFieldGet(this, _ParliamentArch_options, "f")[numberOption] = value;
                }
            }
        }
        for (const booleanOption of ["writeNumberOfSeats"]) {
            if (booleanOption in data) {
                const value = data[booleanOption].toLowerCase();
                __classPrivateFieldGet(this, _ParliamentArch_options, "f")[booleanOption] = value === "true";
            }
        }
        for (const stringOption of ["fillingStrategy"]) {
            if (stringOption in data) {
                const value = data[stringOption];
                if (value in Object.values(FillingStrategy)) {
                    __classPrivateFieldGet(this, _ParliamentArch_options, "f")[stringOption] = value;
                }
            }
        }
        if ("margins" in data) {
            const parts = data["margins"].split(",").map(s => +s.trim());
            if (!parts.some(p => Number.isNaN(p))) {
                if (parts.length === 1) {
                    __classPrivateFieldGet(this, _ParliamentArch_options, "f").margins = parts[0];
                }
                else if (parts.length === 2) {
                    __classPrivateFieldGet(this, _ParliamentArch_options, "f").margins = [parts[0], parts[1]];
                }
                else if (parts.length === 4) {
                    __classPrivateFieldGet(this, _ParliamentArch_options, "f").margins = [parts[0], parts[1], parts[2], parts[3]];
                }
            }
        }
    }
    updateAttribution() {
        // Extract attribution data from child elements
        const attribution = Array.from(this.children, child => {
            if (child instanceof HTMLElement && partyInnerTagsLowercase.has(child.tagName.toLowerCase())) {
                return this.convertParty(child.dataset, child.textContent);
            }
            return null;
        }).filter(party => party !== null);
        if (attribution.length > 0) {
            __classPrivateFieldSet(this, _ParliamentArch_attribution, attribution, "f");
        }
        this.render();
    }
    convertParty(data, textContent) {
        var _a;
        const color = data["color"];
        if (!color) {
            return null;
        }
        const borderSizeStr = data["borderSize"];
        const nSeatsStr = (_a = data["nSeats"]) !== null && _a !== void 0 ? _a : textContent;
        return {
            color,
            id: data["id"],
            data: data["data"],
            borderSize: borderSizeStr ? +borderSizeStr : undefined,
            borderColor: data["borderColor"],
            nSeats: nSeatsStr ? +nSeatsStr : undefined,
        };
    }
    /**
     * This method renders the SVG and places it in the shadow DOM.
     * It should only be called when the component is connected to the DOM.
     */
    render() {
        __classPrivateFieldGet(this, _ParliamentArch_shadow, "f").replaceChildren();
        let svgElement;
        try {
            svgElement = getSVGFromAttribution(__classPrivateFieldGet(this, _ParliamentArch_attribution, "f"), __classPrivateFieldGet(this, _ParliamentArch_options, "f"));
        }
        catch (error) {
            console.error("Error rendering SVG:", error);
        }
        if (svgElement) {
            __classPrivateFieldGet(this, _ParliamentArch_shadow, "f").appendChild(svgElement);
        }
    }
}
_ParliamentArch_shadow = new WeakMap(), _ParliamentArch_attribution = new WeakMap(), _ParliamentArch_options = new WeakMap(), _ParliamentArch_observer = new WeakMap();
// The options
ParliamentArch.observedAttributes = [
    "data-seat-radius-factor", // number
    "data-min-n-rows", // number
    "data-filling-strategy",
    "data-span-angle", // number
    "data-canvas-size", // number
    "data-margins",
    "data-write-number-of-seats",
    "data-font-size-factor", // number
];
// Define the custom element
customElements.define("parliament-arch", ParliamentArch);
//# sourceMappingURL=component.js.map