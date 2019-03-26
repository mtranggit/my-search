import React from 'react'
import {connect} from 'react-redux'

import {
  fetchStarwarsRequest,
  confirmStarwarsFetchRequest,
} from '../actions/starwarsAction'

class Starwars extends React.Component {
  state = {
    open: false,
  }

  handleFetchClick = () => {
    this.props.fetchStarwarsRequest()
    this.setState({open: true})
  }

  handleConfirm = () => {
    this.props.confirmStarwarsFetchRequest()
    this.setState({open: false})
  }

  render() {
    const {starwars} = this.props
    const {open} = this.state
    return (
      <div>
        <h1>Starwars with Redux Saga</h1>
        <div style={!open ? {display: 'none'} : {}} className="model">
          <button onClick={this.handleConfirm}>Confirm</button>
        </div>
        <div>
          <button onClick={this.handleFetchClick}>Load more</button>
        </div>
        <div>
          {starwars.people.map((person, i) => (
            <h4 key={i}>{person.name}</h4>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({starwars}) => ({starwars})
// const bindActionsToDispatch = dispatch => ({
//   fetchStarwarsRequest: () => dispatch(fetchStarwarsRequest),
// })
export default connect(
  mapStateToProps,
  // bindActionsToDispatch,
  {
    fetchStarwarsRequest,
    confirmStarwarsFetchRequest,
  },
)(Starwars)
