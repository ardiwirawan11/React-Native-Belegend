import axios from 'axios';
export const apiGetInvestor  = (token) => {
    let headers = {
        'Authorization': token
    };
    return axios
        .get(
            'https://belegend.herokuapp.com/api/v1/investor/',
            { headers: headers }  
        )
        .then(function (res) {
            return res.data.results
        });
};