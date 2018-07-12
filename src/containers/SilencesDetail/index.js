import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import {Link} from 'react-router-dom';
import Style from './style.css';
import {getTagListFromMatchers,getTimeFromNow} from '../../lib/utils';
import  ResouceNotFound from '../../components/widgets/ResouceNotFound';
import { connect } from 'react-redux';
import { fetchSilenceWithID,
        toggleAlertName,
        toggleAlertSeverity,
        toggleAlertStartTime,
        deleteSilenceWithID } from '../../actions';
import Loading from '../../components/widgets/Loading'
import ModalBox from '../../components/widgets/Modal';
import AlertList from '../../components/AlertList';
class SilencesDetail extends Component {
  state = {
    showModal:false
  }
  componentDidMount(){
    const id = this.props.match.params.id;
    if(id){
      this.props.fetchSilenceWithID(id)
    }
  }
  confirmDeleteSilence=()=>{
    this.setState({showModal:false})
    this.props.deleteSilenceWithID(this.props.match.params.id)
  }
  renderDeleteModal=()=>{
    return <ModalBox title="配置对话框" 
                     content="请确认是否设置该Silence为到期状态?"
                     onConfirm={this.confirmDeleteSilence}
                     show={this.state.showModal}
                     onClose={()=>this.setState({showModal:false})}/>
  }
  renderSilence=(silence)=>{
    const tagList = getTagListFromMatchers(silence.matchers||[],false)
    const startAt = getTimeFromNow(silence.startsAt);
    const updatedAt = getTimeFromNow(silence.updatedAt);
    const endsAt = getTimeFromNow(silence.endsAt);
    return (
      <div>
        {this.state.showModal&&this.renderDeleteModal()}
        <p className={Style.title_box}>
            <span className={Style.title}>Silence</span>
            <button disabled={silence.status.state==='expired'} onClick={()=>this.setState({showModal:true})} className={[Style.custom_btn,"btn btn-danger"].join(" ")}>
            <i className="fa fa-calendar-times-o" aria-hidden="true"></i> <FormattedMessage id=""/></button>
            {silence.status.state==='expired'?<Link to={{pathname:"/silences/new",matchers:silence.matchers}} className={[Style.custom_btn,"btn btn-info"].join(" ")}>
              <i className="fa fa-refresh" aria-hidden="true"></i>  <FormattedMessage id="silences.detail.recreate"/>
            </Link>:<Link to={{pathname:`/silences/${silence.id}/edit`,silence}} className={[Style.custom_btn,"btn btn-info"].join(" ")}>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i> <FormattedMessage id="silences.detail.edit"/>
            </Link>}
        </p>
        <hr/>
        <p>
          <span className={Style.key}>ID</span>
          <span className={Style.value}>{silence.id}</span>
        </p>
        <p>
          <span className={Style.key}><FormattedMessage id="silences.startsAt"/></span>
          <span className={Style.value}>{startAt}</span>
        </p>
        <p>
          <span className={Style.key}><FormattedMessage id="silences.updatedAt"/></span>
          <span className={Style.value}>{updatedAt}</span>
        </p>
        <p>
          <span className={Style.key}><FormattedMessage id="silences.endsAt"/></span>
          <span className={Style.value}>{endsAt}</span>
        </p>
        <p>
          <span className={Style.key}><FormattedMessage id="silences.createdBy"/></span>
          <span className={Style.value}>{silence.createdBy}</span>
        </p>
        <p>
          <span className={Style.key}><FormattedMessage id="silences.comment"/></span>
          <span className={Style.value}>{silence.comment}</span>
        </p>
        <p>
          <span className={Style.key}><FormattedMessage id="silences.status"/></span>
          <span className={Style.value}>{silence.status.state}</span>
        </p>
        <p>
          <span className={Style.key}><FormattedMessage id="silences.matchername"/></span>
          <span className={Style.value}>{tagList}</span>
        </p>
        <p className={Style.title_box}>
            <span className={Style.title}><FormattedMessage id="silences.detail.affected_alerts"/></span>
        </p>
        <AlertList
                    clickTagHandler={()=>{}}
                    alerts={this.props.alerts}
                    toggleAlertSeverity={this.props.toggleAlertSeverity}
                    toggleAlertStartTime={this.props.toggleAlertStartTime}
                    toggleAlertName={this.props.toggleAlertName}
                    sort={this.props.sort}
                />
      </div>
    )
  }

  render() {
    if(this.props.loading === true){
      return <Loading />
    }
    return (
      <div className={Style.detail_box}>
        {this.props.currentSilence===null?<ResouceNotFound/>:this.renderSilence(this.props.currentSilence)}
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.silences.loading,
    currentSilence:state.silences.currentSilence,
    alerts:state.alerts.alerts,
    sort:state.alerts.sort
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleAlertSeverity: () => {
        dispatch(toggleAlertSeverity());
    },
    toggleAlertStartTime: ()=>{
        dispatch(toggleAlertStartTime());
    },
    toggleAlertName:()=>{
        dispatch(toggleAlertName());
    },
    fetchSilenceWithID: (id) => {
      dispatch(fetchSilenceWithID(id))
    },
    deleteSilenceWithID:(id)=>{
      dispatch(deleteSilenceWithID(id))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SilencesDetail)