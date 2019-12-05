import axios from 'axios';
export const apiGetUser = (token) => {
    return axios({
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        },
        url: 'https://belegend.herokuapp.com/api/v1/users/'
    })
        .then((res) => {
            return res.data.results
        });
};

