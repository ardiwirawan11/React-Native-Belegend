import axios from 'axios';
export const apiGetMyscholarship  = (token) => {
    let headers = {
        'Authorization': token
    };
    return axios
        .get(
            'https://belegend.herokuapp.com/api/v1/scholarship/user',
            { headers: headers }  
        )
        .then(function (res) {
            return res.data.results
        });
};