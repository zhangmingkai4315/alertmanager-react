import axios from 'axios';
import config from '../config.json';
const API_URL = config.API_URL;

const fetchAlert = () =>{
    return axios.get(`${API_URL}/alerts`,{
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

export default {
    fetchAlert,
    fetchStatus
}