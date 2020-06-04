<template>
    <div>
        <el-tree :data="treeData" @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
export default {
    props: {
        treeData: {
            type: Array,
            default: []
        },
        handleClick: Function
    },
    methods: {
        handleNodeClick(data) {
            // console.log(data);
            this.handleClick(data);
        }
    }
};
</script>

<style scoped></style>
