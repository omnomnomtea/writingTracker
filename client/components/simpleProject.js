import React from 'react'

const SimpleProject = (props) => {
  const { project } = props;
  return (
    <div className="single-project">
      <ul>
        <li>Title: {project.name}</li>
        <li>Wordcount: {project.wordcount}</li>
      </ul>
    </div>
  )
}

export default SimpleProject
