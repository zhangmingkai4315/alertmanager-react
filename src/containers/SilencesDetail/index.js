import React, { Component } from 'react'
import Style from './style.css';
import {getTagListFromMatchers,getTimeFromNow} from '../../lib/utils';
import  ResouceNotFound from '../../components/widgets/ResouceNotFound';
import { connect } from 'react-redux';
import { fetchSilenceWithID } from '../../actions';
import Loading from '../../components/widgets/Loading'
class SilencesDetail extends Component {
  componentDidMount(){
    const id = this.props.match.params.id;
    if(id){
      this.props.fetchSilenceWithID(id)
    }
  }
  renderSilence=(silence)=>{
    const tagList = getTagListFromMatchers(silence.matchers||[],false)
    const startAt =getTimeFromNow(silence.startsAt);
    const updatedAt = getTimeFromNow(silence.updatedAt);
    const endsAt = getTimeFromNow(silence.endsAt);
    return (
      <div>
        <p>
            <span className={Style.title}>Silence</span>
            <button className={[Style.custom_btn,"btn btn-danger"].join(" ")}>Delete</button>
            <button className={[Style.custom_btn,"btn btn-info"].join(" ")}>Recreate</button>
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
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SilencesDetail)