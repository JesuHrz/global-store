export const createStore = (initialState) => {
  let state = initialState
  const getState = () => state
  const listeners = new Set()

  const setState = (fn) => {
    state = fn(state)

    listeners.forEach((listener) => {
      if (listener.LISTENER) {
        const currentState = listener.STATE
        const nextState = listener.SELECTOR(state)

        if (currentState !== nextState ) {
          listener.STATE = nextState
          listener()
        }

        return
      }

      listener()
    })
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
