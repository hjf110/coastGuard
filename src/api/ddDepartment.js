import request from '../utils/request.js';
import Api from '@/api/apiUrl/';

//列表
const list = query => {
    return request({
        url: Api.ddDepartment.list,
        method: 'post',
        params: query
    });
};
//添加
const add = query => {
    return request({
        url: Api.ddDepartment.add,
        method: 'post',
        data: query
    });
};

//修改
const edit = query => {
    return request({
        url: Api.ddDepartment.update,
        method: 'post',
        data: query
    });
};
//删除
const del = query => {
    return request({
        url: Api.ddDepartment.del,
        method: 'get',
        params: query
    });
};

export default {
    list,
    add,
    edit,
    del
};
