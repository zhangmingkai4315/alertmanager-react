import React, { Component } from 'react'
import { connect } from 'react-redux'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Style from './style.css';

import { searchHistoryAlerts } from '../../actions'
import AlertList from '../../components/AlertList'
import Widgets from '../../components/widgets'
const {Alert} = Widgets
class HistoryPage extends Component {
    state = {
        term: '',
        startsAt:new Date((new Date()) - 7*1000 * 60 * 60 * 24),
        endsAt:new Date(),
        error:""
    }
    handleSearchSubmit = ()=>{
        const {term,startsAt,endsAt} = this.state;
        if(term === '' || startsAt === null || endsAt === null){
            this.setState({error:"make sure your input not empty"})
            return
        }
        if(startsAt>endsAt){
            this.setState({error:"make sure your start time early then end time"})
            return
        }
        if(startsAt>new Date()){
            this.setState({error:"start time not set correct"})
            return            
        }

        this.props.searchHistoryAlerts({
            term,
            startsAt:startsAt.toISOString(),
            endsAt:endsAt.toISOString()
        })
    }
    render () {
        const error = this.props.error || this.state.error;
        return (
            <div className="row">
                {error?<Alert alert={error}/>:null}
                <div className={Style.searchbox}>
                    <div className="row searchdate">
                        <div className="col-md-2"></div>
                        <div className="col-md-4">
                            <DateTimePicker onChange={(time)=>{this.setState({error:"",startsAt:time})}}
                                format="YYYY-MM-DD HH:mm"
                                step={30}
                                placeholder="From"
                                value = {this.state.startsAt}/>
                        </div>
                        <i className={`fa fa-arrow-right ${Style.arrow}`} aria-hidden="true"></i>
                        <div className="col-md-4">
                            <DateTimePicker onChange={(time)=>{this.setState({error:"",endsAt:time})}}
                                format="YYYY-MM-DD HH:mm"
                                step={30}
                                placeholder="To"
                                value = {this.state.endsAt}/>
                        </div>
                    </div>
                    <div className={`row ${Style.searchbar}`}>
                        <div className="col-md-3"></div>
                        <div className="col-md-5">
                            <div className="input-group">
                                <input className="form-control" 
                                        onChange={(e)=>{this.setState({error:"",term:e.target.value})}} 
                                        placeholder="" 
                                        value={this.state.term}
                                        aria-describedby="basic-search"
                                        type="text"/>
                                <button className="input-group-addon btn btn-info" onClick={this.handleSearchSubmit}id="basic-search" >Search</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="col-md-12">
                    <AlertList
                        loading={this.props.loading}
                        clickTagHandler={()=>{}}
                        alerts={this.props.alerts}
                        toggleAlertSeverity={()=>{}}
                        toggleAlertStartTime={()=>{}}
                        toggleAlertName={()=>{}}
                        sort={this.props.sort}
                    />
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({historyAlerts}) => {
    return {
        alerts:historyAlerts.alerts,
        loading:historyAlerts.loading,
        sort:historyAlerts.sort,
        error: historyAlerts.error
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        searchHistoryAlerts: (search) => {
            dispatch(searchHistoryAlerts(search))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HistoryPage)