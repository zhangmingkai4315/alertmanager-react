import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types';
import SilenceItem from './SilenceItem';
import Styles from './style.css'
const SilenceList = (props) => {
    return (
        <div className={Styles.silenceListGroup}>
            <div className="btn-group right" style={{"paddingBottom":"20px","float":"right"}} role="group" aria-label="Basic example">
              <button type="button" className={`${Styles.custom_btn} btn btn-info`} onClick={()=>props.showSilencesWithStatus('')}><FormattedMessage id="silences.show_all"/></button>
              <button type="button" className={`${Styles.custom_btn} btn btn-info`} onClick={()=>props.showSilencesWithStatus('active')}><FormattedMessage id="silences.show_active"/></button>
              <button type="button" className={`${Styles.custom_btn} btn btn-info`} onClick={()=>props.showSilencesWithStatus('pending')}><FormattedMessage id="silences.show_pending"/></button>
              <button type="button" className={`${Styles.custom_btn} btn btn-info`}  onClick={()=>props.showSilencesWithStatus('expired')}><FormattedMessage id="silences.show_expired"/></button>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th><FormattedMessage id="silences.matchername"/></th>
                    <th><FormattedMessage id="silences.createdBy"/></th>
                    <th><FormattedMessage id="silences.comment"/></th>
                    <th><FormattedMessage id="silences.status"/></th>
                    <th><FormattedMessage id="silences.startsAt"/></th>
                    <th><FormattedMessage id="silences.endsAt"/></th>
                    <th><FormattedMessage id="silences.updatedAt"/></th>
                    <th><i className="fa fa-wrench"></i> <FormattedMessage id="silences.tools"/></th>
                </tr>
                </thead>
                <tbody>
                {props.silences.map((silence)=><SilenceItem silence={silence} key={silence.id}/>)}
                </tbody>
            </table>
        </div>
    )
}

SilenceList.propTypes = {
    showSilencesWithStatus: PropTypes.func.isRequired,
    silences: PropTypes.array.isRequired
}

export default SilenceList