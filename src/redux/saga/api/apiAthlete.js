import axios from 'axios';
export const apiGetAthlete  = (token) => {
    let headers = {
        'Authorization': token
    };
    return axios
        .get(
            'https://belegend.herokuapp.com/api/v1/profile_athlete/',
            { headers: headers }  
        )
        .then(function (res) {
            return res.data.results
        });
};