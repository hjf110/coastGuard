import request from '../utils/request';
import Api from '@/api/apiUrl/';
import qs from 'qs';

//列表
export const listb = query => {
    return request({
        url: Api.baobei.list,
        method: 'post',
        params: query
    });
};
//添加
export const add = query => {
    return request({
        url: Api.baobei.add,
        method: 'post',
        data: query
    });
};

//修改
export const edit = query => {
    return request({
        url: Api.baobei.update,
        method: 'post',
        data: query
    });
};
//删除
export const del = query => {
    return request({
        url: Api.baobei.del,
        method: 'get',
        params: query
    });
};

//获取该子账号下的对接人和项目列表
export const getRelevancy = query => {
    return request({
        url: Api.baobei.getRelevancy,
        method: 'get',
        params: query
    });
};

//同步报备单信息到他们的营销宝中去
export const synchro = query => {
    return request({
        url: Api.baobei.synchro,
        method: 'get',
        params: query
    });
};
