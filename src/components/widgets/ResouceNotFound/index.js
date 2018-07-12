import React from 'react'
import PropTypes from 'prop-types';
import Style from './style.css';

const ResouceNotFound = props => {
  return (
    <div className={Style.box}>
      <p className={Style.title}>{props.title}</p>
      <p className={Style.description}>{props.description}</p>
    </div>
  )
}
ResouceNotFound.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

ResouceNotFound.defaultProps = {
  title: "404",
  description: "Resouce Not Found",
};

export default ResouceNotFound