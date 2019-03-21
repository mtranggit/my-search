import React from 'react'
import {connect} from 'react-redux'

export function BeersList(props) {
  const {data, loading} = props
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && <div>Got {data.length} beers(s)</div>}
    </div>
  )
}

export default connect(state => state.beers)(BeersList)
