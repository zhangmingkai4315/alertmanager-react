import React, { Component } from 'react'
import NewSilenceForm from '../../components/NewSilenceForm'
import { connect } from 'react-redux'
import { postNewSilence } from '../../actions'
import { Redirect } from 'react-router-dom'
class SilencesNew extends Component {
  render() {
    const id = this.props.info && this.props.info.create && this.props.info.create.silenceId;
    return (
      <div>
        {id?<Redirect to={`/silence/${id}`}/>:
        <NewSilenceForm location={this.props.location} onSubmit={silence=>this.props.postNewSilence(silence)}/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.silences.info
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    postNewSilence: (silence) => {
      dispatch(postNewSilence(silence))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SilencesNew)