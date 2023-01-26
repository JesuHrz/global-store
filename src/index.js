// import { createStore } from './store/index.js'
import { createStore } from './store/withImmer.js'

const $text = document.querySelector('.js-count')
const $button = document.querySelector('.js-increment')
const $restoreOne = document.querySelector('.js-restore-one')
const $restoreTwo = document.querySelector('.js-restore-two')
const lodash = window._

const compare = (prevState, newState) => {
  return lodash.isEqual(prevState, newState)
}

const store = createStore({
  count: 0,
  text: '',
  user: {
    name: 'Jesus Hernandez',
    range: [0, 1] }
  }, {
    compare
  }
)

window.GLOBAL_STORE = store

window.addEventListener('DOMContentLoaded', () => {
  store.subscribe((state, prevState) => {
    console.log('Global new state', { state, prevState })
  })

  store.subscribe(() => {
    console.log('Updated count state', store.getState())
    $text.textContent = store.getState().count
  }, (state) => state.count)

  store.subscribe(() => {
    // console.log('Updated text state', store.getState())
  }, (state) => state.text)

  $button.addEventListener('click', () => {
    store.setState((state) => {
      return {
        ...state,
        count: state.count + 1,
      }
    })
  })

  $restoreOne.addEventListener('click', () => {
    store.setState(() => {
      return {}
    })
  })

  $restoreTwo.addEventListener('click', () => {
    store.setState((state) => {
      return {}
    }, true)
  })
})
