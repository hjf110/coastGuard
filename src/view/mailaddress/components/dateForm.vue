<template>
    <div>
        <el-form ref="elForm" :model="formData" :rules="rules"  label-width="100px">
            <el-form-item label="邮件地址" prop="wordtext">
                <el-input v-model="formData.wordtext" placeholder="请输入邮件地址" clearable :style="{ width: '100%' }"> </el-input>
            </el-form-item>
            <el-form-item >
                <el-button :loading="loading" type="primary"  @click="submitForm">提交</el-button>
                <el-button  @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import main from '@/api/mailaddress';
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
                wordtext: ''
            },
            rules: {
                wordtext: [
                    {
                        required: true,
                        message: '请输入邮件地址',
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
            this.formData.wordtext = '';
        },
        setForm(date) {
            //赋值表单
            this.formData.id = date.id;
            this.formData.wordtext = date.wordtext;
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
