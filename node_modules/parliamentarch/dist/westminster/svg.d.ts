import { CoordinatesPerPartyPerArea } from "./common.js";
export interface Party {
    color: string;
    id?: string | undefined;
    data?: string | undefined;
    borderSize?: number | undefined;
    borderColor?: string | undefined;
    roundingRadius?: number | undefined;
}
export interface Options {
    /**
     * The default value for the rounding radius of the corners of the squares,
     * unless overridden for a specific party.
     */
    roundingRadius: number;
    /**
     * The relative spacing between neighboring squares of the same area.
     * This is to be multiplied by the side of a square
     * to get the actual spacing between two neighboring squares.
     */
    spacingFactor: number;
}
export declare function buildSVG(poseidon: CoordinatesPerPartyPerArea<Party>, options?: Partial<Options>): SVGSVGElement;
