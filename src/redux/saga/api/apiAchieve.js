import axios from 'axios';
export const apiGetAchieve  = (token) => {
    let headers = {
        'Authorization': token
    };
    return axios
        .get(
            'https://belegend.herokuapp.com/api/v1/achievement',
            { headers: headers }  
        )
        .then(function (res) {
            return res.data.results
        });
};