import React from 'react'
import AlertItem from './AlertItem';
import Styles from './alert.css'
const AlertList = ({alerts}) => {
    return (
        <div className={Styles.alertListGroup}>
            <table className="table ">
                <thead>
                <tr>
                    <th>严重级别</th>
                    <th>告警名称</th>
                    <th>详细信息</th>
                    <th>出现时间</th>
                    <th>更新时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {alerts.map((alert,i)=><AlertItem alert={alert} key={i}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default AlertList