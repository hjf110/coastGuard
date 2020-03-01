import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import MyTool from './utils/index'; //工具类
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import NProgress from 'nprogress'; //网页上方进度条
import 'nprogress/nprogress.css'; //网页上方进度条css
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './assets/icon/iconfont.css';
import './components/common/directives';
import 'babel-polyfill';
import Vant from 'vant';
import 'vant/lib/index.css';
import Fragment from 'vue-fragment';
//自定义表单
import FormMaking from 'form-making';
import 'form-making/dist/FormMaking.css';
//富文本编辑器
import VueEditor from "vue2-editor"
import VueImageSwipe from 'vue-image-swipe'
import 'vue-image-swipe/dist/vue-image-swipe.css'


Vue.use(VueImageSwipe);
Vue.use(VueEditor);
Vue.use(FormMaking);
Vue.use(Fragment.Plugin);
Vue.config.productionTip = false;
// Vue.use(VueI18n);
Vue.use(MyTool);
Vue.use(Vant);

Vue.use(ElementUI, {
    size: 'mini',
});
// const i18n = new VueI18n({
//     locale: 'zh',
//     messages
// });

const IsPC = () => {
    let userAgentInfo = navigator.userAgent;
    let Agents = ['Android', 'iPhone',
        'SymbianOS', 'Windows Phone',
        'iPad', 'iPod'];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};


// 简单配置
// NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    // NProgress.done(true);
    console.log('进入了');
    document.title = `${to.meta.title}`;
    const role = sessionStorage.getItem('ms_userInfo');
    // let ispc = sessionStorage.getItem('isPC');
    if (!role && to.path !== '/DDLogin' && to.path !== '/404' && to.path !== '/403') {
        // next('/DDLogin');
        // next({ name: 'DDLogin', params: { id: 'aaa' }})
        next();
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        // role === 'admin' ? next() : next('/403');
        next();
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
    // NProgress开始进度条
    NProgress.start();
});

// 全局后置钩子-常用于结束动画等
router.afterEach(transition => {
    console.log('路由载入成功!!');
    console.log(transition);
    // NProgress结束进度条
    //不加这个进度条会不知道什么原因的卡主
    Vue.nextTick(() => {
        NProgress.done();
    });
    // setTimeout(() => {
    //     // console.log(transition)
    // }, 100);
});

new Vue({
    router,
    // i18n,
    render: h => h(App)
}).$mount('#app');
