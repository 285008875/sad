import axios from 'axios';
import Nprogress from './components/nprogress/index';

axios.interceptors.request.use(function (config) {
    // <Nprogress />
    // console.log(Nprogress);

    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;

    }
    return config;
})
export default axios;
// axios.interceptors.response.use(function (config) {
//     // Toast.hide();
//     return config;
// })

// export default instance 