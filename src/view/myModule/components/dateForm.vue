<template>
    <div>
        <el-form ref="elForm" :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="模块名称" prop="name">
                <el-input v-model="formData.name" placeholder="请输入模块名称" clearable :style="{ width: '100%' }"></el-input>
            </el-form-item>
            <el-form-item label="父栏目" prop="parent">
                <el-cascader
                    style="width: 100%;"
                    placeholder="请选择部门"
                    v-model="data.modelList"
                    :options="settings.modelList"
                    :props="{ checkStrictly: true }"
                    clearable
                ></el-cascader>
            </el-form-item>

            <!-- <el-form-item label="高度" prop="height">
                <el-input-number v-model="formData.height" placeholder="高度"></el-input-number>
            </el-form-item>
            <el-form-item label="宽度" prop="width">
                <el-input-number v-model="formData.width" placeholder="宽度"></el-input-number>
            </el-form-item>-->
            <!-- <el-form-item label="靠左靠右" prop="leftright">
                <el-input-number v-model="formData.leftright" placeholder="靠左靠右"></el-input-number>
            </el-form-item>
            <el-form-item label="第几排" prop="rowindex">
                <el-input-number v-model="formData.rowindex" placeholder="第几排"></el-input-number>
            </el-form-item>-->
            <el-form-item label="是否启用" prop="valid">
                <el-switch :active-value="1" :inactive-value="0" v-model="formData.valid" />
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import main from '@/api/myModule';

export default {
    name: 'dateForm',
    components: {},
    props: {
        type: Number,
        close: Function
    },
    data() {
        return {
            loading: false,
            settings: {
                modelList: []
            },
            data: {
                modelList: []
            },
            formData: {
                id: '',
                name: undefined,
                // height: undefined,
                // width: undefined,
                // leftright: undefined,
                // rowindex: undefined,
                parent: undefined,
                valid: false
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入模块名称',
                        trigger: 'blur'
                    }
                ],
                height: [
                    {
                        required: true,
                        message: '高度',
                        trigger: 'blur'
                    },
                    {
                        pattern: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
                        message: '必须为数字',
                        trigger: 'blur'
                    }
                ],
                width: [
                    {
                        required: true,
                        message: '宽度',
                        trigger: 'blur'
                    },
                    {
                        pattern: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
                        message: '必须为数字',
                        trigger: 'blur'
                    }
                ],
                leftright: [
                    {
                        required: true,
                        message: '靠左靠右',
                        trigger: 'blur'
                    },
                    {
                        pattern: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
                        message: '必须为数字',
                        trigger: 'blur'
                    }
                ],
                rowindex: [
                    {
                        required: true,
                        message: '第几排',
                        trigger: 'blur'
                    },
                    {
                        pattern: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
                        message: '必须为数字',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.getModel();
    },
    methods: {
        //获取最大的父节点
        getParent(allList) {
            let list = [];
            allList.forEach((obj, idx) => {
                // delete obj.children;
                if (!obj.parent) {
                    obj.value = obj.id;
                    obj.label = obj.name;
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
                    list[i].value = list[i].id;
                    list[i].label = list[i].name;
                    let cc = that.getTree(list[i].id, list);
                    if (cc.length > 0) {
                        list[i].children = cc; //子部门
                    }
                    treeList.push(list[i]);
                }
            }
            return treeList;
        },
        getModel() {
            main.list({ page: 1, limit: 10000 })
                .then(res => {
                    let newList = this.getParent(res.data);
                    this.settings.modelList = newList;
                    // console.log('栏目树形结构--------------', newList);
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        clearForm() {
            //清空表单
            for (var key in this.formData) {
                if (this.formData.hasOwnProperty(key)) {
                    this.formData[key] = undefined;
                }
            }
            this.formData.valid = true;
        },
        setForm(data) {
            //赋值表单
            for (var key in this.formData) {
                if (this.formData.hasOwnProperty(key)) {
                    this.formData[key] = data[key];
                }
            }

            this.data.modelList = data.parentIds
                .split(',')
                .filter(j => j)
                .map(j => parseInt(j));
        },
        submitForm() {
            this.$refs['elForm'].validate(valid => {
                if (!valid) return;
                // TODO 提交表单
                console.log(this.formData);
                console.log(this.data.modelList);
                let formData = { ...this.formData };
                // debugger;
                formData.parent = this.data.modelList[this.data.modelList.length - 1];
                console.log(formData.parent);
                this.loading = true;
                if (this.type === 1) {
                    //添加表单
                    main.add(formData)
                        .then(res => {
                            this.close();
                            this.loading = false;
                        })
                        .catch(err => {
                            this.loading = false;
                            this.$message.error(err);
                        });
                } else if (this.type === 2) {
                    main.edit(formData)
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
