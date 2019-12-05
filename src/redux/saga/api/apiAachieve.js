import axios from 'axios';
export const apiGetAachieve  = (id) => {
    return axios
        .get(
           `https://belegend.herokuapp.com/api/v1/achievement/${id}`
        )
        .then(function (res) {
            return res.data.results
        });
};