import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Style from './style.css';
import {getTagListFromMatchers,getTimeFromNow} from '../../lib/utils';
import  ResouceNotFound from '../../components/widgets/ResouceNotFound';
import { connect } from 'react-redux';
import { fetchSilenceWithID,deleteSilenceWithID } from '../../actions';
import Loading from '../../components/widgets/Loading'
import ModalBox from '../../components/widgets/Modal';
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
        <p>
            <span className={Style.title}>Silence</span>
            <button disabled={silence.status.state==='expired'} onClick={()=>this.setState({showModal:true})} className={[Style.custom_btn,"btn btn-danger"].join(" ")}>设置到期</button>
            <Link to={{pathname:"/silences/new",matchers:silence.matchers}} className={[Style.custom_btn,"btn btn-info"].join(" ")}>
              重新构建
            </Link>
        </p>
        <hr/>
        <p>
          <span className={Style.key}>ID</span>
          <span className={Style.value}>{silence.id}</span>
        </p>
        <p>
          <span className={Style.key}>Starts at</span>
          <span className={Style.value}>{startAt}</span>
        </p>
        <p>
          <span className={Style.key}>Updated at</span>
          <span className={Style.value}>{updatedAt}</span>
        </p>
        <p>
          <span className={Style.key}>Ends at</span>
          <span className={Style.value}>{endsAt}</span>
        </p>
        <p>
          <span className={Style.key}>Created By</span>
          <span className={Style.value}>{silence.createdBy}</span>
        </p>
        <p>
          <span className={Style.key}>Comment</span>
          <span className={Style.value}>{silence.comment}</span>
        </p>
        <p>
          <span className={Style.key}>Status</span>
          <span className={Style.value}>{silence.status.state}</span>
        </p>
        <p>
          <span className={Style.key}>Matchers</span>
          <span className={Style.value}>{tagList}</span>
        </p>
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
    currentSilence:state.silences.currentSilence
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSilenceWithID: (id) => {
      dispatch(fetchSilenceWithID(id))
    },
    deleteSilenceWithID:(id)=>{
      dispatch(deleteSilenceWithID(id))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SilencesDetail)