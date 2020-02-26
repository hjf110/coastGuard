import request from '../utils/request.js';
import Api from './apiUrl/';

//列表
const login = query => {
    return request({
        url: Api.ddLogin.in,
        method: 'get',
        params: query
    });
};

export default {
    login
};
