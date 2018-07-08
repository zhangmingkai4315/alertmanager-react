import React from 'react'
import Style from './style.css';
const ResouceNotFound = props => {
  const defaultDescription = "Resouce Not Found";
  return (
    <div class={Style.box}>
      <p className={Style.title}>{props.title||"404"}</p>
      <p className={Style.description}>{props.description||defaultDescription}</p>
    </div>
  )
}

export default ResouceNotFound