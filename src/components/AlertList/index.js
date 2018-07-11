import React from 'react'
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
                        告警级别 
                        {props.sort!==false &&(props.sort.serverity?<i className="fa fa-sort-down"></i>:<i className="fa fa-sort-up"></i>)}</th>
                    <th className={Styles.sortTableHeader}
                        onClick={()=>props.toggleAlertName()}> 
                        名称 
                        {props.sort!==false &&(props.sort.alertname?<i className="fa fa-sort-down"></i>:<i className="fa fa-sort-up"></i>)}</th>
                    <th>详细</th>
                    <th><i className="fa fa-bar-chart"></i> 链接</th>
                    <th className={Styles.sortTableHeader} 
                        onClick={()=>props.toggleAlertStartTime()}><i className="fa fa-calendar"></i> 
                        出现时间 
                        {props.sort!==false &&(props.sort.alert_starttime?<i className="fa fa-sort-down"></i>:<i className="fa fa-sort-up"></i>)}</th>
                    <th><i className="fa fa-exchange"></i> 更新</th>
                    <th><i className="fa fa-wrench"></i> 操作</th>
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

export default AlertList