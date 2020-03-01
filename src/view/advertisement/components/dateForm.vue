<template>
    <div>
        <el-form ref = "elForm" :model = "formData" :rules = "rules" size = "mini" label-width = "100px">
            <el-form-item label = "广告图" prop = "picture" required>
                <el-upload
                        ref = "pic"
                        :file-list = "picfileList"
                        :action = "picAction"
                        :show-file-list="false"
                        :before-upload = "picBeforeUpload"
                        :on-success = "UploadSuccess"
                >
                    <el-button  type = "primary">
                        {{formData.picture?'修改图片':'点击上传图片'}}
                    </el-button>
                </el-upload>

                <el-image style="width: 100%;height: 100px;" fit="contain" v-if = "formData.picture" :src = "formData.picture" :preview-src-list="[formData.picture]" class = "avatar"></el-image>

            </el-form-item>
            <el-form-item label = "排序" prop = "orderNum">
                <el-input-number v-model = "formData.orderNum" placeholder = "排序值" step-strictly :precision = '1'>
                </el-input-number>
            </el-form-item>
            <el-form-item label = "位置" prop = "position">
                <el-input v-model = "formData.position" placeholder = "请输入位置" clearable :style = "{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item label = "文本说明" prop = "textinfo">
                <el-input v-model = "formData.textinfo" placeholder = "请输入文本说明" clearable :style = "{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item label = "广告地址" prop = "weburl">
                <el-input v-model = "formData.weburl" placeholder = "请输入广告地址" clearable :style = "{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item label = "有效" prop = "valid" required>
                <el-switch :active-value="1"
                           :inactive-value="0" v-model = "formData.valid"></el-switch>
            </el-form-item>
            <el-form-item size = "large">
                <el-button :loading = "loading" type = "primary" @click = "submitForm">提交</el-button>
                <el-button @click = "resetForm">重置</el-button>
            </el-form-item>















        </el-form>
        
        
        
    </div>
</template>
<script>
import main from '@/api/advertisement';
import api from '@/api/apiUrl/';


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
                picture: '',
                orderNum: '',
                position: '',
                textinfo: '',
                weburl: '',
                valid: false
            },
            rules: {
                orderNum: [{
                    required: true,
                    message: '排序值',
                    trigger: 'blur'
                }, {
                    pattern: /(^[\-0-9][0-9]*(.[0-9]+)?)$/,
                    message: '必须为数字',
                    trigger: 'blur'
                }],
                position: [{
                    required: true,
                    message: '请输入位置',
                    trigger: 'blur'
                }],
                textinfo: [{
                    required: true,
                    message: '请输入文本说明',
                    trigger: 'blur'
                }],
                weburl: [{
                    required: true,
                    message: '请输入广告地址',
                    trigger: 'blur'
                }]
            },
            picAction: api.setting.img,
            picfileList: []
        };
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
        lookPhoto(){

            this.$imagePreview({
                images:[this.formData.picture],
                index: 1,
            });
            // ImagePreview([
            //     'https://img.yzcdn.cn/1.jpg',
            //     'https://img.yzcdn.cn/2.jpg'
            // ]);
        },
        clearForm() {//清空表单
            this.formData.id = '';
            this.formData.picture = '';
            this.formData.orderNum = '';
            this.formData.position = '';
            this.formData.textinfo = '';
            this.formData.weburl = '';
            this.formData.valid = false;
        },
        setForm(date) {//赋值表单
            this.formData.id = date.id;
            this.formData.picture = date.picture;
            this.formData.orderNum = date.orderNum;
            this.formData.position = date.position;
            this.formData.textinfo = date.textinfo;
            this.formData.weburl = date.weburl;
            this.formData.valid = date.valid;
        },
        submitForm() {
            this.$refs['elForm'].validate(valid => {
                if (!valid) return;
                // TODO 提交表单
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
        picBeforeUpload(file) {//文件上传校验
            let isRightSize = file.size / 1024 / 1024 < 2;
            if (!isRightSize) {
                this.$message.error('文件大小超过 2MB');
            }
            let isAccept = new RegExp('image/*').test(file.type);
            if (!isAccept) {
                this.$message.error('应该选择image/*类型的文件');
            }
            return isRightSize && isAccept;
        },
        UploadSuccess(res, file, fileList) {//文件上传成功
            console.log(res);
            this.formData.picture = res.data.url;
        }
    }
};

</script>
<style>
    .el-upload__tip {
        line-height: 1.2;
    }
    
    /*.el-upload {*/
    /*    width: 100%;*/
    /*    height: 100px;*/
    /*}*/
    .el-upload--text{
        border: none;
        width: 100%;
        height: 100%;
        text-align: left;
    }
    .avatar-uploader-icon {
        font-size: 50px;
        line-height: 100px;
    }
</style>
