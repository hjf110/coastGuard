<template>
    <div>
        <el-form ref = "elForm" :model = "formData" :rules = "rules" size = "medium" label-width = "100px">
            <el-form-item label-width = "150px" label = "名称" prop = "name">
                <el-input v-model = "formData.name" placeholder = "请输入名称" clearable :style = "{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label-width = "150px" label = "跳转地址" prop = "url">
                <el-input v-model = "formData.url" placeholder = "请输入跳转地址" clearable :style = "{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label-width = "150px" label = "上级名称" prop = "parent">
                <el-select v-model = "formData.parent" placeholder = "请选择上级名称" clearable :style = "{width: '100%'}">
                    <el-option v-for = "(item, index) in parentOptions" :key = "index" :label = "item.label"
                            :value = "item.value" :disabled = "item.disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size = "large">
                <el-button :loading = "loading" type = "primary" @click = "submitForm">提交</el-button>
                <el-button @click = "resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import main from '@/api/friendlyurl';

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
                name: undefined,
                url: undefined,
                parent: undefined
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入名称',
                    trigger: 'blur'
                }],
                url: [{
                    required: true,
                    message: '请输入跳转地址',
                    trigger: 'blur'
                }],
                parent: [{
                    required: true,
                    message: '请选择上级总队的友情链接',
                    trigger: 'change'
                }]
            },
            parentOptions: [
                {
                    'label': '海警总队',
                    'value': 1
                },
                {
                    'label': '机动总队',
                    'value': 2
                },
                {
                    'label': '属地支队',
                    'value': 3
                },
                {
                    'label': '武警支队',
                    'value': 4
                },
                {
                    'label': '解放军部队',
                    'value': 5
                },
            ]
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
            this.formData.url = '';
            this.formData.parent = '';
        },
        setForm(date) {//赋值表单
            this.formData.id = date.id;
            this.formData.name = date.name;
            this.formData.url = date.url;
            this.formData.parent = date.parent;
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
