import axios from 'axios';
import config from '../config.json';
const API_URL = config.API_URL;

const fetchAlert = (search,filters) =>{
    let {silenced,inhibited,receiver} = search;
    if(receiver ==='All'){
        receiver = ""
    }
    let filterString = '';
    if(filters.length > 0 ){
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

const fetchSilences = (search,filters) =>{
    let {silenced,inhibited} = search;
    // let filterString = '';
    // if(filters.length >= 0 ){
    //     filterString+=`filter={${filters.join(',')}}`;
    // }

    const queryString = `?silenced=${silenced}&inhibited=${inhibited}`

    return axios.get(`${API_URL}/silences${queryString}`,{
        headers:{
            'Accept':"application/json"
        }
    });
}

const fetchSilenceWithID = (id) =>{
    return axios.get(`${API_URL}/silence/${id}`,{
        headers:{
            'Accept':"application/json"
        }
    });
}

const postNewSilence = (silence) =>{
    return axios.post(`${API_URL}/silences`,silence,{
        headers:{
            'Accept':"application/json"
        }
    }); 
}

const deleteSilenceWithID = (id) =>{
    return axios.delete(`${API_URL}/silence/${id}`,{
        headers:{
            'Accept':"application/json"
        }
    });
}
export default {
    fetchAlert,
    fetchStatus,
    fetchReivers,
    fetchSilences,
    fetchSilenceWithID,
    postNewSilence,
    deleteSilenceWithID
}