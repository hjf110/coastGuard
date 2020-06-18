import request from '../utils/request.js';
import Api from '@/api/apiUrl/';

//上传图片
const upload = query => {
    return request({
        url: Api.setting.img,
        method: 'post-img',
        data: query
    });
};

export default {
    upload
};
