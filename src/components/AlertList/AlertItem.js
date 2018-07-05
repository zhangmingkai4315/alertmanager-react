import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';
import FA from 'react-fontawesome';

moment.updateLocale("zh-cn",momentLocale);
const getAlertClass = (severity) => {
    try{
        switch(severity){
            case 'critical':
            return "table-danger"
            case 'warning':
            return "table-warning"
            default:
            return ""
        }
    }catch(err){
        return '';
    }
}

const AlertItem = ({alert}) => {
    const alertname = alert.labels.alertname;
    const description = alert.annotations.description;
    let tagList = [];
    let counter = 0;
    for(let k in alert.labels){
        console.log(k)
        if(counter%3===0){
            tagList.push(<div></div>)
        }
        counter++;
        tagList.push(<span className="badge badge-info" style={{marginRight:"5px",marginBottom:"5px",marginTop:"5px"}}>{k}={alert.labels[k]}</span>)
    }
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