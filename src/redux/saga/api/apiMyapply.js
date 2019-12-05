import axios from 'axios';
export const apiGetMyapply  = (token) => {
    let headers = {
        'Authorization': token
    };
    return axios
        .get(
            'https://belegend.herokuapp.com/api/v1/applied/',
            { headers: headers }  
        )
        .then(function (res) {
            return res.data.results
        });
};