const _axios = require('axios')
const axiosRetry = require('axios-retry')

const axios = _axios.create()

// https://github.com/softonic/axios-retry/issues/87
const retryDelay = (retryNumber = 0) => {
    const seconds = Math.pow(2, retryNumber) * 1000;
    const randomMs = 1000 * Math.random();
    return seconds + randomMs;
};

axiosRetry(axios, {
    retries: 3,
    retryDelay,
    // retry on Network Error, 5xx responses & status code 429
    retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response.status == "429";
    }
});

module.exports = axios;


//Refer: https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/