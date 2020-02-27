<template>
    <div>
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="formData.title" placeholder="请输入标题" clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="creatername">
                <el-input v-model="formData.creatername" placeholder="请输入作者" clearable :style="{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item label="信息员" prop="createrid">
                <el-select v-model="formData.createrid" placeholder="请选择信息员" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in createridOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属模块" prop="module">
                <el-select v-model="formData.module" placeholder="请选择所属模块" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in moduleOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属编队" prop="teamid">
                <el-select v-model="formData.teamid" placeholder="请选择所属编队" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in teamidOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间" prop="createtime">
                <el-date-picker type="datetime" v-model="formData.createtime" format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" placeholder="请选择创建时间"
                                clearable>
                </el-date-picker>
            </el-form-item>
            <el-form-item label="发布时间" prop="publishtime">
                <el-date-picker type="datetime" v-model="formData.publishtime" format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" placeholder="请选择发布时间"
                                clearable>
                </el-date-picker>
            </el-form-item>
            <el-form-item label="详情地址" prop="weburl">
                <el-input v-model="formData.weburl" placeholder="请输入详情地址" clearable :style="{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item label="梗要预览" prop="substract">
                <el-input v-model="formData.substract" type="textarea" placeholder="请输入梗要预览" show-word-limit
                          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="文章图片" prop="picture" required>
                <el-upload ref="picture" :file-list="picturefileList" :action="pictureAction"
                           :before-upload="pictureBeforeUpload" list-type="picture-card">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传不超过 2MB 的文件</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <el-input v-model="formData.content" placeholder="请输入文章内容" clearable :style="{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="valid" required>
                <el-switch v-model="formData.valid" :active-value='1' :inactive-value='0'></el-switch>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import main from '@/api/artist';

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
                    id:'',
                    title: undefined,
                    creatername: undefined,
                    createrid: undefined,
                    module: undefined,
                    teamid: undefined,
                    createtime: null,
                    publishtime: null,
                    weburl: undefined,
                    substract: '',
                    picture: null,
                    content: undefined,
                    valid: 1
                },
                rules: {
                    title: [{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }],
                    creatername: [{
                        required: true,
                        message: '请输入作者',
                        trigger: 'blur'
                    }],
                    createrid: [{
                        required: true,
                        message: '请选择信息员',
                        trigger: 'change'
                    }],
                    module: [{
                        required: true,
                        message: '请选择所属模块',
                        trigger: 'change'
                    }],
                    teamid: [{
                        required: true,
                        message: '请选择所属编队',
                        trigger: 'change'
                    }],
                    createtime: [{
                        required: true,
                        message: '请选择创建时间',
                        trigger: 'change'
                    }],
                    publishtime: [{
                        required: true,
                        message: '请选择发布时间',
                        trigger: 'change'
                    }],
                    weburl: [{
                        required: true,
                        message: '请输入详情地址',
                        trigger: 'blur'
                    }],
                    substract: [{
                        required: true,
                        message: '请输入梗要预览',
                        trigger: 'blur'
                    }],
                    content: [{
                        required: true,
                        message: '请输入文章内容',
                        trigger: 'blur'
                    }]
                },
                pictureAction: 'https://jsonplaceholder.typicode.com/posts/',
                picturefileList: [],
                createridOptions: [{
                    'label': '选项一',
                    'value': 1
                }, {
                    'label': '选项二',
                    'value': 2
                }],
                moduleOptions: [{
                    'label': '选项一',
                    'value': 1
                }, {
                    'label': '选项二',
                    'value': 2
                }],
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
                this.formData.title = '';
                this.formData.creatername = '';
                this.formData.createrid = '';
                this.formData.module = '';
                this.formData.teamid = '';
                this.formData.createtime = '';
                this.formData.publishtime = '';
                this.formData.weburl = '';
                this.formData.substract = '';
                this.formData.picture = '';
                this.formData.content = '';
                this.formData.valid = 1;
            },
            setForm(date) {//赋值表单
                this.formData.id = date.id;
                this.formData.title = date.title;
                this.formData.creatername = date.creatername;
                this.formData.createrid = date.createrid;
                this.formData.module = date.module;
                this.formData.teamid = date.teamid;
                this.formData.createtime = date.createtime;
                this.formData.publishtime = date.publishtime;
                this.formData.weburl = date.weburl;
                this.formData.substract = date.substract;
                this.formData.picture = date.picture;
                this.formData.content = date.content;
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
            },
            pictureBeforeUpload(file) {
                let isRightSize = file.size / 1024 / 1024 < 2;
                if (!isRightSize) {
                    this.$message.error('文件大小超过 2MB');
                }
                return isRightSize;
            }
        }
    };

</script>
<style>
    .el-upload__tip {
        line-height: 1.2;
    }

</style>
