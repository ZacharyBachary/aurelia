import { GetSeatsCentersOptions } from "./geometry.js";
import { GetGroupedSVGOptions, SeatData, SeatDataWithNumber } from "./svg.js";
type AllOptions = Partial<GetSeatsCentersOptions & GetGroupedSVGOptions & {
    seatRadiusFactor: number;
}>;
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
export declare class ParliamentArch extends HTMLElement {
    #private;
    static observedAttributes: string[];
    constructor(attribution?: readonly SeatDataWithNumber[] | Map<SeatData, number>, options?: AllOptions);
    /**
     * This method resets and overrides both the attribution and the options.
     * If the DOM is updated, either through the attributes or the children,
     * the changes will override the values set through this method.
     *
     * The changes will not take effect until the next call to `render()`.
     */
    setAttributionAndOptions(attribution: readonly SeatDataWithNumber[] | Map<SeatData, number>, options?: AllOptions): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null): void;
    private updateOptions;
    private updateAttribution;
    private convertParty;
    /**
     * This method renders the SVG and places it in the shadow DOM.
     * It should only be called when the component is connected to the DOM.
     */
    render(): void;
}
export {};
