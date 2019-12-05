import axios from 'axios';
export const apiGetDetail  = (token,id) => {
    let headers = {
        'Authorization': token
    };
    return axios
        .get(
            `https://belegend.herokuapp.com/api/v1/scholarship/${id}`,
            { headers: headers }  
        )
        .then(function (res) {
            return res.data.results
        });
};