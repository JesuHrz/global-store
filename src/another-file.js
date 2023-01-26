window.addEventListener('DOMContentLoaded', () => {
  const store = window.GLOBAL_STORE
  store.subscribe(() => {
    console.log('Global state from another file', store.getState())
  })

  store.subscribe(() => {
    console.log('Updated count state from another file', store.getState())
  }, (state) => state.count)

  store.subscribe(() => {
    console.log('Updated text state from another file', store.getState())
  }, (state) => state.text)
})
