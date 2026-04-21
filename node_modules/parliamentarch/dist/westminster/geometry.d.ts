import { Area, CoordinatesPerPartyPerArea } from "./common.js";
/**
 * Number of seats for each party for each area.
 */
export type NSeatsPerPartyPerArea<Party> = Record<Area, ReadonlyMap<Party, number>>;
export interface Options {
    /**
     * The number of rows for each of the two wings.
     * Ignored if 0, invalid if negative.
     * If ignored, the actual number of rows is computed automatically.
     */
    wingNRows: number;
    /**
     * The number of columns for the crossbenchers.
     * Ignored if 0, invalid if negative,
     * will also be ignored if inferior to the total number of crossbenchers.
     * Previously called centerCols.
     * If ignored, the actual number of columns is computed automatically.
     */
    crossNCols: number;
    /**
     * Whether parties of the same wing are allowed to share the same column,
     * or the same row for crossbenchers.
     */
    cozy: boolean;
}
export declare function getSeatCoordinatesPerArea<Party>(apollo: NSeatsPerPartyPerArea<Party>, options?: Partial<Options>): CoordinatesPerPartyPerArea<Party>;
