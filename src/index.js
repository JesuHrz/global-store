import { createStore } from './store/index.js'

const $text = document.querySelector('.js-count')
const $button = document.querySelector('.js-increment')

const store = createStore({ count: 0 })

window.GLOBAL_STORE = store

window.addEventListener('DOMContentLoaded', () => {
  store.subscribe(() => {
    $text.textContent = store.getState().count
  })

  $button.addEventListener('click', () => {
    store.setState((state) => ({ ...state, count: state.count + 1 }))
  })
})
