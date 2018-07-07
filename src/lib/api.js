import axios from 'axios';
import config from '../config.json';
const API_URL = config.API_URL;

const fetchAlert = (search,filters) =>{
    let {silenced,inhibited,receiver} = search;
    if(receiver ==='All'){
        receiver = ""
    }
    let filterString = '';
    if(filters.length >= 0 ){
        filterString+=`&filter={${filters.join(',')}}`;
    }

    const queryString = `?silenced=${silenced}&inhibited=${inhibited}&receiver=${receiver}${filterString}`

    return axios.get(`${API_URL}/alerts${queryString}`,{
        headers:{
            'Accept':"application/json"
        }
    });
}

const fetchStatus= () =>{
    return axios.get(`${API_URL}/status`,{
        headers:{
            'Accept':"application/json"
        }
    });
}
const fetchReivers= () =>{
    return axios.get(`${API_URL}/receivers`,{
        headers:{
            'Accept':"application/json"
        }
    });
}
export default {
    fetchAlert,
    fetchStatus,
    fetchReivers
}