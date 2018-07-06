import React, {Component} from 'react'
import {connect} from 'react-redux';
import { fetchStatusData } from '../../actions';
import Style from './style.css'
import moment from 'moment';
class Status extends Component {
    componentDidMount(){
        this.props.fetchStatusData();
    }
    render() {
        const {status,loading, error} = this.props.status
        if(loading || Object.keys(status).length===0){
            return (<div>Loading...</div>)
        }

        if(error){
            return (<div>{error}</div>)
        }
        let versionInfo = []
        for(var infokey in status.versionInfo){
            versionInfo.push(<p key={infokey}><span className={Style.key}>{infokey}</span><span  className={Style.value}>{status.versionInfo[infokey]}</span>
                </p>)
        }
        let statusbar = ''
        if(status.clusterStatus.status === 'ready'){
            statusbar = <span className="badge badge-success">{status.clusterStatus.status}</span>
        }else{
             statusbar = <span className="badge badge-dark">{status.clusterStatus.status}</span>
        }
        return (
            <div className={Style.status_box}>
                <h2 className={Style.title}>Status</h2>
                 <span className={Style.key}>Uptime</span> <span className={Style.value}>{moment(status.uptime).fromNow()}</span>
                <hr/>
                <h2 className={Style.title}>Cluster Status</h2>
                <p><span className={Style.key}>name</span><span className={Style.value}>{status.clusterStatus.name}</span></p>
                <p><span className={Style.key}>status</span><span className={Style.value}>{statusbar}</span></p>
                <p><span className={Style.key}>peer</span><span className={Style.value}>{status.clusterStatus.peers.map((p,i)=><span key={i} className="badge badge-info">{p.address}</span>)}</span></p>
                <hr/>   
                <h2 className={Style.title} >Version Information</h2>
                {versionInfo}
                <hr/>
                <h2 className={Style.title}>Config</h2>
                <pre>{status.configYAML}</pre>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        status: state.status
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchStatusData: () => {
            dispatch(fetchStatusData())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Status)