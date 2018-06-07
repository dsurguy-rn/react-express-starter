import React from 'react'
import { hot } from 'react-hot-loader'

class HmrEnabledComponent extends React.Component{
  constructor(props){
    super(props)
  }
}

export default hot(module)(HmrEnabledComponent)