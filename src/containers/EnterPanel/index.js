import React, { Component } from 'react'
import Styles from "./style.css"
import { FormattedMessage } from 'react-intl'
import {connect} from 'react-redux';
import { testAlertManagerURL } from '../../actions'
class EnterPanel extends Component {
    state = {
        url:"",
        error:"",
    }
    onHandleEnter =() => {
        const url = this.state.url.trim();
        if(url && /^(http|https):\/\/[^ "]+$/.test(url)){
            this.props.testAlertManagerURL(url)
        }else{
            this.setState({error:"url validate fail"})
        }
    }
    validateURL =()=>{

    }
    renderError = () =>{
        if(this.state.error !== ''){
            return <div class={`${Styles.alert_box} alert alert-danger`} role="alert">
                        <strong>Validate Error!</strong> Change you input url and try submitting again.
                    </div>
        }
        return null
    }
    render () {
        return (
            <div className="container-fluid">
                <div className={Styles.inner_wrap}>    
                </div>
                <div className={Styles.enterbox}>
                    <h2 className={Styles.title}><FormattedMessage id="AppName"/></h2>
                    <div className="form-group row">
                        <div className="col-12">
                            <p className={Styles.small}><FormattedMessage id="enter.input_info_helper"/></p>
                            <input value={this.state.url} onChange={(e)=>this.setState({url:e.target.value,error:""})}className="form-control" placeholder="" type="text" id="url-input"/>
                            <button onClick={this.onHandleEnter}
                                    disabled={this.props.loading} 
                                    className={`${Styles.btn} btn btn-info`}>
                            {this.props.loading?<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>:""} Enter</button>
                            {this.renderError()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.status.loading,
        error:state.status.error,
        test:state.status.test
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        testAlertManagerURL: (url) => {
            dispatch(testAlertManagerURL(url))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EnterPanel)