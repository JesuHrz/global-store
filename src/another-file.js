window.addEventListener('DOMContentLoaded', () => {
  const store = window.GLOBAL_STORE
  store.subscribe(() => {
    console.log('From another file', store.getState())
  })
})
