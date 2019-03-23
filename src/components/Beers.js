import React from 'react'
import {connect} from 'react-redux'
import {BeersList} from './BeersList'
import {search, random, cancel} from '../reducers/beersAction'
import {setConfig} from '../reducers/configAction'
// import {fetchData} from '../reducers/beersAction'

export function Beers(props) {
  const {
    data,
    status,
    // search,
    random,
    config,
    setConfig,
    cancel,
    messages,
  } = props
  // const {data, status, fetchData} = props
  return (
    <>
      <div className="App-inputs">
        <select
          name="perPage"
          defaultValue={config.perPage}
          onChange={e => setConfig({perPage: Number(e.target.value)})}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => {
            return (
              <option key={value} value={value}>
                {value} results
              </option>
            )
          })}
        </select>
        {/* <input
          type="text"
          placeholder="Search beers"
          onChange={e => search(e.target.value)}
        /> */}
        <button onClick={random} disabled={status === 'pending'}>
          Fetch Random Beers!
        </button>
        {/* <button onClick={fetchData} disabled={status === 'pending'}>
          Fetch Beers!
        </button> */}
        {status === 'pending' && (
          <>
            <button type="button" onClick={cancel}>
              Cancel
            </button>
            <span className="App-spinner">
              <img src={'/ajax-loader.gif'} alt="Loading..." />
            </span>
          </>
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

const mapStateToProps = state => {
  return {
    ...state.beers,
    config: state.config,
  }
}
export default connect(
  mapStateToProps,
  // state => state.beers,
  // {fetchData},
  {
    //search,
    random,
    cancel,
    setConfig,
  },
)(Beers)
