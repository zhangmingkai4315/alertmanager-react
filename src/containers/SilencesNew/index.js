import React, { Component } from 'react'
import NewSilenceForm from '../../components/NewSilenceForm'
class SilencesNew extends Component {
  submit = values =>{
    console.log(values);
  }
  render() {
    const matchers = [{

    }];
    return (
      <div>
        <NewSilenceForm onSubmit={this.submit} matchers={matchers}/>
      </div>
    )
  }
}

export default SilencesNew