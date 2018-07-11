import React from 'react'
import { Link } from 'react-router-dom';
import {getTagListFromMatchers,getTimeFromNow} from '../../lib/utils';

const SilenceItem = ({silence}) => {
    const tagList = getTagListFromMatchers(silence.matchers||[])
    const startAt = getTimeFromNow(silence.startsAt);
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
                {startAt}
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



export default SilenceItem