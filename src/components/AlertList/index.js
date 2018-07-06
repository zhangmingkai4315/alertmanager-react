import React from 'react'
import AlertItem from './AlertItem';
import Styles from './alert.css'
const AlertList = (props) => {
    return (
        <div className={Styles.alertListGroup}>
            <table className="table ">
                <thead>
                <tr>
                    <th className={Styles.sortTableHeader} onClick={()=>props.toggleAlertSeverity()}><i className="fa fa-exclamation-triangle"></i> 严重级别 {props.sort.serverity?<i className="fa fa-sort-down"></i>:<i className="fa fa-sort-up"></i>}</th>
                    <th className={Styles.sortTableHeader} onClick={()=>props.toggleAlertName()}><i className="fa fa-exclamation"></i> 告警名称 {props.sort.alertname?<i className="fa fa-sort-down"></i>:<i className="fa fa-sort-up"></i>}</th>
                    <th><i className="fa fa-info-circle"></i> 详细信息</th>
                    <th className={Styles.sortTableHeader} onClick={()=>props.toggleAlertStartTime()}><i className="fa fa-calendar"></i> 出现时间 {props.sort.alert_starttime?<i className="fa fa-sort-down"></i>:<i className="fa fa-sort-up"></i>}</th>
                    <th><i className="fa fa-exchange"></i> 更新时间</th>
                    <th><i className="fa fa-wrench"></i> 操作</th>
                </tr>
                </thead>
                <tbody>
                {props.alerts.map((alert,i)=><AlertItem alert={alert} key={alert.fingerprint}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default AlertList