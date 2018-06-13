import React from 'react'
import { hot } from 'react-hot-loader'
import apiService from '../../services/api/apiService'

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      count: 0,
      appVersion: undefined
    };

    //bind instance functions to instance context so render doesn't break them
    ([
      'sampleSimpleFunction',
      'sampleApiFunction'
    ]).forEach((functionName) => {
      this[functionName] = this[functionName].bind(this);
    })
  }

  render(){
    return (<React.Fragment>
      <h1>Hello World! CHANGE 7</h1>
      <div>
        <button onClick={this.sampleSimpleFunction}>Increment Counter</button>
        <p>
          <span>Count: {this.state.count}</span>
        </p>
      </div>
      <div>
        <button onClick={this.sampleApiFunction}>Get App Version</button>
        <p>
          <span>Version: {this.state.appVersion}</span>
        </p>
      </div>
    </React.Fragment>)
  }

  sampleSimpleFunction(){
    this.setState({
      count: this.state.count+1
    })
  }

  sampleApiFunction(){
    apiService.get('api.v1.diagnostic')
    .then(({version}) => {
      this.setState({
        appVersion: version
      })
    })
    .catch(console.error)
  }
}

export default hot(module)(App)