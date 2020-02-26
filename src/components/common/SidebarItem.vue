<template>
    <fragment v-if="item.isshow">
        <template v-if="item.subs">
            <template v-if="item.subs.length == 0">
                <el-menu-item :index="item.index">
                    <i class="el-icon-menu"></i>
                    <span slot="title"> {{item.title}}</span>
                </el-menu-item>
            </template>
            <el-submenu v-else :index="item.index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title"> {{item.title}}</span>
                </template>
                <template v-for="child in item.subs">
                    <sidebar-item
                            v-if="child.subs&&child.subs.length>0"
                            :item="child"
                            :key="child.index"/>
                    <el-menu-item v-else :key="child.index" :index="child.index">
                        <i :class="child.icon"></i>
                        <span slot="title">{{ child.title }}</span>
                    </el-menu-item>
                </template>
            </el-submenu>
        </template>
        <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </template>
    </fragment>
</template>

<script>
    export default {
        name: 'SidebarItem',
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    };
</script>

<style scoped>

</style>