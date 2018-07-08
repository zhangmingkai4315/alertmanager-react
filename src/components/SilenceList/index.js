import React from 'react'
import SilenceItem from './SilenceItem';
import Styles from './style.css'
const SilenceList = (props) => {
    return (
        <div className={Styles.silenceListGroup}>
            <div className="btn-group right" style={{"paddingBottom":"20px","float":"right"}} role="group" aria-label="Basic example">
              <button type="button" className="btn btn-info" onClick={()=>props.showSilencesWithStatus('')}>显示所有</button>
              <button type="button" className="btn btn-danger" onClick={()=>props.showSilencesWithStatus('active')}>当前激活</button>
              <button type="button" className="btn btn-warning" onClick={()=>props.showSilencesWithStatus('pending')}>即将生效</button>
              <button type="button" className="btn btn-secondary"  onClick={()=>props.showSilencesWithStatus('expired')}>已过期</button>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>匹配信息</th>
                    <th>操作人</th>
                    <th>注释</th>
                    <th>当前状态</th>
                    <th>执行时间</th>
                    <th>更新时间</th>
                    <th>结束时间</th>
                    <th><i className="fa fa-wrench"></i> 操作</th>
                </tr>
                </thead>
                <tbody>
                {props.silences.map((silence)=><SilenceItem silence={silence} key={silence.id}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default SilenceList