// import { createStore } from './store/index.js'
import { createStore } from './store/withImmer.js'

const $text = document.querySelector('.js-count')
const $button = document.querySelector('.js-increment')
const $button2 = document.querySelector('.js-increment-2')

const store = createStore({ count: 0, text: '', user: { name: 'Jesus Hernandez', range: [0, 1] } })

window.GLOBAL_STORE = store

window.addEventListener('DOMContentLoaded', () => {
  store.subscribe(() => {
    console.log('Global state', store.getState())
  })

  store.subscribe(() => {
    $text.textContent = store.getState().count
  }, (state) => state.count)

  store.subscribe(() => {
    console.log('Updated text state', store.getState())
  }, (state) => state.text)


  $button.addEventListener('click', () => {
    store.setState((state) => {
      return {
        ...state,
        count: state.count + 1,
        text: 'Typing',
        user: {
          name: 'Jesus',
          lastName: 'Hernandez',
          range: [1, 1]
        }
      }
    })
  })

  $button2.addEventListener('click', () => {
    // Review when the state changes completely to Array
    store.setState((state) => [])
  })
})
