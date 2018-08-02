import React from 'react'
import PropTypes from 'prop-types';
import Style from './style.css'
const Alert = ({alert}) => {
  return (
    <div className={`${Style.alertbox} alert alert-warning alert-dismissible fade show`} role="alert">
      <strong>Alert!</strong> {alert}
    </div>
  )
}

Alert.propTypes ={
  alert:PropTypes.string
}
export default Alert