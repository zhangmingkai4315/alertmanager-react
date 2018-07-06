import axios from 'axios';
import config from '../config.json';
const API_URL = config.API_URL;

const fetchAlert = ({silenced,inhibited,receiver}) =>{
    console.log(receiver)
    if(receiver ==='All'){
        receiver = ""
    }
    const queryString = `?silenced=${silenced}&inhibited=${inhibited}&receiver=${receiver}`

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