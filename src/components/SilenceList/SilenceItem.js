import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';
import config from '../../config.json';
import {getTagListFromMatchers} from '../../lib/utils';
moment.updateLocale(config.i18n, momentLocale);


const SilenceItem = ({silence}) => {
    const tagList = getTagListFromMatchers(silence.matchers||[])
    const startAt = moment(silence.startsAt).fromNow();
    const updatedAt = moment(silence.updatedAt).fromNow();
    const endsAt = moment(silence.endsAt).fromNow();
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
                  to={`/silences/${silence.id}`}

                    ><i className="fa fa-edit fa-2x"></i></Link>
            </td>
        </tr>
    )
}



export default SilenceItem