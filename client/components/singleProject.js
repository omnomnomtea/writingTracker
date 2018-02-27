import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProject } from '../store'
import { SimpleProject, SvgGraph, SingleEntry } from './index'

class SingleProject extends React.Component {
  componentDidMount() {
    this.props.fetchProject(this.props.id)
  }

  render() {
    if (!this.props.project.id) return <div />

    return (
      <React.Fragment>
      <div className="main">
        <SimpleProject project={this.props.project} />

        {
          this.props.project.wordcountEntries && this.props.project.wordcountEntries.map((entry, i) => {
            // every other row should have a truthy "even" or "odd" prop
            return <SingleEntry key={entry.id} entry={entry} even={i%2}/>
          })
        }

        </div>
        {
          this.props.project.wordcountEntries &&
          <SvgGraph data={this.props.project.wordcountEntries || []} />
        }



      </React.Fragment>
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
