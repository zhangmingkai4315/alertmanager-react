import React from 'react'
import Style from './style.css';
const SearchBox = (props) => {
    const {search,receivers,filters,removeAlertFilter} = props
    const searchFilter = filters.map((f,i)=>
    <span
        key={i}
        className="badge badge-info"
        onClick={()=>removeAlertFilter(f)}
        style={{
            marginRight: "5px",
            marginBottom: "5px",
            marginTop: "5px",
            cursor: "pointer"
        }}>{f}</span>)

    return (
        <div className={Style.searchbox}>
            <div className="row">
                <div className="col-6">
                    <div className="input-group">
                        <input type="text" onChange={props.onChangeSearchTerm} value={search.searchTerm} className="form-control" aria-label="Text input with dropdown button"/>
                        <div className="input-group-btn">
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {search.receiver}
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                {receivers.map((r,i)=><a key={i} className="dropdown-item" onClick={()=>props.onSelectReceiver(r)}>{r}</a>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Style.controlbar}>
                    <span className="input-group-addon">
                        <input onChange={props.onCheckSilenced} 
                               checked={search.silenced} 
                               type="checkbox" /> Silienced
                    </span>
                    <span className="input-group-addon">
                        <input onChange={props.onCheckInhibited} 
                               checked={search.inhibited} 
                               type="checkbox" /> Inhibited
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="filters col">
                    {searchFilter}
                </div>
            </div>
        </div>
    )
}

export default SearchBox