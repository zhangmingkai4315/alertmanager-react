import React, {Component} from 'react'
import { connect } from 'react-redux';
import {fetchSilences,showSilencesWithStatus} from '../../actions'
import SilenceList from '../../components/SilenceList'
import Alert from '../../components/widgets/Alert';
class Silences extends Component {
    state = {
        sortedSilences:[]
    }
    componentDidMount(){
        this.props.fetchSilences()
    }
    render() {
        let silences = this.props.filtedSilences
        return (
        <div>
            {this.props.silences.error?<Alert alert={this.props.silences.error}/>:null}
            <SilenceList
                silences={silences}
                showSilencesWithStatus={this.props.showSilencesWithStatus}
            />
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        silences:state.silences.silences,
        filtedSilences:state.silences.filtedSilences
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSilences: () => {
            dispatch(fetchSilences())
        },
        showSilencesWithStatus:(status)=>{
            dispatch(showSilencesWithStatus(status))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Silences)