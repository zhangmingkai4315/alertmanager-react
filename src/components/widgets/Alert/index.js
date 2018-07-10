import React from 'react'

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

export default Alert