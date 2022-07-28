export declare type PathSegment = string | number;
export declare type Path = PathSegment[];
export declare type Schema<T> = {
    (value: any, path?: Path): value is T;
};
export declare type FromSchema<S> = S extends Schema<infer T> ? T : never;
export declare function isString(): Schema<string>;
export declare function isString<T extends string>(exact: T): Schema<T>;
export declare function isNumber(): Schema<number>;
export declare function isNumber<T extends number>(exact: T): Schema<T>;
export declare function isBoolean(): Schema<boolean>;
export declare function isBoolean<T extends boolean>(exact: T): Schema<T>;
export declare const isNull: Schema<null>;
export declare const isUndefined: Schema<undefined>;
export declare function isArray(): Schema<unknown[]>;
export declare function isArray<T>(schema: Schema<T>): Schema<T[]>;
export declare function has<Key extends string, Property>(key: Key, schema: Schema<Property>): Schema<Property extends undefined ? {
    [K in Key]?: Property;
} : {
    [K in Key]: Property;
}>;
export declare function at<Key extends number, Property>(key: Key, schema: Schema<Property>): Schema<{
    [K in Key]: Property;
}>;
export declare function oneOf<A, B>(s0: Schema<A>, s1: Schema<B>): Schema<A | B>;
export declare function oneOf<A, B, C>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>): Schema<A | B | C>;
export declare function oneOf<A, B, C, D>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>): Schema<A | B | C | D>;
export declare function oneOf<A, B, C, D>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>): Schema<A | B | C | D>;
export declare function oneOf<A, B, C, D, E>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>, s4: Schema<E>): Schema<A | B | C | D | E>;
export declare function oneOf<A, B, C, D, E, F>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>, s4: Schema<E>, s5: Schema<F>): Schema<A | B | C | D | E | F>;
export declare function oneOf<A, B, C, D, E, F, G>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>, s4: Schema<E>, s5: Schema<F>, s6: Schema<G>): Schema<A | B | C | D | E | F | G>;
export declare function oneOf<A, B, C, D, E, F, G, H>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>, s4: Schema<E>, s5: Schema<F>, s6: Schema<G>, s7: Schema<H>): Schema<A | B | C | D | E | F | G | H>;
export declare function oneOf<A, B, C, D, E, F, G, H, I>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>, s4: Schema<E>, s5: Schema<F>, s6: Schema<G>, s7: Schema<H>, s8: Schema<I>): Schema<A | B | C | D | E | F | G | H | I>;
export declare function oneOf<A, B, C, D, E, F, G, H, I, J>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>, s4: Schema<E>, s5: Schema<F>, s6: Schema<G>, s7: Schema<H>, s8: Schema<I>, s9: Schema<J>): Schema<A | B | C | D | E | F | G | H | I | J>;
export declare function allOf<A, B>(s0: Schema<A>, s1: Schema<B>): Schema<A & B>;
export declare function allOf<A, B, C>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>): Schema<A & B & C>;
export declare function allOf<A, B, C, D>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>): Schema<A & B & C & D>;
export declare function allOf<A, B, C, D>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>): Schema<A & B & C & D>;
export declare function allOf<A, B, C, D, E>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>, s4: Schema<E>): Schema<A & B & C & D & E>;
export declare function allOf<A, B, C, D, E, F>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>, s4: Schema<E>, s5: Schema<F>): Schema<A & B & C & D & E & F>;
export declare function allOf<A, B, C, D, E, F, G>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>, s4: Schema<E>, s5: Schema<F>, s6: Schema<G>): Schema<A & B & C & D & E & F & G>;
export declare function allOf<A, B, C, D, E, F, G, H>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>, s4: Schema<E>, s5: Schema<F>, s6: Schema<G>, s7: Schema<H>): Schema<A & B & C & D & E & F & G & H>;
export declare function allOf<A, B, C, D, E, F, G, H, I>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>, s4: Schema<E>, s5: Schema<F>, s6: Schema<G>, s7: Schema<H>, s8: Schema<I>): Schema<A & B & C & D & E & F & G & H & I>;
export declare function allOf<A, B, C, D, E, F, G, H, I, J>(s0: Schema<A>, s1: Schema<B>, s2: Schema<C>, s3: Schema<D>, s4: Schema<E>, s5: Schema<F>, s6: Schema<G>, s7: Schema<H>, s8: Schema<I>, s9: Schema<J>): Schema<A & B & C & D & E & F & G & H & I & J>;
