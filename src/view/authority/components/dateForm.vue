<template>
    <div>
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-form-item label="信息员" prop="createrid">
                <el-select v-model="formData.createrid" placeholder="请选择信息员" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in createridOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="权限组" prop="authgroup">
                <el-input v-model="formData.authgroup" placeholder="请输入单行文本权限组" clearable :style="{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item label="权限模块" prop="authmodule">
                <el-input v-model="formData.authmodule" placeholder="请输入权限模块" clearable :style="{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item size="large">
                <el-button :loading="loading" type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import main from '@/api/authority';

    export default {
        components: {},
        props: {
            type: Number,
            close: Function
        },
        data() {
            return {
                loading: false,
                formData: {
                    id: '',
                    createrid: undefined,
                    authgroup: undefined,
                    authmodule: undefined
                },
                rules: {
                    createrid: [{
                        required: true,
                        message: '请选择信息员',
                        trigger: 'change'
                    }],
                    authgroup: [{
                        required: true,
                        message: '请输入单行文本权限组',
                        trigger: 'blur'
                    }],
                    authmodule: [{
                        required: true,
                        message: '请输入权限模块',
                        trigger: 'blur'
                    }]
                },
                createridOptions: [{
                    'label': '信息员1',
                    'value': 1
                }, {
                    'label': '信息员2',
                    'value': 2
                }]
            };
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {
            clearForm() {//清空表单
                this.formData.id = '';
                this.formData.createrid = '';
                this.formData.authgroup = '';
                this.formData.authmodule = '';
            },
            setForm(date) {//赋值表单
                this.formData.id = date.id;
                this.formData.createrid = date.createrid;
                this.formData.authgroup = date.authgroup;
                this.formData.authmodule = date.authmodule;
            },
            submitForm() {
                this.$refs['elForm'].validate(valid => {
                    if (!valid) return;
                    // TODO 提交表单

                    console.log(this.formData);
                    this.loading = true;
                    if (this.type === 1) {//添加表单
                        main.add(this.formData).then(res => {
                            this.close();
                            this.loading = false;
                        }).catch(err => {
                            this.loading = false;
                            this.$message.error(err);
                        });
                    } else if (this.type === 2) {
                        main.edit(this.formData).then(res => {
                            this.close();
                            this.loading = false;
                        }).catch(err => {
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
<style>
</style>
