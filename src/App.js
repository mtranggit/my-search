import React, {Component} from 'react'
import './App.css'
import {connect} from 'react-redux'
import Beers from './components/Beers'
import Starwars from './components/Starwars'

// import MyAppWithLocalStorage from './components/MyHOC'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <MyAppWithLocalStorage /> */}
        <Beers />
        <Starwars />
      </div>
    )
  }
}

export default connect(state => state.app)(App)
