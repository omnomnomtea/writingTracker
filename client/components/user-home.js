import React from 'react'
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
    return (
      <React.Fragment>
        {!!entries.length && <SvgGraph data={entries} />}
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
