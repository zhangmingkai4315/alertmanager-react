import React, { Component } from 'react'
import Style from './style.css';
import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';
import config from '../../config.json';
import {getTagListFromMatchers} from '../../lib/utils';
import  ResouceNotFound from '../../components/widgets/ResouceNotFound';
import { connect } from 'react-redux';
moment.updateLocale(config.i18n, momentLocale);

class SilencesDetail extends Component {
  componentDidMount(){
    // get current silences with api
  }
  renderSilence=(silence)=>{
    const tagList = getTagListFromMatchers(silence.matchers||[],false)
    const startAt = moment(silence.startsAt).fromNow();
    const updatedAt = moment(silence.updatedAt).fromNow();
    const endsAt = moment(silence.endsAt).fromNow();
    return (
      <div>
        <h2 className={Style.title}>Silence</h2>
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
    const id = this.props.match.params.id;
    const silences = this.props.silences.filter(s=>s.id===id);
    return (
      <div className={Style.detail_box}>
        {silences.length!==1?<ResouceNotFound/>:this.renderSilence(silences[0])}
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    silences: state.silences.silences
  }
}
export default connect(mapStateToProps,null)(SilencesDetail)