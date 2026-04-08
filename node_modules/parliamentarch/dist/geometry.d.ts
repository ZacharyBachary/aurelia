/**
 * Returns the thickness of a row in the same unit as the coordinates.
 * It is equal to the diameter of a single seat.
 *
 * If you divide the half-disk of the hemicycle into one half-disk of half the radius and one half-annulus outside of it,
 * the innermost row lies on the border between the two, and the outermost row lies entirely inside the half-annulus.
 * So, looking at the line cutting the circle and the annulus in half (which is the bottom border of the diagram),
 * all rows minus one half of the innermost are on the left, same on the right,
 * and the radius of the void at the center is equal to that value again.
 * So, total = 4 * (nRows-.5) = 4 * nRows - 2.
 */
export declare function getRowThickness(nRows: number): number;
/**
 * This indicates the maximal number of seats for each row for a given number of rows.
 * @returns an array of number of seats per row, from inner to outer.
 * The length of the array nRows.
 * spanAngle, if provided, is the angle in degrees that the hemicycle, as an annulus arc, covers.
 */
export declare function getRowsFromNRows(nRows: number, spanAngle?: number): number[];
/**
 * Returns the minial number of rows necessary to contain nSeats seats.
 */
export declare function getNRowsFromNSeats(nSeats: number, spanAngle?: number): number;
export declare enum FillingStrategy {
    /**
     * The seats are distributed among all the rows,
     * proportionally to the maximal number of seats each row can contain.
     */
    DEFAULT = "default",
    /**
     * Selects as few outermost rows as necessary, then distributes the seats among them,
     * proportionally to the maximal number of seats each row can contain.
     */
    EMPTY_INNER = "empty_inner",
    /**
     * Fills up the rows as much as possible, starting from the outermost ones.
     */
    OUTER_PRIORITY = "outer_priority"
}
export interface GetSeatsCentersOptions {
    minNRows: number;
    fillingStrategy: FillingStrategy;
    spanAngle: number;
}
/**
 * Computes the coordinates of the centers of the seats, with (as a bonus) the angle of each seat in the hemicycle.
 * The canvas is assumed to be 2 in width and 1 in height, with the x axis pointing right and the y axis pointing up.
 * The angle is calculated from the [1, 0] center of the hemicycle, in radians and in trigonometric positive direction,
 * tending to 0 for the rightmost seats, 90° or PI/2 for the center, and 180° or PI for the leftmost seats.
 * @param minNRows The minimal number of rows required to contain `nSeats` seats will be computed automatically.
 * If `minNRows` is greater, then that will be the number of rows, otherwise the parameter is ignored.
 * Passing a higher number of rows will make the diagram sparser,
 * for which non-default filling strategies are more adapted.
 * @param fillingStrategy determines how the seats are distributed among the rows, see the `FillingStrategy` enum.
 * @param spanAngle is the angle from the side of the rightmost seats,
 * through the center, to the side of the leftmost seats.
 * It takes a value in degrees and defaults to 180 to make a true hemicycle.
 * Values above 180 are not supported.
 * @returns a map whose keys are the seat centers as [x, y] coordinates, with the angle of the seat as values.
 */
export declare function getSeatsCenters(nSeats: number, { minNRows, fillingStrategy, spanAngle, }?: Partial<GetSeatsCentersOptions>): Map<[number, number], number>;
