import request from '../utils/request.js';
import Api from '@/api/apiUrl/';

//列表
const list = query => {
    return request({
        url: Api.area.list,
        method: 'post',
        data: query
    });
};

//修改
const edit = query => {
    return request({
        url: Api.area.edit,
        method: 'post',
        data: query
    });
};

//添加
const add = query => {
    return request({
        url: Api.area.add,
        method: 'post',
        data: query
    });
};

//删除
const del = query => {
    return request({
        url: Api.area.del,
        method: 'get',
        params: query
    });
};

//获取所选区域的模块
const getAll = query => {
    return request({
        url: Api.area.getAll,
        method: 'get',
        params: query
    });
};

export default {
    list,
    edit,
    add,
    del,
    getAll
};
