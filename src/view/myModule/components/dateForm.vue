<template>
    <div>
        <el-form ref="elForm" :model="formData" :rules="rules" size="mini" label-width="100px">
            <el-form-item label="模块名称" prop="name">
                <el-input v-model="formData.name" placeholder="请输入模块名称" clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="高度" prop="height">
                <el-input-number v-model="formData.height" placeholder="高度"></el-input-number>
            </el-form-item>
            <el-form-item label="宽度" prop="width">
                <el-input-number v-model="formData.width" placeholder="宽度"></el-input-number>
            </el-form-item>
            <el-form-item label="靠左靠右" prop="leftright">
                <el-input-number v-model="formData.leftright" placeholder="靠左靠右"></el-input-number>
            </el-form-item>
            <el-form-item label="第几排" prop="rowindex">
                <el-input-number v-model="formData.rowindex" placeholder="第几排"></el-input-number>
            </el-form-item>
            <el-form-item label="是否启用" prop="valid" required>
                <el-switch v-model="formData.valid"></el-switch>
            </el-form-item>
            <el-form-item size="large">
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
                formData: {
                    id: '',
                    name: undefined,
                    height: undefined,
                    width: undefined,
                    leftright: undefined,
                    rowindex: undefined,
                    valid: false
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入模块名称',
                        trigger: 'blur'
                    }],
                    height: [{
                        required: true,
                        message: '高度',
                        trigger: 'blur'
                    }, {
                        pattern: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
                        message: '必须为数字',
                        trigger: 'blur'
                    }],
                    width: [{
                        required: true,
                        message: '宽度',
                        trigger: 'blur'
                    }, {
                        pattern: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
                        message: '必须为数字',
                        trigger: 'blur'
                    }],
                    leftright: [{
                        required: true,
                        message: '靠左靠右',
                        trigger: 'blur'
                    }, {
                        pattern: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
                        message: '必须为数字',
                        trigger: 'blur'
                    }],
                    rowindex: [{
                        required: true,
                        message: '第几排',
                        trigger: 'blur'
                    }, {
                        pattern: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
                        message: '必须为数字',
                        trigger: 'blur'
                    }]
                }
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
                this.formData.height = '';
                this.formData.width = '';
                this.formData.leftright = '';
                this.formData.rowindex = '';
                this.formData.valid = false;
            },
            setForm(date) {//赋值表单
                this.formData.id = date.id;
                this.formData.name = date.name;
                this.formData.height = date.height;
                this.formData.width = date.width;
                this.formData.rowindex = date.rowindex;
                this.formData.valid = date.valid;
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
