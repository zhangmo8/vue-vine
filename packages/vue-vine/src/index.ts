import { reactiveComputed } from './utils/reactive'

export * from './defineVibe'

export function useDefaults<P extends Record<string, any>>(props: P, defaults: Partial<P>): Record<string, any> {
  return reactiveComputed(() => {
    const result: Record<string, any> = {}
    for (const key of [
      ...new Set([
        ...Object.keys(props),
        ...Object.keys(defaults),
      ]),
    ]) {
      const maybeDefaultGetter = defaults[key]
      result[key] = props[key] ?? (
        typeof maybeDefaultGetter === 'function'
          ? maybeDefaultGetter()
          : maybeDefaultGetter
      )
    }
    return result
  })
}
