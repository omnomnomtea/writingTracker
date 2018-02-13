import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ProjectList } from './index';

/**
 * COMPONENT
 */
const UserHome = (props) => {
  const { email } = props

  return (
    <div>
      <ProjectList />
    </div>
  )
}

export default UserHome
