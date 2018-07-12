import React, {Component} from 'react';
import { FormattedMessage} from 'react-intl'
import {connect} from 'react-redux';
import { fetchStatusData } from '../../actions';
import Style from './style.css'
import Widgets from '../../components/widgets';
import {getTimeFromNow} from '../../lib/utils'
const {Alert,Loading} = Widgets;
class Status extends Component {
    componentDidMount(){
        this.props.fetchStatusData();
    }
    render() {
        const {status,loading, error} = this.props.status
        if(loading || Object.keys(status).length===0){
            return (<Loading/>)
        }

        if(error){
            return (<Alert alert={error.toString()}/>)
        }
        let statusbar = ''
        if(status.clusterStatus.status === 'ready'){
            statusbar = <span className="badge badge-success">{status.clusterStatus.status}</span>
        }else{
             statusbar = <span className="badge badge-dark">{status.clusterStatus.status}</span>
        }
        return (
            <div className={Style.status_box}>
                 <h2 className={Style.title}><FormattedMessage id="status.status_title"/></h2>
                 <p><span className={Style.key}><FormattedMessage id="status.uptime"/></span> <span className={Style.value}>{getTimeFromNow(status.uptime)}</span></p>
                 <p><span className={Style.key}><FormattedMessage id="status.api_url"/></span> <span className={Style.value}>{this.props.global.apiUrl}</span></p>
                 <br/>
                <h2 className={Style.title}><FormattedMessage id="status.cluster_status_title"/></h2>
                <p><span className={Style.key}><FormattedMessage id="status.cluster_name"/></span><span className={Style.value}>{status.clusterStatus.name}</span></p>
                <p><span className={Style.key}><FormattedMessage id="status.cluster_status"/></span><span className={Style.value}>{statusbar}</span></p>
                <p><span className={Style.key}><FormattedMessage id="status.cluster_peer"/></span><span className={Style.value}>{status.clusterStatus.peers.map((p,i)=><span key={i} className="badge badge-info">{p.address}</span>)}</span></p>
                <br/>
                <h2 className={Style.title} ><FormattedMessage id="status.version_information_title"/></h2>
                {/* {versionInfo} */}
                <p><span className={Style.key}><FormattedMessage id="status.version_branch"/></span><span className={Style.value}>{status.versionInfo.branch}</span></p>
                <p><span className={Style.key}><FormattedMessage id="status.version_builddate"/></span><span className={Style.value}>{status.versionInfo.buildDate}</span></p>
                <p><span className={Style.key}><FormattedMessage id="status.version_builduser"/></span><span className={Style.value}>{status.versionInfo.buildUser}</span></p>
                <p><span className={Style.key}><FormattedMessage id="status.version_goversion"/></span><span className={Style.value}>{status.versionInfo.goVersion}</span></p>
                <p><span className={Style.key}><FormattedMessage id="status.version_revision"/></span><span className={Style.value}>{status.versionInfo.revision}</span></p>
                <p><span className={Style.key}><FormattedMessage id="status.version_version"/></span><span className={Style.value}>{status.versionInfo.version}</span></p>
                <br/>
                <h2 className={Style.title}><FormattedMessage id="status.config_title"/></h2>
                <pre>{status.configYAML}</pre>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.status,
        global: state.global
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchStatusData: () => {
            dispatch(fetchStatusData())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Status)