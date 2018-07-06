import React from 'react'
import Style from './style.css';
const SearchBox = (props) => {
    return (
        <div className={Style.searchbox}>
            <div className="row">
                <div className="col-6">
                    <div className="input-group">
                        <input type="text" onChange={props.onChangeSearchTerm} value={props.search.searchTerm} className="form-control" aria-label="Text input with dropdown button"/>
                        <div className="input-group-btn">
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {props.search.receiver}
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                {props.receivers.map((r,i)=><a key={i} className="dropdown-item" onClick={()=>props.onSelectReceiver(r)}>{r}</a>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Style.controlbar}>
                    <span className="input-group-addon">
                        <input onChange={props.onCheckSilenced} 
                               checked={props.search.silenced} 
                               type="checkbox" /> Silienced
                    </span>
                    <span className="input-group-addon">
                        <input onChange={props.onCheckInhibited} 
                               checked={props.search.inhibited} 
                               type="checkbox" /> Inhibited
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="groupbar col">

                </div>
            </div>
        </div>
    )
}

export default SearchBox