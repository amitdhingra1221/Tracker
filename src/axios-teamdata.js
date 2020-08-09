import axios from 'axios';

const instance = axios.create ({
    baseURL: 'https://react-my-project-e7e4a.firebaseio.com/'
    // JS object passed to it to configure it
})

export default instance;