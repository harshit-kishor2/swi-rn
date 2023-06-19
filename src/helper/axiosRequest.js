// import axios from 'axios';
// import {BASE_URL, API_URL} from './config';

// const axiosRequest = axios.create({baseURL: API_URL});

// axiosRequest.interceptors.response.use(
//   response => {
//     return response.data;
//   },
//   error => {
//     if (error.response?.status === 500) {
//       console.log('500 error', error.response);
//     } else if (error.response?.status === 401) {
//       console.log('401 error');
//     } else if (error.response?.status === 403) {
//       console.log('403 error');
//     } else if (error.response?.status === 404) {
//       console.log('404 error');
//     } else if (error.response?.status === 422) {
//       console.log('422 error');
//     }
//     return Promise.reject(error);
//   },
// );

// export default axiosRequest;
