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
        addAlertFilter,
        removeAlertFilter,
        toggleAlertName} from '../../actions/alerts';
class Alerts extends Component {
    state = {
        searchTerm:'',
        searchFilterAlerts:[]
    }
    componentDidMount(){
        this.props.fetchReceiver();
    }
    // example:
    // kvstr instance=localhost:9090,job=prometheus
    clickTagHandler=(kvstr)=>{
        if(kvstr && kvstr.split("=").length===2){
            // add to redux store alerts filters array
            this.props.addAlertFilter(kvstr)
        }
    }
    componentWillReceiveProps(nextProps){
        const searchTerm = this.props.search.searchTerm
        const newSearchTerm = nextProps.search.searchTerm
        if(newSearchTerm!==this.props.search.searchTerm){
            let alerts = []
            const originAlerts = this.props.alerts
            alerts = originAlerts?originAlerts:[]
            if(newSearchTerm!==""){
                // maybe search only in name or description
                alerts = originAlerts.filter(function(t){return JSON.stringify(t).toLowerCase().indexOf(newSearchTerm)!==-1})
            }
            this.setState({
                searchTerm,
                searchFilterAlerts:alerts
            })
        }else{
            this.setState({
                searchFilterAlerts:nextProps.alerts
            }) 
        }
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
                    filters = {this.props.filters}
                    removeAlertFilter = {this.props.removeAlertFilter}
                />
                <AlertList
                    clickTagHandler={this.clickTagHandler}
                    alerts={this.state.searchFilterAlerts}
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
        receivers: alerts.receivers,
        filters: alerts.filters
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
            dispatch(changeSearchTerm(e.target.value.toLowerCase()));
        },
        onSelectReceiver:(receiver)=>{
            dispatch(selectReceiver(receiver));
        },
        addAlertFilter:(filter)=>{
            dispatch(addAlertFilter(filter))
        },
        removeAlertFilter:(filter)=>{
            dispatch(removeAlertFilter(filter))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Alerts)