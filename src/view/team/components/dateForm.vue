<template>
    <div>
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="formData.name" placeholder="请输入名称" clearable :style="{ width: '100%' }"></el-input>
            </el-form-item>
            <el-form-item label="级别" prop="level">
                <el-select v-model="formData.level" placeholder="请选择级别" clearable :style="{ width: '100%' }">
                    <el-option
                        v-for="(item, index) in levelOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="formData.level !== 1 && formData.level" label="上级" prop="parent">
                <!--                <template v-if = "formData.level===2">-->
                <el-select v-model="formData.parent" placeholder="请选择上级" clearable :style="{ width: '100%' }">
                    <el-option
                        v-for="(item, index) in parentList"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                        :disabled="item.disabled"
                    ></el-option>
                </el-select>
                <!--                </template>-->
                <!--                <template v-if = "formData.level===3">-->
                <!--                    <el-select v-model = "formData.parent" placeholder = "请选择上级" clearable :style = "{width: '100%'}">-->
                <!--                        <el-option v-for = "(item, index) in parentList" :key = "index" :label = "item.name"-->
                <!--                                :value = "item.id" :disabled = "item.disabled"></el-option>-->
                <!--                    </el-select>-->
                <!--                </template>-->
            </el-form-item>
            <el-form-item size="large">
                <el-button :loading="loading" type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import main from '@/api/team';

export default {
    components: {},
    props: {
        type: Number,
        close: Function
    },
    data() {
        return {
            setting: {
                parent: []
            },
            parentTeam: [],
            loading: false,
            formData: {
                id: '',
                name: '',
                level: '',
                parent: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入名称',
                        trigger: 'blur'
                    }
                ],
                level: [
                    {
                        required: true,
                        message: '请选择级别',
                        trigger: 'change'
                    }
                ],
                parent: [
                    {
                        required: true,
                        message: '请选择上级',
                        trigger: 'change'
                    }
                ]
            },
            levelOptions: [
                {
                    label: '一级',
                    value: 1
                },
                {
                    label: '二级',
                    value: 2
                },
                {
                    label: '三级',
                    value: 3
                }
            ],
            parentOptions: [
                {
                    label: '选项一',
                    value: 1
                },
                {
                    label: '选项二',
                    value: 2
                }
            ]
        };
    },
    computed: {
        parentList() {
            if (this.formData.level === 2) {
                return this.parentTeam;
            } else if (this.formData.level === 3) {
                return this.parentTeam.filter(item => item.level === 2);
            }

            return [];
        }
    },
    watch: {
        'formData.level'(nv, ov) {
            if (this.type === 1) {
                this.formData.parent = '';
                this.setting.parent = [];
            }
        },
        'setting.parent'(nv, ov) {
            if (nv.length > 0) {
                this.formData.parent = nv[1];
            } else {
                this.formData.parent = '';
            }
        }
    },
    created() {
        let list = this.parentTeam;
        console.log('-=------部门信息---------------', list);
    },
    mounted() {},
    methods: {
        setParent(data) {
            console.log('赋值-----', data);
            this.parentTeam = data;
        },
        //获取最大的父节点
        getParent(allList) {
            let list = [];
            allList.forEach((obj, idx) => {
                delete obj.children;
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
                if (list[i].parent === pid && list[i].level === 1) {
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
        clearForm() {
            //清空表单
            this.formData.id = '';
            this.formData.name = '';
            this.formData.level = '';
            this.formData.parent = '';
        },
        setForm(date) {
            //赋值表单
            this.formData.id = date.id;
            this.formData.name = date.name;
            this.formData.level = date.level;
            this.formData.parent = date.parent;
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
