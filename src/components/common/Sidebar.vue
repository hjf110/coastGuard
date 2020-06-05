<template>
    <div class="sidebar">
        <SidebarNew :menuList="items" />
    </div>
</template>

<script>
import bus from '../common/bus';
import SidebarNew from '../common/SidebarNew.vue';

export default {
    components: { SidebarNew },
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-house',
                    index: 'dashboard',
                    title: '系统首页',
                    isshow: true,
                    pk: '系统首页'
                },
                {
                    icon: 'el-icon-notebook-2',
                    index: 'artist',
                    title: '新闻管理',
                    isshow: false,
                    pk: '新闻管理'
                },
                {
                    icon: 'el-icon-s-grid',
                    index: 'myModule',
                    title: '栏目管理',
                    isshow: false,
                    pk: '栏目管理'
                },
                {
                    icon: 'el-icon-data-line',
                    index: 'advertisement',
                    title: '首页图片管理',
                    isshow: false,
                    pk: '首页图片管理'
                },
                {
                    icon: 'el-icon-connection',
                    index: 'sidelink',
                    title: '右侧链接管理',
                    isshow: false,
                    pk: '右侧链接管理'
                },
                {
                    icon: 'el-icon-link',
                    index: 'friendlyurl',
                    title: '友情链接管理',
                    isshow: false,
                    pk: '友情链接管理'
                },
                {
                    icon: 'el-icon-message',
                    index: 'mailaddress',
                    title: '首长直通邮箱管理',
                    isshow: false,
                    pk: '首长直通邮箱管理'
                },
                {
                    icon: 'el-icon-s-operation',
                    index: 'team',
                    title: '部门架构管理',
                    isshow: false,
                    pk: '部门架构管理'
                },
                {
                    icon: 'el-icon-s-custom',
                    index: 'creater',
                    title: '管理员管理',
                    isshow: false,
                    pk: '管理员管理'
                },
                {
                    icon: 'el-icon-s-help',
                    index: 'authority',
                    title: '权限组管理',
                    isshow: false,
                    pk: '权限组管理'
                }
                // {
                //     icon: 'el-icon-s-tools',
                //     index: 'utilparam',
                //     title: '系统参数管理',
                //     isshow: false,
                //     pk: '系统参数管理'
                // }
            ],
            res: [],
            useritem: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        let result = this.NestedToFlat(this.items, 0);
        console.log('result:', JSON.stringify(result));
        this.useritem = sessionStorage.getItem('menuP').split('&');
        //给用户赋予相应的菜单权限
        this.Nested_roles(this.items, this.useritem, 0);
        //console.log("this.res:",JSON.stringify(this.res));
    },
    methods: {
        //将树形json设置为扁平化json
        NestedToFlat(data, pid) {
            let res = [];
            // let res_M=this.res
            for (let i = 0; i < data.length; i++) {
                res.push({
                    pk: data[i].pk,
                    index: data[i].index,
                    title: data[i].title,
                    pid: pid || 0
                });

                if (data[i].subs) {
                    // console.log("subs:",JSON.stringify(data[i].subs));
                    res = res.concat(this.NestedToFlat(data[i].subs, data[i].pk));
                }
            }
            return res;
        },
        //循环设置用户对于的菜单选项isshow
        Nested_roles(data, useritem, pid) {
            let res = [];
            // let res_M=this.res

            for (let i = 0; i < data.length; i++) {
                //循环useritem用户权限
                for (let j = 0; j < useritem.length; j++) {
                    if (data[i].pk === useritem[j]) {
                        data[i].isshow = true;
                    }
                }
                if (data[i].subs) {
                    // console.log("subs:",JSON.stringify(data[i].subs));
                    this.NestedToFlat(data[i].subs, data[i].pk);
                }
            }
            // return res;
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    height: 100%;
    top: 50px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 190px;
}

.sidebar > ul {
    height: 100%;
}
</style>
