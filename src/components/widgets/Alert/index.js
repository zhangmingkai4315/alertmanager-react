import React from 'react'
import PropTypes from 'prop-types'; 
const Alert = ({alert}) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Alert!</strong> {alert}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

Alert.propTypes ={
  alert:PropTypes.oneOf([PropTypes.string,PropTypes.object])
}
export default Alert