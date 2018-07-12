import React from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl'
import AlertItem from './AlertItem';
import Styles from './style.css'
import Widgets from '../../components/widgets';
const { Loading } = Widgets;

const AlertList = (props) => {
    return (
        <div className={Styles.alertListGroup}>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th className={Styles.sortTableHeader} 
                        onClick={()=>props.toggleAlertSeverity()}>
                        <FormattedMessage id="alerts.level"/> {props.sort!==false &&(props.sort.serverity?<i className="fa fa-sort-down"></i>:<i className="fa fa-sort-up"></i>)}</th>
                    <th className={Styles.sortTableHeader}
                        onClick={()=>props.toggleAlertName()}> 
                        <FormattedMessage id="alerts.alertname"/> {props.sort!==false &&(props.sort.alertname?<i className="fa fa-sort-down"></i>:<i className="fa fa-sort-up"></i>)}</th>
                    <th><FormattedMessage id="alerts.alert_description"/> </th>
                    <th><i className="fa fa-bar-chart"></i> <FormattedMessage id="alerts.alert_link"/></th>
                    <th className={Styles.sortTableHeader} 
                        onClick={()=>props.toggleAlertStartTime()}><i className="fa fa-calendar"></i> <FormattedMessage id="alerts.alert_startsAt"/> {props.sort!==false &&(props.sort.alert_starttime?<i className="fa fa-sort-down"></i>:<i className="fa fa-sort-up"></i>)}</th>
                    <th><i className="fa fa-exchange"></i> <FormattedMessage id="alerts.alert_updatedAt"/> </th>
                    <th><i className="fa fa-wrench"></i> <FormattedMessage id="alerts.alert_ops"/> </th>
                </tr>
                </thead>
                <tbody>
                {props.alerts.map((alert,i)=><AlertItem alert={alert} clickTagHandler={props.clickTagHandler} key={alert.fingerprint}/>)}
                </tbody>
            </table>
            {props.loading?<Loading/>:null}
        </div>
    )
}
AlertList.propTypes = {
    toggleAlertSeverity: PropTypes.func,
    toggleAlertName: PropTypes.func,
    toggleAlertStartTime: PropTypes.func,
    clickTagHandler: PropTypes.func,
    sort:PropTypes.object,
    alerts: PropTypes.array.isRequired
}

export default AlertList