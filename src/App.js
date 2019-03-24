import React, {Component} from 'react'
import './App.css'
import {connect} from 'react-redux'
import Beers from './components/Beers'

import MyAppWithLocalStorage from './components/MyHOC'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyAppWithLocalStorage />
        <Beers />
      </div>
    )
  }
}

export default connect(state => state.app)(App)
