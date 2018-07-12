import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
            this.setState({error:"Validate error.Change you input url and try submitting again."})
        }
    }

    componentWillReceiveProps(nextProps){
        const errorMessage = nextProps.error && nextProps.error.toString()
        console.log(errorMessage)
        this.setState({
            error:errorMessage
        }) 
    }
    renderMessage = () =>{
        if(this.state.error !== ''){
            return <div className={`${Styles.alert_box} alert alert-danger`} role="alert">
                        <strong>{this.state.error}</strong> 
                    </div>
        }
        if(this.props.url &&  this.props.url === this.state.url ){
            return <div className={`${Styles.alert_box} alert alert-success`}>
                    <strong>Connected! </strong> Now you can click <Link to="/alerts">alerts</Link> to all alerts status.
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
                            {this.props.loading?<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>:""} <FormattedMessage id="enter.btn.test"/></button>
                            {this.renderMessage()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.global.loading,
        error:state.global.error,
        url: state.global.apiUrl,
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