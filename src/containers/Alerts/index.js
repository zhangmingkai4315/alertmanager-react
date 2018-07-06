import React, {Component} from 'react'
import {connect} from 'react-redux';
import AlertList from '../../components/AlertList';
import {toggleAlertSeverity,toggleAlertStartTime,toggleAlertName} from '../../actions/alerts';
class Alerts extends Component {
    render() {
        return (
            <div>
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
        sort: alerts.sort
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAlertSeverity: () => {
            dispatch(toggleAlertSeverity())
        },
        toggleAlertStartTime: ()=>{
            dispatch(toggleAlertStartTime())
        },
        toggleAlertName:()=>{
            dispatch(toggleAlertName())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Alerts)