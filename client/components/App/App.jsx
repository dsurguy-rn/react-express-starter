import React from 'react'
import HmrEnabledComponent from '../../sharedComponents/HMR/HMR.js'

export default class App extends HmrEnabledComponent{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <h1>Hello World! CHANGE 67</h1>
    )
  }
}