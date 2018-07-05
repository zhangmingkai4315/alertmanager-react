import React from 'react'
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';

import {getAlertClass, getTagListFromLables} from '../../lib/utils';

moment.updateLocale("zh-cn", momentLocale);


const AlertItem = ({alert}) => {
    const alertname = alert.labels.alertname;
    const description = alert.annotations.description;
    const tagList = getTagListFromLables(alert.labels);
    const severity=alert.labels.severity;
    const startAt = moment(alert.startsAt).fromNow();
    const endsAt = moment(alert.endsAt).fromNow();
    return (
        <tr className={getAlertClass(severity)}>
            <td>
                {severity}
            </td>
             <td>
                {alertname}
            </td>           
            <td>
                {description}
                <div>{tagList}</div>
            </td>
            <td>
                {startAt}
            </td>
            <td>
                {endsAt}
            </td>
            <td>
                <Link to="/" className="btn btn-info" style={{ fontSize:".5em"}}>
                   <FA name="bell-slash-o"/> 暂停告警
                </Link>
            </td>
        </tr>
    )
}



export default AlertItem