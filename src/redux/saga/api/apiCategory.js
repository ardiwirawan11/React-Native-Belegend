import axios from 'axios';
export const apiGetCategory = () => {
    return axios
        .get(
            'https://belegend.herokuapp.com/api/v1/category'  
        )
        .then(function (res) {
            return res.data.results
        });
};