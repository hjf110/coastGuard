<template>
    <div class="sidebar">
        <SidebarNew :menuList="items"/>
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
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页',
                        isshow: false,
                        pk: '0'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'mailaddress',
                        title: '首长直通邮箱管理',
                        isshow: false,
                        pk: '1'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'advertisement',
                        title: '首页图片管理',
                        isshow: false,
                        pk: '2'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'utilparam',
                        title: '系统参数管理',
                        isshow: false,
                        pk: '3'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'myModule',
                        title: '栏目管理',
                        isshow: false,
                        pk: '4'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'authority',
                        title: '权限组管理',
                        isshow: false,
                        pk: '5'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'sidelink',
                        title: '右侧链接管理',
                        isshow: false,
                        pk: '6'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'team',
                        title: '部门架构管理',
                        isshow: false,
                        pk: '7'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'friendlyurl',
                        title: '友情链接管理',
                        isshow: false,
                        pk: '8'
                    }, {
                        icon: 'el-icon-lx-home',
                        index: 'creater',
                        title: '管理员管理',
                        isshow: false,
                        pk: '9'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'artist',
                        title: '新闻管理',
                        isshow: false,
                        pk: '10'
                    }


                ],
                res: [],
                useritem: ['0', '1', '2', '3', '4','5','6','7','8','9','10']
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

            //给用户赋予相应的菜单权限
            this.Nested_roles(this.items, this.useritem, 0);
            //console.log("this.res:",JSON.stringify(this.res));
        },
        methods: {
            //将树形json设置为扁平化json
            NestedToFlat: function(data, pid) {
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
            Nested_roles: function(data, useritem, pid) {
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
