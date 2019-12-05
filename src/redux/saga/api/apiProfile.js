import axios from 'axios';
export const apiGetProfile  = (id) => {
    return axios
        .get(
           `https://belegend.herokuapp.com/api/v1/profile_athlete/${id}`
        )
        .then(function (res) {
            return res.data.results
        });
};