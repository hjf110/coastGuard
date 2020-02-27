<template>
    <div>
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入姓名" clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input v-model="formData.account" placeholder="请输入账号" clearable :style="{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" placeholder="请输入密码" clearable show-password
                          :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="所属team" prop="teamid">
                <el-select v-model="formData.teamid" placeholder="请选择所属team" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in teamidOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="large">
                <el-button :loading="loading"  type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import main from '@/api/creater';

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
                    name: undefined,
                    account: undefined,
                    password: undefined,
                    teamid: undefined
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    account: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                    teamid: [{
                        required: true,
                        message: '请选择所属team',
                        trigger: 'change'
                    }]
                },
                teamidOptions: [{
                    'label': '选项一',
                    'value': 1
                }, {
                    'label': '选项二',
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
                this.formData.name = '';
                this.formData.account = '';
                this.formData.password = '';
                this.formData.teamid = '';
            },
            setForm(date) {//赋值表单
                this.formData.id = date.id;
                this.formData.name = date.name;
                this.formData.account = date.account;
                this.formData.password = date.password;
                this.formData.teamid = date.teamid;
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
