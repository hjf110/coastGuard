<template>
    <div>
        <el-form ref="elForm" :model="formData" :rules="rules" label-width="100px">
            <!-- <el-form-item title="信息员" prop="createrid">
                <el-select
                    v-model="formData.createrid"
                    placeholder="请选择信息员"
                    clearable
                    :style="{width: '100%'}"
                >
                    <el-option
                        v-for="(item, index) in createridOptions"
                        :key="index"
                        :title="item.name"
                        :value="item.id"
                        :disabled="item.disabled"
                    ></el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item label="角色名称" prop="authgroup">
                <el-input
                    v-model="formData.authgroup"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '100%' }"
                ></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="authmodule">
                <!-- <a-tree-select
                    allowClear
                    :dropdownStyle="{ zIndex: 9999999999 }"
                    v-model="data.authmodule"
                    style="width: 100%"
                    :tree-data="options"
                    tree-checkable
                    :show-checked-strategy="SHOW_All"
                    search-placeholder="Please select"
                />-->
                <a-tree
                    v-model="data.authmodule"
                    checkable
                    checkStrictly
                    :tree-data="options"
                    :replaceFields="{key:'value'}"
                />
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import main from '@/api/authority';
import creater from '@/api/creater';
import module from '@/api/myModule';

import { TreeSelect } from 'ant-design-vue';
const SHOW_All = TreeSelect.SHOW_ALL;
export default {
    components: {},
    props: {
        type: Number,
        close: Function
    },
    data() {
        return {
            SHOW_All,
            loading: false,
            options: [
                {
                    type: 1,
                    value: '新闻管理',
                    title: '新闻管理',
                    key: '新闻管理'
                },
                {
                    value: '栏目管理',
                    title: '栏目管理'
                },
                {
                    value: '首页图片管理',
                    title: '首页图片管理'
                },
                {
                    value: '右侧链接管理',
                    title: '右侧链接管理'
                },
                {
                    value: '友情链接管理',
                    title: '友情链接管理'
                },
                {
                    value: '首长直通邮箱管理',
                    title: '首长直通邮箱管理'
                },
                {
                    value: '部门架构管理',
                    title: '部门架构管理'
                },
                {
                    value: '管理员管理',
                    title: '管理员管理'
                },
                {
                    value: '权限组管理',
                    title: '权限组管理'
                },
                {
                    value: '系统参数管理',
                    title: '系统参数管理'
                }
            ],
            data: {
                authmodule: []
            },
            formData: {
                id: '',
                // createrid: undefined,
                authgroup: undefined,
                authmodule: undefined
            },
            rules: {
                createrid: [
                    {
                        required: true,
                        message: '请选择信息员',
                        trigger: 'change'
                    }
                ],
                authgroup: [
                    {
                        required: true,
                        message: '请输入单行文本权限组',
                        trigger: 'blur'
                    }
                ],
                authmodule: [
                    {
                        required: true,
                        message: '请输入权限模块',
                        trigger: 'blur'
                    }
                ]
            },
            createridOptions: []
        };
    },
    computed: {},
    watch: {
        'data.authmodule'({ checked }) {
            console.log(checked);
            if (checked) {
                this.formData.authmodule = checked.join(',');
            }
            // this.formData.authmodule = nv.join(',');
        }
    },
    created() {
        // this.getCreater(); //获取用户
        this.getModule();
    },
    mounted() {},
    methods: {
        //获取最大的父节点
        getParent(allList) {
            let list = [];
            allList.forEach((obj, idx) => {
                // delete obj.children;
                if (!obj.parent) {
                    obj.value = `auth-${obj.name}`;
                    obj.title = obj.name;
                    obj.children = this.getTree(obj.id, allList);
                    list.push(obj);
                }
            });
            return list;
        },
        //获取部门的树形数据
        getTree(pid, list) {
            const that = this;
            //let list = this.settings.treeDdDept;
            // console.log('进入了--------------');
            //app.tosort(list,"headerSort",true);
            let treeList = [];
            for (let i = 0; i < list.length; i++) {
                // delete list[i].children;
                if (list[i].parent === pid) {
                    list[i].value = `auth-${list[i].name}`;
                    list[i].title = list[i].name;
                    let cc = that.getTree(list[i].id, list);
                    if (cc.length > 0) {
                        list[i].children = cc; //子部门
                    }
                    treeList.push(list[i]);
                }
            }
            return treeList;
        },
        /**
         * 获取用户列表
         */
        getCreater() {
            creater
                .list({ page: 1, limit: 10000 })
                .then(res => {
                    this.createridOptions = res.data;
                })
                .catch(err => {});
        },
        /**
         * 获取栏目列表
         */
        getModule() {
            module
                .list({ page: 1, limit: 1000000 })
                .then(res => {
                    console.log('栏目是-----------', res);
                    this.options = this.options.map(j => {
                        let obj = { ...j };
                        if (obj.type === 1) obj.children = this.getParent(res.data);
                        return obj;
                    });
                })
                .catch(err => {});
        },
        clearForm() {
            //清空表单
            this.formData.id = '';
            this.formData.createrid = '';
            this.formData.authgroup = '';
            this.formData.authmodule = '';
        },
        setForm(date) {
            //赋值表单
            this.formData.id = date.id;
            this.formData.createrid = date.createrid;
            this.formData.authgroup = date.authgroup;
            this.formData.authmodule = date.authmodule;
            if (date.authmodule) {
                this.data.authmodule = date.authmodule.split(',');
            }
        },
        submitForm() {
            this.$refs['elForm'].validate(valid => {
                if (!valid) return;
                // TODO 提交表单

                console.log(this.formData);
                this.loading = true;
                if (this.type === 1) {
                    //添加表单
                    main.add(this.formData)
                        .then(res => {
                            this.close();
                            this.loading = false;
                        })
                        .catch(err => {
                            this.loading = false;
                            this.$message.error(err);
                        });
                } else if (this.type === 2) {
                    main.edit(this.formData)
                        .then(res => {
                            this.close();
                            this.loading = false;
                        })
                        .catch(err => {
                            this.loading = false;
                            this.$message.error(err);
                        });
                }
            });
        },
        resetForm() {
            this.$refs['elForm'].resetFields();
        }
    }
};
</script>
<style></style>
