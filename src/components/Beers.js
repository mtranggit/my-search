import React from 'react'
import {connect} from 'react-redux'
import {BeersList} from './BeersList'
import {search} from '../reducers/beersAction'
// import {fetchData} from '../reducers/beersAction'

export function Beers(props) {
  const {data, status, search, messages} = props
  // const {data, status, fetchData} = props
  return (
    <>
      <div className="App-inputs">
        <input
          type="text"
          placeholder="Search beers"
          onChange={e => search(e.target.value)}
        />
        {/* <button onClick={fetchData} disabled={status === 'pending'}>
          Fetch Beers!
        </button> */}
        {status === 'pending' && (
          <div className="App-spinner">
            <img src={'/ajax-loader.gif'} alt="Loading..." />
          </div>
        )}
      </div>
      {status === 'success' && (
        <div className="App-content">
          <BeersList beers={data} />
        </div>
      )}
      {status === 'failure' && (
        <div className="App-messages">
          <p>Sorry, {messages[0].text}</p>
        </div>
      )}
    </>
  )
}

export default connect(
  state => state.beers,
  // {fetchData},
  {search},
)(Beers)
