import React from 'react'
import Style from './style.css'
function Loading() {
    return (
        <div className={Style.loadingbox}>
            <div className={Style.ldsellipsis}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading
