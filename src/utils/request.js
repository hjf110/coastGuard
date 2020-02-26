import axios from 'axios';
import qs from 'qs';
// import { Message } from 'element-ui';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: "",
    timeout: 600000
});

service.interceptors.request.use(
    config => {
        // config.headers
        if (config.method === 'post') {
            //普通post请求参数处理
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            config.data = qs.stringify(config.data,{ indices: false });
            // config.
        } else if (config.method === 'post-json') {
            //post-json请求
            config.method = 'post';
            config.headers['Content-Type'] = 'application/json';
        } else if (config.method === 'post-img') {
            //post-文件上传请求
            config.method = 'post';
            config.headers['Content-Type'] = 'multipart/form-data';
        }

        // console.log('拦截的请求参数修改后---------------------',config);

        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.code == 0) {
                return response.data;
            } else {
                console.log(response.data.msg);
                // Message.error(response.data.msg);
                return Promise.reject(response.data.msg);
            }
        } else {
            // Message.error('');
            console.log(response.data.msg);
            return Promise.reject('网络错误--' + response.status);
        }
    },
    error => {
        console.log(error);
        return Promise.reject('网络错误');
    }
);

export default service;
