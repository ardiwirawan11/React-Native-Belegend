import axios from 'axios';
export const apiGetScholarship  = () => {
    return axios
        .get(
            'https://belegend.herokuapp.com/api/v1/scholarship/',
        )
        .then(function (res) {
            return res.data.results
        });
};