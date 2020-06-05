<template>
    <div>
        <el-form ref="elForm" :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="配置项" prop="key">
                <el-input
                    v-model="formData.key"
                    placeholder="请输入配置项"
                    clearable
                    :style="{ width: '100%' }"
                ></el-input>
            </el-form-item>
            <el-form-item label="值" prop="value">
                <el-input
                    v-model="formData.value"
                    placeholder="请输入值"
                    clearable
                    :style="{ width: '100%' }"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import main from '@/api/utilparam';
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
                key: '',
                value: ''
            },
            rules: {
                key: [
                    {
                        required: true,
                        message: '请输入配置项',
                        trigger: 'blur'
                    }
                ],
                value: [
                    {
                        required: true,
                        message: '请输入值',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        clearForm() {
            //清空表单
            this.formData.id = '';
            this.formData.key = '';
            this.formData.value = '';
        },
        setForm(date) {
            //赋值表单
            this.formData.id = date.id;
            this.formData.key = date.key;
            this.formData.value = date.value;
        },
        submitForm() {
            this.$refs['elForm'].validate(valid => {
                if (!valid) return;
                // TODO 提交表单

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
