import axios from 'axios';

const API = {
    post: (api, data) => axios({
        method: 'POST',
        url: `${process.env.REACT_APP_ENDPOINT}/${api}`,
        data: data,
        headers: {
            Authorization: process.env.REACT_APP_AUTHORIZATION
          }
    })
}

export default API;