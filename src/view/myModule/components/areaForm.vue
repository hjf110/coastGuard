<template>
    <div>
        <el-form ref="elForm" :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="显示区域" prop="name">
                <el-select :style="{ width: '100%' }" v-model="formData.areaNo" placeholder="请选择">
                    <el-option v-for="(item, index) in settings.areaNo" :key="index" :label="item.n" :value="item.v"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="formData.name" placeholder="请输入" clearable :style="{ width: '100%' }"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="name">
                <el-radio-group v-model="formData.isShow">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序编号" prop="name">
                <el-input-number
                    :style="{ width: '100%' }"
                    v-model="formData.sort"
                    placeholder="请输入"
                    controls-position="right"
                ></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import main from '@/api/area';

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
                areaNo: [
                    { n: '首页显示区域', v: 1 },
                    { n: '显示区域一', v: 2 },
                    { n: '显示区域二', v: 3 },
                    { n: '显示区域三', v: 4 },
                    { n: '显示区域四', v: 5 },
                    { n: '显示区域五', v: 6 }
                ]
            },
            data: {
                modelList: []
            },
            formData: {
                id: undefined,
                areaNo: undefined, //区域
                isShow: undefined, //是否显示
                moduleId: undefined, //模块id
                name: undefined, //名称
                sort: undefined //排序
            },
            rules: {
                areaNo: [
                    {
                        required: true,
                        message: '必填',
                        trigger: 'blur'
                    }
                ],
                isShow: [
                    {
                        required: true,
                        message: '必填',
                        trigger: 'blur'
                    }
                ],
                moduleId: [
                    {
                        required: true,
                        message: '必填',
                        trigger: 'blur'
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '必填',
                        trigger: 'blur'
                    }
                ],
                sort: [
                    {
                        required: true,
                        message: '必填',
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
        // this.getModel();
    },
    methods: {
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
        },
        submitForm() {
            this.$refs['elForm'].validate(valid => {
                if (!valid) return;
                // TODO 提交表单
                console.log(this.formData);
                console.log(this.data.modelList);
                let formData = { ...this.formData };
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
