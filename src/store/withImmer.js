const { produce } = window.immer
const lodash = window._

export const createStore = (initialState = {}, options = {}) => {
  const listeners = new Set()
  const _inmutableState = produce((draft) => ({ ...initialState, ...draft }))
  let state = _inmutableState(initialState)

  const getState = () => state

  const setState = (fn, force) => {
    const prevState = state
    const newState = fn(state)
    let equals = false

    if (force) {
      state = _inmutableState(newState)
      initialState = {}
    }

    if (typeof options?.compare === 'function') {
      equals = options.compare(prevState, newState)
    }

    if (!equals) {
      state = _inmutableState(newState)

      listeners.forEach((listener) => {
        const _prevState = lodash.cloneDeep(prevState)
        const newState = lodash.cloneDeep(state)

        if (listener.LISTENER) {
          const currentState = listener.STATE
          const nextState = listener.SELECTOR(state)

          if (!Object.is(currentState, nextState)) {
            listener.STATE = nextState
            listener(newState, _prevState)
          }

          return
        }

        listener(newState, _prevState)
      })
    }
  }

  const subscribe = (listener, selector) => {
    if (selector) {
      listener.LISTENER= Symbol('@@listener')
      listener.STATE = selector(state)
      listener.SELECTOR = selector
    }

    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return { getState, setState, subscribe }
}

// Observer Pattern
// https://www.patterns.dev/posts/observer-pattern/
