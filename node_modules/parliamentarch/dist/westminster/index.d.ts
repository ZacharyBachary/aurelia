import { Area } from "./common.js";
import { Options as GeometryOptions } from "./geometry.js";
import { Options as SVGOptions, Party } from "./svg.js";
export { Party };
type TWithArea<T> = T & {
    area: Area;
};
type TWithNumber<T> = T & {
    nSeats: number;
};
type TLocatedWithNumber<T> = TWithArea<TWithNumber<T>>;
type LocalAttri1 = Iterable<readonly [Party, number]>;
type LocalAttri2 = readonly TWithNumber<Party>[];
type Attri1 = {
    readonly [area in Area]?: LocalAttri1;
};
type Attri2 = {
    readonly [area in Area]?: LocalAttri2;
};
type Attri3 = Iterable<readonly [TWithArea<Party>, number]>;
type Attri4 = readonly TLocatedWithNumber<Party>[];
type AnyAttribution = Attri1 | Attri2 | Attri3 | Attri4;
export interface Options extends GeometryOptions, SVGOptions {
}
export declare function getSVGFromAttribution(attribution: AnyAttribution, options?: Partial<Options>): SVGSVGElement;
