import React from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import Style from './style.css';
import {getAlertClass, getTagListFromLables,getTimeFromNow} from '../../lib/utils';



const AlertItem = ({alert,clickTagHandler}) => {
    const alertname = alert.labels.alertname;
    const description = alert.annotations.description;
    const tagList = getTagListFromLables(alert.labels,clickTagHandler);
    const severity=alert.labels.severity;
    const startAt = getTimeFromNow(alert.startsAt);
    const endsAt = getTimeFromNow(alert.endsAt);
    let linkInfo = [];
    
    if(alert.generatorURL){
        linkInfo.push(<a href={alert.generatorURL} key="0">
        <img src="/image/prometheus.png" className={Style.linkImg} alt="for prometheus link"/> </a>)
    }
    if(alert.annotations.view_link){
        linkInfo.push(<a href={alert.annotations.view_link} key="1">
        <img src="/image/grafana.png" className={Style.linkImg} alt="for grafana link"/> </a>)
    }
    
    return (
        <tr >
            <td className={getAlertClass(severity)}>
                {severity}
            </td>
             <td>
                {alertname}
            </td>           
            <td>
                {description}
                <div>{tagList}</div>
            </td>
            <td>{linkInfo}</td>
            <td>
                {startAt}
            </td>
            <td>
                {endsAt}
            </td>
            <td>
                <Link to={{pathname:"/silences/new",matchers:alert.labels}} className="btn btn-info" style={{ fontSize:".5em"}}>
                   <FA name="bell-slash-o"/> <FormattedMessage id="alerts.stop_silence"/>
                </Link>
            </td>
        </tr>
    )
}

AlertItem.propTypes = {
    alert: PropTypes.shape({
        severity: PropTypes.string,
        alertname: PropTypes.string,
        description: PropTypes.description,
        labels: PropTypes.object,
        startAt: PropTypes.string,
        endsAt: PropTypes.string
    }).isRequired,
    clickTagHandler: PropTypes.func
}

export default AlertItem