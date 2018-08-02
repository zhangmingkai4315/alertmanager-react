import axios from 'axios';

const fetchAlert = (search,filters) =>{
    const API_URL = localStorage.getItem("apiUrl")
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
    const API_URL = localStorage.getItem("apiUrl")
    return axios.get(`${API_URL}/status`,{
        headers:{
            'Accept':"application/json"
        }
    });
}
const fetchReivers= () =>{
    const API_URL = localStorage.getItem("apiUrl")
    return axios.get(`${API_URL}/receivers`,{
        headers:{
            'Accept':"application/json"
        }
    });
}

const fetchSilences = (search,filters) =>{
    let {silenced,inhibited} = search;
    const API_URL = localStorage.getItem("apiUrl")
    const queryString = `?silenced=${silenced}&inhibited=${inhibited}`

    return axios.get(`${API_URL}/silences${queryString}`,{
        headers:{
            'Accept':"application/json"
        }
    });
}

const fetchSilenceWithID = (id) =>{
    const API_URL = localStorage.getItem("apiUrl")
    return axios.get(`${API_URL}/silence/${id}`,{
        headers:{
            'Accept':"application/json"
        }
    });
}

const postNewSilence = (silence) =>{
    const API_URL = localStorage.getItem("apiUrl")
    return axios.post(`${API_URL}/silences`,silence,{
        headers:{
            'Accept':"application/json"
        }
    }); 
}

const deleteSilenceWithID = (id) =>{
    const API_URL = localStorage.getItem("apiUrl")
    return axios.delete(`${API_URL}/silence/${id}`,{
        headers:{
            'Accept':"application/json"
        }
    });
}

const connectAlertManagerURL = (url) =>{
    return axios.get(`${url}/status`,{
        headers:{
            'Accept':"application/json"
        }
    });
}

const connectHistoryServerURL = (url) =>{
    return axios.get(`${url}`);
}

const searchHistoryAlerts =(search) =>{
    console.log(search)
    const url = localStorage.getItem("historyUrl")
    return axios.post(`${url}/search`,search,{
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
    deleteSilenceWithID,
    connectAlertManagerURL,
    connectHistoryServerURL,
    searchHistoryAlerts,
}