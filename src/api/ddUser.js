import request from '../utils/request.js';
import Api from '@/api/apiUrl/';

//列表
const list = query => {
    return request({
        url: Api.ddUser.list,
        method: 'post',
        params: query
    });
};

//修改
const edit = query => {
    return request({
        url: Api.ddUser.edit,
        method: 'post',
        data: query
    });
};


//获取钉钉部门
const dep = () => {
    return request({
        url: Api.ddLogin.dep,
        method: 'get'
    });
};



export default {
    list,
    edit,
    dep
};
