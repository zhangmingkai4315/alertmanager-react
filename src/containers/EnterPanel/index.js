import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Styles from "./style.css"
import { FormattedMessage } from 'react-intl'
import {connect} from 'react-redux';
import { connectAlertManagerURL,connectHistoryServerURL } from '../../actions'
import {isURL} from '../../lib/utils'
class EnterPanel extends Component {
    state = {
        alertmanager_url:"",
        history_server_url:"",
        error:"",
    }
    onHandleEnter =() => {
        if(!this.state.alertmanager_url) {
            this.setState({error:"AlertManager is empty"})
            return 
        }
         if(!this.state.history_server_url) {
            this.setState({error:"History server is empty"})
            return 
        }       
        const alertmanager_url = this.state.alertmanager_url.trim();
        const history_server_url = this.state.history_server_url.trim();
        if(isURL(alertmanager_url) && isURL(history_server_url)){
            this.props.connectAlertManagerURL(alertmanager_url)
            this.props.connectHistoryServerURL(history_server_url)
        }else{
            this.setState({error:"Validate error.Change you input url and try submitting again."})
        }
    }
    componentDidMount(){
        this.setState({
            alertmanager_url:this.props.alertmanager_url,
            history_server_url:this.props.history_server_url,
        })
    }
    componentWillReceiveProps(nextProps){
        const errorMessage = nextProps.error && nextProps.error.toString()
        this.setState({
            error:errorMessage
        }) 
    }
    renderMessage = () =>{
        let message = null;
        if(this.state.error !== ''){
             message=(<div className={`${Styles.alert_box} alert alert-danger`} role="alert">
                        <strong>{this.state.error}</strong> 
                    </div>)
            return message
        }
        if(this.props.alertmanager_url &&  
           this.props.history_server_url && 
           this.props.history_server_url === this.state.history_server_url && 
           this.props.alertmanager_url === this.state.alertmanager_url ){
             message=(<div className={`${Styles.alert_box} alert alert-success`}>
                    <strong>Both Servers Connected! </strong> Now you can click <Link to="/alerts">alerts</Link> to all alerts status.
                   </div>)
        }else if(!this.props.alertmanager_url){
             message=(<div className={`${Styles.alert_box} alert alert-danger`}>
                    <strong>AlertManager Not Connected! </strong> You must input Alertmanager url and connect first
                   </div>)
        }else if(!this.props.history_server_url){
            message=(<div className={`${Styles.alert_box} alert alert-danger`}>
                    <strong>History Server Not Connected! </strong> You can't search for history. Please input history server url and connect
                   </div>)
        }
        return message
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
                            <input value={this.state.alertmanager_url} onChange={(e)=>this.setState({alertmanager_url:e.target.value,error:""})}className="form-control" placeholder="" type="text"/>
                            <p className={Styles.small}><FormattedMessage id="enter.input_history_helper"/></p>
                            <input value={this.state.history_server_url} onChange={(e)=>this.setState({history_server_url:e.target.value,error:""})}className="form-control" placeholder="" type="text"/>
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
        alertmanager_url: state.global.apiUrl,
        history_server_url: state.global.historyUrl,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        connectAlertManagerURL: (url) => {
            dispatch(connectAlertManagerURL(url))
        },
        connectHistoryServerURL:(url)=>{
            dispatch(connectHistoryServerURL(url));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EnterPanel)