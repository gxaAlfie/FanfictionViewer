require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import React from 'react'
import ReactDOM from 'react-dom'
import MainPage from './page'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MainPage/>, document.querySelector('.stories')
  )
})
