import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SvgGraph, ProjectList } from './index';
import { fetchEntries } from '../store'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchEntries()
  }

  render() {
    const { entries } = this.props

    if (!entries.length) return <div />

    return (
      <React.Fragment>
        <SvgGraph data={entries} />
        <ProjectList />
      </React.Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    entries: state.entries
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchEntries: () => dispatch(fetchEntries())
  }
}

export default connect(mapState, mapDispatch)(UserHome)
