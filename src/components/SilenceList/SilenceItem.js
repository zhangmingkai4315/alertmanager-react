import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {getTagListFromMatchers,getTimeFromNow} from '../../lib/utils';

const SilenceItem = ({ silence }) => {
    const tagList = getTagListFromMatchers(silence.matchers||[])
    const startsAt = getTimeFromNow(silence.startsAt);
    const updatedAt = getTimeFromNow(silence.updatedAt);
    const endsAt = getTimeFromNow(silence.endsAt);
    return (
        <tr>         
            <td>
                <div>{tagList}</div>
            </td>
            <td>
                {silence.createdBy}
            </td>
            <td>
                {silence.comment}
            </td>
            <td>
                {silence.status.state}
            </td>
            <td>
                {startsAt}
            </td>
            <td>
                {updatedAt}
            </td>
            <td>
                {endsAt}
            </td>
            <td>
                <Link 
                  to={`/silence/${silence.id}`}

                    ><i className="fa fa-pencil fa-2x"></i></Link>
            </td>
        </tr>
    )
}

SilenceItem.propTypes = {
    silence: PropTypes.shape({
        id : PropTypes.string.isRequired,
        startsAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        endsAt: PropTypes.string.isRequired,
        status: PropTypes.object.isRequired,
        createdBy : PropTypes.string.isRequired,
        comment : PropTypes.string.isRequired,
        matchers: PropTypes.array.isRequired,
    })

}

export default SilenceItem