export type PathSegment = string | number
export type Path = PathSegment[]

type Context = {
  depth: number
  cutOff: number
}

const stringifyPath = (path: Path, context?: Context): string => path.reduce((acc: string, segment, index) => {
  if (index < (context?.cutOff ?? 0)) return acc
  if (typeof segment === 'string') return `${acc}.${segment}`
  return `${acc}[${segment}]`
}, `${' '.repeat((context?.depth ?? 0) * 2)}$`)

export type Schema<T> = {
  (value: any, path?: Path): value is T
}

export type FromSchema<S> = S extends Schema<infer T> ? T : never

export function isString(): Schema<string>
export function isString<T extends string>(exact: T): Schema<T>
export function isString<T extends string>(exact?: T): Schema<T | string> {
  const error = (path: Path) => ({
    expected: 'string',
    path,
    toString: (context?: Context) => {
      return `${stringifyPath(path, context)}: expected string`
    }
  })
  if (exact !== undefined) return (value, path): value is T => {
    if (value !== exact) throw error(path ?? [])
    return true
  }
  return (value, path): value is string => {
    if (typeof value !== 'string') throw error(path ?? [])
    return true
  }
}

export function isNumber(): Schema<number>
export function isNumber<T extends number>(exact: T): Schema<T>
export function isNumber<T extends number>(exact?: T): Schema<T | number> {
  const error = (path: Path) => ({
    expected: 'number',
    path,
    toString: (context?: Context) => `${stringifyPath(path, context)}: expected number`,
  })
  if (exact !== undefined) return (value, path): value is T => {
    if (value !== exact) throw error(path ?? [])
    return true
  }
  return (value, path): value is number => {
    if (typeof value !== 'number') throw error(path ?? [])
    return true
  }
}

export function isBoolean(): Schema<boolean>
export function isBoolean<T extends boolean>(exact: T): Schema<T>
export function isBoolean<T extends boolean>(exact?: T): Schema<T | boolean> {
  const error = (path: Path) => ({
    expected: 'boolean',
    path,
    toString: (context?: Context) => `${stringifyPath(path, context)}: expected boolean`,
  })

  if (exact !== undefined) return (value, path): value is T => {
    if (value !== exact) throw error(path ?? [])
    return true
  }
  return (value, path): value is boolean => {
    if (typeof value !== 'boolean') throw error(path ?? [])
    return true
  }
}

export const isNull: Schema<null> = (value, path): value is null => {
  if (value !== null) throw {
    expected: 'null',
    path,
    toString: (context?: Context) => `${stringifyPath(path ?? [], context)}: expected null`,
  }
  return true
}
export const isUndefined: Schema<undefined> = (value, path): value is undefined => {
  if (value !== undefined) throw {
    expected: 'undefined',
    path,
    toString: (context?: Context) => `${stringifyPath(path ?? [], context)}: expected undefined`,
  }
  return true
}

export function isArray(): Schema<unknown[]>
export function isArray<T>(schema: Schema<T>): Schema<T[]>
export function isArray<T>(schema?: Schema<T>): Schema<(T | unknown)[]> {
  const error = (path: Path) => ({
    expected: 'array',
    path,
    toString: (context?: Context) => `${stringifyPath(path, context)}: expected array`,
  })
  if (schema === undefined) return (value, path): value is unknown[] => {
    if (!Array.isArray(value)) throw error(path ?? [])
    return true
  }
  return (value, path): value is T[] => {
    if (!Array.isArray(value)) throw error(path ?? [])

    value.forEach((element, index) => schema(element, [...path ?? [], index]))

    return true
  }
}

export function has<Key extends string, Property>(key: Key, schema: Schema<Property>): Schema<Property extends undefined ? { [K in Key]?: Property } : { [K in Key]: Property }> {
  return (value, path): value is (Property extends undefined ? { [K in Key]?: Property } : { [K in Key]: Property }) => {
    
    if (typeof value !== 'object' || Array.isArray(value)) throw {
      expected: 'object',
      path,
      toString: (context?: Context) => `${stringifyPath(path ?? [], context)}: expected object`,
    }
    return schema(value[key], [...path ?? [], key])
  }
}

export function at<Key extends number, Property>(key: Key, schema: Schema<Property>): Schema<{ [K in Key]: Property }> {
  return (value, path): value is { [K in Key]: Property } => {
    if (!Array.isArray(value)) throw {
      expected: 'array',
      path,
      toString: (context?: Context) => `${stringifyPath(path ?? [], context)}: expected array`,
    }
    return schema(value[key], [...path ?? [], key])
  }
}

export function oneOf<A, B>(
  s0: Schema<A>,
  s1: Schema<B>,
): Schema<A | B>
export function oneOf<A, B, C>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
): Schema<A | B | C>
export function oneOf<A, B, C, D>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
): Schema<A | B | C | D>
export function oneOf<A, B, C, D>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
): Schema<A | B | C | D>
export function oneOf<A, B, C, D, E>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
  s4: Schema<E>,
): Schema<A | B | C | D | E>
export function oneOf<A, B, C, D, E, F>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
  s4: Schema<E>,
  s5: Schema<F>,
): Schema<A | B | C | D | E | F>
export function oneOf<A, B, C, D, E, F, G>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
  s4: Schema<E>,
  s5: Schema<F>,
  s6: Schema<G>,
): Schema<A | B | C | D | E | F | G>
export function oneOf<A, B, C, D, E, F, G, H>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
  s4: Schema<E>,
  s5: Schema<F>,
  s6: Schema<G>,
  s7: Schema<H>,
): Schema<A | B | C | D | E | F | G | H>
export function oneOf<A, B, C, D, E, F, G, H, I>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
  s4: Schema<E>,
  s5: Schema<F>,
  s6: Schema<G>,
  s7: Schema<H>,
  s8: Schema<I>,
): Schema<A | B | C | D | E | F | G | H | I>
export function oneOf<A, B, C, D, E, F, G, H, I, J>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
  s4: Schema<E>,
  s5: Schema<F>,
  s6: Schema<G>,
  s7: Schema<H>,
  s8: Schema<I>,
  s9: Schema<J>,
): Schema<A | B | C | D | E | F | G | H | I | J>
export function oneOf(
  ...args: Schema<any>[]
): Schema<any> {
  return (value, path): value is any => {
    const errors: any[] = []
    for (const schema of args)
      try { schema(value, path ?? []) }
      catch (error) { errors.push(error) }
    if (errors.length < args.length) return true
    throw {
      expected: 'one-of',
      errors,
      path,
      toString: (context?: Context) => {
        const innerContext = {
          depth: (context?.depth ?? 0) + 1,
          cutOff: path?.length ?? 0,
        }
        return `${stringifyPath(path ?? [], context)}: one-of [\n${errors.reduce((acc: string | undefined, error: { toString(context: Context): string }) => {
          if (acc === undefined) return error.toString(innerContext)
          return `${acc}\n${error.toString(innerContext)}`
        }, undefined)}\n${' '.repeat((context?.depth ?? 0) * 2)}]`
      }
    }
  }
}

export function allOf<A, B>(
  s0: Schema<A>,
  s1: Schema<B>,
): Schema<A & B>
export function allOf<A, B, C>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
): Schema<A & B & C>
export function allOf<A, B, C, D>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
): Schema<A & B & C & D>
export function allOf<A, B, C, D>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
): Schema<A & B & C & D>
export function allOf<A, B, C, D, E>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
  s4: Schema<E>,
): Schema<A & B & C & D & E>
export function allOf<A, B, C, D, E, F>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
  s4: Schema<E>,
  s5: Schema<F>,
): Schema<A & B & C & D & E & F>
export function allOf<A, B, C, D, E, F, G>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
  s4: Schema<E>,
  s5: Schema<F>,
  s6: Schema<G>,
): Schema<A & B & C & D & E & F & G>
export function allOf<A, B, C, D, E, F, G, H>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
  s4: Schema<E>,
  s5: Schema<F>,
  s6: Schema<G>,
  s7: Schema<H>,
): Schema<A & B & C & D & E & F & G & H>
export function allOf<A, B, C, D, E, F, G, H, I>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
  s4: Schema<E>,
  s5: Schema<F>,
  s6: Schema<G>,
  s7: Schema<H>,
  s8: Schema<I>,
): Schema<A & B & C & D & E & F & G & H & I>
export function allOf<A, B, C, D, E, F, G, H, I, J>(
  s0: Schema<A>,
  s1: Schema<B>,
  s2: Schema<C>,
  s3: Schema<D>,
  s4: Schema<E>,
  s5: Schema<F>,
  s6: Schema<G>,
  s7: Schema<H>,
  s8: Schema<I>,
  s9: Schema<J>,
): Schema<A & B & C & D & E & F & G & H & I & J>
export function allOf(
  ...args: Schema<any>[]
): Schema<any> {
  return (value, path): value is any => {
    const errors: any[] = []
    for (const schema of args)
      try { schema(value, path ?? []) }
      catch (error) { errors.push(error) }
    if (errors.length === 0) return true
    throw {
      expected: 'all-of',
      errors,
      path,
      toString: (context?: Context) => {
        const innerContext = {
          depth: (context?.depth ?? 0) + 1,
          cutOff: path?.length ?? 0,
        }
        return `${stringifyPath(path ?? [], context)}: all-of [\n${errors.reduce((acc: string | undefined, error: { toString(context: Context): string }) => {
          if (acc === undefined) return error.toString(innerContext)
          return `${acc}\n${error.toString(innerContext)}`
        }, undefined)}\n${' '.repeat((context?.depth ?? 0) * 2)}]`
      }
    }
  }
}
