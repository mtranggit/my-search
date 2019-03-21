import React, {Component} from 'react'
import './App.css'
import {connect} from 'react-redux'
import BeersList from './components/BeersList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BeersList />
      </div>
    )
  }
}

export default connect(state => state.app)(App)
