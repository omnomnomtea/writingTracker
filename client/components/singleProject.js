import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProject } from '../store'
import { SimpleProject, SvgGraph } from './index'

class SingleProject extends React.Component {
  componentDidMount() {
    this.props.fetchProject(this.props.id)
  }

  render() {
    if (!this.props.project.id) return <div />

    return (
      <div className="single-project">
        <SimpleProject project={this.props.project} />
        {
          this.props.project.wordcountEntries &&
          <SvgGraph data={this.props.project.wordcountEntries || []} />
        }
      </div>
    )
  }

}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchProject: (id) => dispatch(fetchProject(id))
  }
}

const mapState = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  const project = state.projects.filter(project => project.id = id)[0] || {};
  return {
    project,
    id,
  }
}



export default connect(mapState, mapDispatch)(SingleProject);
