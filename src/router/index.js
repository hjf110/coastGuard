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
                    path: '/advertisement',
                    name: 'advertisement',
                    component: () => import('@/view/advertisement/'),
                    meta: { title: '轮播图管理', permission: true }
                },
                {
                    path: '/utilparam',
                    name: 'utilparam',
                    component: () => import('@/view/utilparam/'),
                    meta: { title: '系统参数管理', permission: true }
                } ,
                {
                    path: '/myModule',
                    name: 'myModule',
                    component: () => import('@/view/myModule/'),
                    meta: { title: '模块管理', permission: true }
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
