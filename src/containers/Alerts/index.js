import React, {Component} from 'react'
import {connect} from 'react-redux';
import _ from 'lodash'
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
    filterWithSearchTerm = _.debounce((newSearchTerm) =>{
        let alerts = []
        const originAlerts = this.props.alerts
        alerts = originAlerts?originAlerts:[]
        if(newSearchTerm!==""){
            alerts = originAlerts.filter(function(t){return JSON.stringify(t).toLowerCase().indexOf(newSearchTerm)!==-1})
        }
        this.setState({
            searchTerm:newSearchTerm,
            searchFilterAlerts:alerts
        })
    },500)
    componentWillReceiveProps(nextProps){
        const newSearchTerm = nextProps.search.searchTerm
        if(newSearchTerm!==this.props.search.searchTerm){
            this.filterWithSearchTerm(newSearchTerm)
        }else{
            this.setState({
                searchFilterAlerts:nextProps.alerts
            }) 
        }
    }
    render() {
        return (
            <div className="row">
                {this.props.alerts.error?<Alert alert={this.props.alerts.error}/>:null}
                <div className="col-md-8">
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
                </div>
                <div className="col-md-4">
                    <div className="right">
                        <AutoRefresh onRefresh={this.props.fetchAlerts} />
                    </div>
                </div>
                <div className="col-md-12">
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