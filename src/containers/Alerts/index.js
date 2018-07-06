import React, {Component} from 'react'
import {connect} from 'react-redux';
import AlertList from '../../components/AlertList';
import SearchBox from '../../components/SearchBox';
import {toggleAlertSeverity,
        fetchReceiver,
        checkInhibited,
        checkSilenced,
        changeSearchTerm,
        selectReceiver,
        toggleAlertStartTime,
        toggleAlertName} from '../../actions/alerts';
class Alerts extends Component {
    componentDidMount(){
        this.props.fetchReceiver();
    }

    render() {
        return (
            <div>
                <SearchBox
                    onSelectReceiver = {this.props.onSelectReceiver}
                    onCheckSilenced= {this.props.onCheckSilenced}
                    onCheckInhibited = {this.props.onCheckInhibited}
                    onChangeSearchTerm = {this.props.onChangeSearchTerm}
                    receivers={this.props.receivers}
                    search = {this.props.search}
                />
                <AlertList 
                    alerts={this.props.alerts?this.props.alerts:[]}
                    toggleAlertSeverity={this.props.toggleAlertSeverity}
                    toggleAlertStartTime={this.props.toggleAlertStartTime}
                    toggleAlertName={this.props.toggleAlertName}
                    sort={this.props.sort}
                />
            </div>
        )
    }
}

const mapStateToProps = ({alerts})=>{
    return{
        alerts:alerts.alerts,
        sort: alerts.sort,
        search: alerts.search,
        receivers: alerts.receivers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReceiver:()=>{
            dispatch(fetchReceiver());
        },
        toggleAlertSeverity: () => {
            dispatch(toggleAlertSeverity());
        },
        toggleAlertStartTime: ()=>{
            dispatch(toggleAlertStartTime());
        },
        toggleAlertName:()=>{
            dispatch(toggleAlertName());
        },
        onCheckInhibited:()=>{
            dispatch(checkInhibited());
        },
        onCheckSilenced:()=>{
            dispatch(checkSilenced());
        },
        onChangeSearchTerm:(e)=>{
            const term = e.target.value.trim();
            dispatch(changeSearchTerm(term));
        },
        onSelectReceiver:(receiver)=>{
            dispatch(selectReceiver(receiver));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Alerts)