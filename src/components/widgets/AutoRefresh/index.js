import React from 'react'
import { injectIntl } from 'react-intl'

import Style from './style.css'
import PropTypes from 'prop-types';
class AutoRefresh extends React.Component {
    state = {
        timer:null,
        selected:0,
    }
    componentWillUnmount(){
        if(this.state.timer){
            clearInterval(this.state.timer);
        }
    }
    updateTimer = (e) => {
        const timeInterval =  parseInt(e.target.value,10) *1000
        if(this.state.timer){
            clearInterval(this.state.timer);
        }
        if(timeInterval>0){
            const timer = setInterval(this.props.onRefresh,timeInterval);
            this.setState({timer,selected:timeInterval})
        }
    }

    render(){
        return (
            <div>
                <select onChange={this.updateTimer} className={`custom-select ${Style.custom} ${this.state.selected>0 ? Style.enabled:""}`} defaultValue="0">
                    <option value="0">{this.props.intl.formatMessage({id:"alerts.off_auto_refresh"})}</option>
                    <option value="10">{this.props.intl.formatMessage({id:"alerts.auto_refresh_10s"})}</option>
                    <option value="30">{this.props.intl.formatMessage({id:"alerts.auto_refresh_30s"})}</option>
                    <option value="60">{this.props.intl.formatMessage({id:"alerts.auto_refresh_1m"})}</option>
                    <option value="300">{this.props.intl.formatMessage({id:"alerts.auto_refresh_5m"})}</option>
                </select>
            </div>)
    }
}

AutoRefresh.propTypes = {
    onRefresh: PropTypes.func.isRequired
}
export default injectIntl(AutoRefresh)
