import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '后台首页', permission: true },
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/view/dashboard/'),
                    meta: { title: '系统首页', permission: true }
                },
                {
                    path: '/mailaddress',
                    name: 'mailaddress',
                    component: () => import('@/view/mailaddress/'),
                    meta: { title: '首长直通邮箱管理', permission: true }
                },
                {
                    path: '/advertisement',
                    name: 'advertisement',
                    component: () => import('@/view/advertisement/'),
                    meta: { title: '首页图片管理', permission: true }
                },
                {
                    path: '/utilparam',
                    name: 'utilparam',
                    component: () => import('@/view/utilparam/'),
                    meta: { title: '系统参数管理', permission: true }
                },
                {
                    path: '/myModule',
                    name: 'myModule',
                    component: () => import('@/view/myModule/'),
                    meta: { title: '栏目管理', permission: true }
                },
                {
                    path: '/authority',
                    name: 'authority',
                    component: () => import('@/view/authority/'),
                    meta: { title: '权限管理', permission: true }
                },
                {
                    path: '/sidelink',
                    name: 'sidelink',
                    component: () => import('@/view/sidelink/'),
                    meta: { title: '右侧链接管理', permission: true }
                },
                {
                    path: '/team',
                    name: 'team',
                    component: () => import('@/view/team/'),
                    meta: { title: '部门架构管理', permission: true }
                },
                {
                    path: '/friendlyurl',
                    name: 'friendlyurl',
                    component: () => import('@/view/friendlyurl/'),
                    meta: { title: '友情链接管理', permission: true }
                },
                {
                    path: '/creater',
                    name: 'creater',
                    component: () => import('@/view/creater/'),
                    meta: { title: '管理员管理', permission: true }
                },
                {
                    path: '/artist',
                    name: 'artist',
                    component: () => import('@/view/artist/'),
                    meta: { title: '新闻管理', permission: true }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/DDLogin',
            name: 'DDLogin',
            component: () => import(/* webpackChunkName: "login" */ '@/view/ddLogin/'),
            meta: { title: '钉钉登录' }
        },

        // {
        //     path: '/404',
        //     component: () => import( /* webpackChunkName: "404" */ '../components/page/404.vue'),
        //     meta: { title: '404' }
        // },
        {
            path: '/refresh',
            component: () => import(/* webpackChunkName: "403" */ '../components/common/refresh.vue'),
            meta: { title: 'refresh' }
        },
        {
            path: '/403',
            component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
            meta: { title: '403' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
