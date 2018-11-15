import React from 'react';
import { hot } from 'react-hot-loader'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return <div className="app-main">
      <h1>Hello World!</h1>
      <p>test</p>
    </div>
  }
}

export default hot(module)(App)