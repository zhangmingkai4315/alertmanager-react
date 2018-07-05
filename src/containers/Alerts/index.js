import React, {Component} from 'react'
import {connect} from 'react-redux';
import AlertList from '../../components/AlertList';

class Alerts extends Component {
    render() {
        return (
            <div>
                 
                <AlertList alerts={this.props.alerts?this.props.alerts:[]}/>
            </div>
        )
    }
}

const mapStateToProps = ({alerts})=>{
    return{
        alerts:alerts.alerts
    }
}

export default connect(mapStateToProps,null)(Alerts)