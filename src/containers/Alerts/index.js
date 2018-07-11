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
        fetchAlerts,
        toggleAlertName} from '../../actions/alerts';
import Widgets from '../../components/widgets';
const {Alert,AutoRefresh} = Widgets;

class Alerts extends Component {
    state = {
        searchTerm:'',
        searchFilterAlerts:[]
    }
    componentDidMount(){
        this.props.fetchAlerts();
        this.props.fetchReceiver();
    }
    clickTagHandler=(kvstr)=>{
        if(kvstr && kvstr.split("=").length===2){
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
                {this.props.alerts.error?<Alert alert={this.props.alerts.error}/>:null}
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
                <div className="right">
                    <AutoRefresh onRefresh={this.props.fetchAlerts} />
                </div>
                
                <AlertList
                    loading={this.props.loading}
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
        filters: alerts.filters,
        loading: alerts.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAlerts:()=>{
            dispatch(fetchAlerts())
        },
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