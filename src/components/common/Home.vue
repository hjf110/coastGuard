<template>
    <div class = "wrapper" v-loading = "loading" element-loading-background = "rgba(0, 0, 0, 1)" element-loading-spinner = "el-icon-warning-outline" :element-loading-text = "errLogin">
        <v-head></v-head>
        <v-sidebar :role = "role" :rush = "rush"></v-sidebar>
        <div class = "content-box" :class = "{ 'content-collapse': collapse }">
            <v-tags :rush = "rush"></v-tags>
            <div class = "content">
                <transition name = "slide-fade">
                    <keep-alive :include = "tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target = ".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';

export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            activeDate: 123,
            role: 3,
            loading: false,
            errLogin: ''
            
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        this.roles();
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });
        
        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    },
    methods: {
        roles() {
            let info = JSON.parse(sessionStorage.getItem('ms_userInfo'));

        },
        rush() {
            //刷新页面
            this.$router.replace({
                path: '/refresh',
                query: {
                    t: Date.now()
                }
            });
            // this.activeDate = new Date().valueOf();
        }
    },
    mounted() {
        // let list = ['你', '我', '他'];
        // let i = list.indexOf('你为');
        // console.log('------------获得的i是-------------', i);
        //
    }
};
</script>
<style scoped>
    .slide-fade {
        position: absolute;
        left: 0;
        right: 0;
    }
    
    .slide-fade-enter-active {
        transition: all 0.8s ease;
    }
    
    .slide-fade-leave-active {
        transition: all 0.5s cubic-bezier(2, 0.5, 0.8, 1);
    }
    
    .slide-fade-enter,
    .slide-fade-leave-to {
        left: 0;
        right: 0;
        transform: translateX(-50px);
        opacity: 0;
    }
</style>
