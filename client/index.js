import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/App.jsx'

const appElem = document.createElement('div')
appElem.classList.add('app-container')
document.querySelector('body').appendChild(appElem)

ReactDOM.render(<App />, appElem)