import axios from 'axios';
export const apiGetAccepted = (token, id) => {
    let headers = {
        'Authorization': token
    };
    return axios
        .get(
            `https://belegend.herokuapp.com/api/v1/applied/accept/${id}`,
            { headers: headers }
        )
        .then(function (res) {
            return res.data.results
        });
};