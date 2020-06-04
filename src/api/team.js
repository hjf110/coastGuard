import request from '../utils/request.js';
import Api from '@/api/apiUrl/';

//列表
const list = query => {
    return request({
        url: Api.team.list,
        method: 'post',
        params: query
    });
};

//修改
const edit = query => {
    return request({
        url: Api.team.edit,
        method: 'post',
        data: query
    });
};

//添加
const add = query => {
    return request({
        url: Api.team.add,
        method: 'post',
        data: query
    });
};

//删除
const del = query => {
    return request({
        url: Api.team.del,
        method: 'get',
        params: query
    });
};

export default {
    list,
    edit,
    add,
    del
};
