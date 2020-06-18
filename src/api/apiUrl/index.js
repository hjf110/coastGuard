const baseUrl = process.env.VUE_APP_BASE_URL; //主业务接口地址
const baseUrlDD = process.env.VUE_APP_BASE_URL_DD; //钉钉相关接口地址

export default {
    setting: {
        img: baseUrl + 'file/local-upload' //上传图片地址
    },
    artist: {
        //信息内容管理
        add: baseUrl + 'artist/add',
        edit: baseUrl + 'artist/edit',
        list: baseUrl + 'artist/list',
        del: baseUrl + 'artist/delete',
        findContent: baseUrl + 'artist/getContent'
    },
    creater: {
        //信息员管理
        add: baseUrl + 'creater/add',
        edit: baseUrl + 'creater/edit',
        list: baseUrl + 'creater/list',
        del: baseUrl + 'creater/delete',
        login: baseUrl + 'creater/login'
    },
    friendlyurl: {
        //友情链接管理
        add: baseUrl + 'friendlyurl/add',
        edit: baseUrl + 'friendlyurl/edit',
        list: baseUrl + 'friendlyurl/list',
        del: baseUrl + 'friendlyurl/delete'
    },
    team: {
        //团队信息管理
        add: baseUrl + 'team/add',
        edit: baseUrl + 'team/edit',
        list: baseUrl + 'team/list',
        del: baseUrl + 'team/delete'
    },
    sidelink: {
        //支持链接管理
        add: baseUrl + 'sidelink/add',
        edit: baseUrl + 'sidelink/edit',
        list: baseUrl + 'sidelink/list',
        del: baseUrl + 'sidelink/delete'
    },
    authority: {
        //权限组管理
        add: baseUrl + 'authority/add',
        edit: baseUrl + 'authority/edit',
        list: baseUrl + 'authority/list',
        del: baseUrl + 'authority/delete'
    },
    myModule: {
        //模块管理
        add: baseUrl + 'module/add',
        edit: baseUrl + 'module/edit',
        list: baseUrl + 'module/list',
        del: baseUrl + 'module/delete',
        tree: baseUrl + '/module/tree'
    },
    area: {
        add: baseUrl + 'area/add',
        edit: baseUrl + 'area/edit',
        list: baseUrl + 'area/list',
        del: baseUrl + 'area/delete',
        getAll: baseUrl + 'area/getAll' //获取显示区域的数据
    },
    utilparam: {
        //系统参数管理
        add: baseUrl + 'utilparam/add',
        edit: baseUrl + 'utilparam/edit',
        list: baseUrl + 'utilparam/list',
        del: baseUrl + 'utilparam/delete'
    },
    advertisement: {
        //轮播图管理
        add: baseUrl + 'advertisement/add',
        edit: baseUrl + 'advertisement/edit',
        list: baseUrl + 'advertisement/list',
        del: baseUrl + 'advertisement/delete'
    },
    mailaddress: {
        //邮件地址管理
        add: baseUrl + 'mailaddress/add',
        edit: baseUrl + 'mailaddress/edit',
        list: baseUrl + 'mailaddress/list',
        del: baseUrl + 'mailaddress/delete'
    }
};
