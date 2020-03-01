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
            <!--            <el-form-item label="信息员" prop="createrid">-->
            <!--                <el-select v-model="formData.createrid" placeholder="请选择信息员" clearable :style="{width: '100%'}">-->
            <!--                    <el-option v-for="(item, index) in createridOptions" :key="index" :label="item.label"-->
            <!--                               :value="item.value" :disabled="item.disabled"></el-option>-->
            <!--                </el-select>-->
            <!--            </el-form-item>-->
            <el-form-item label="所属栏目" prop="module">
                <el-select v-model="formData.module" placeholder="请选择所属栏目" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in moduleOptions" :key="index" :label="item.name"
                               :value="item.id" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属部门" prop="teamid">
                <!--                <el-select v-model="formData.teamid" placeholder="请选择所属部门" clearable :style="{width: '100%'}">-->
                <!--                    <el-option v-for="(item, index) in teamidOptions" :key="index" :label="item.label"-->
                <!--                               :value="item.value" :disabled="item.disabled"></el-option>-->
                <!--                </el-select>-->
                <el-cascader
                        style="width: 100%;"
                        placeholder="请选择部门"
                        v-model="teamList"
                        :options="teamidOptions"
                        :props="{ checkStrictly: true }"
                        clearable></el-cascader>
            </el-form-item>
            <!--            <el-form-item label="创建时间" prop="createtime">-->
            <!--                <el-date-picker type="datetime" v-model="formData.createtime" format="yyyy-MM-dd HH:mm:ss"-->
            <!--                                value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" placeholder="请选择创建时间"-->
            <!--                                clearable>-->
            <!--                </el-date-picker>-->
            <!--            </el-form-item>-->
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
                <el-upload
                        ref="pic"
                        :file-list="picturefileList"
                        :action="pictureAction"
                        :show-file-list="false"
                        :before-upload="pictureBeforeUpload"
                        :on-success="UploadSuccess"
                >
                    <el-button type="primary">
                        {{formData.picture?'修改图片':'点击上传图片'}}
                    </el-button>
                </el-upload>

                <el-image style="width: 100%;height: 100px;" fit="contain" v-if="formData.picture"
                          :src="formData.picture" :preview-src-list="[formData.picture]" class="avatar"></el-image>

            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <el-button type="primary" @click="pop.content=true">
                    {{formData.content?'修改文章内容':'添加文章内容'}}
                </el-button>
            </el-form-item>
            <el-form-item label="是否启用" prop="valid" required>
                <el-switch v-model="formData.valid" :active-value='1' :inactive-value='0'></el-switch>
            </el-form-item>


            <el-form-item size="large">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>


            <el-dialog
                    title="编辑文章"
                    :visible.sync="pop.content"
                    :modal="false"
                    :close-on-press-escape="false"
                    fullscreen
            >


                <quill-editor
                        ref="myTextEditor"
                        v-model="formData.content"
                        :options="editorOption"
                ></quill-editor>
                <el-upload
                        v-show="false"
                        ref="pic"
                        :file-list="picturefileList"
                        :action="pictureAction"
                        :show-file-list="false"
                        :before-upload="pictureBeforeUpload"
                        :on-success="UploadSuccess2"
                >
                    <el-button class="editUpload" type="primary">
                        编辑器图片上传
                    </el-button>
                </el-upload>



            </el-dialog>


        </el-form>
    </div>
</template>
<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import main from '@/api/artist';
    import api from '@/api/apiUrl/';


    // 工具栏配置
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ];



    export default {
        name: 'dateForm',
        components: {
            quillEditor
        },
        props: {
            type: Number,
            close: Function,
            teamidOptions: Array,//部门下拉
            moduleOptions: Array//栏目下拉

        },
        data() {
            return {
                editorOption: {
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        // alert('自定义图片')
                                        document.querySelector('.editUpload').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                },
                pop: {
                    content: false
                },
                loading: false,
                teamList: [],
                formData: {
                    id: '',
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
                    // createrid: [{
                    //     required: true,
                    //     message: '请选择信息员',
                    //     trigger: 'change'
                    // }],
                    module: [{
                        required: true,
                        message: '请选择所属栏目',
                        trigger: 'change'
                    }],
                    teamid: [{
                        required: true,
                        message: '请选择所属部门',
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
                pictureAction: api.setting.img,
                picturefileList: [],
                createridOptions: [{
                    'label': '选项一',
                    'value': 1
                }, {
                    'label': '选项二',
                    'value': 2
                }]
                // moduleOptions: [{
                //     'label': '选项一',
                //     'value': 1
                // }, {
                //     'label': '选项二',
                //     'value': 2
                // }],
                // teamidOptions: [{
                //     'label': '选项一',
                //     'value': 1
                // }, {
                //     'label': '选项二',
                //     'value': 2
                // }]
            };
        },
        computed: {},
        watch: {
            teamList(nv, ov) {
                this.formData.teamid = nv[nv.length - 1];
            }
        },
        created() {

        },
        mounted() {
        },
        methods: {
            clearForm() {//清空(初始化)表单
                this.formData.id = '';
                this.formData.title = '';
                this.formData.creatername = '';
                this.formData.createrid = '';
                this.formData.module = '';
                this.formData.teamid = '';
                this.formData.createtime = '';
                this.formData.publishtime = this.$ValidateUtil.getTime();
                this.formData.weburl = '';
                this.formData.substract = '';
                this.formData.picture = '';
                this.formData.content = '';
                this.formData.valid = 1;
                this.teamList = [];
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


                //选择的部门显示
                let list = this.teamidOptions;
                for (let i = 0; i < this.teamidOptions.length; i++) {
                    if (date.teamid === list[i].value) {
                        this.teamList = [date.teamid];
                        return false;
                    }
                    if (list[i].children) {
                        if (list[i].children.length > 0) {
                            let list2 = list[i].children;
                            for (let j = 0; j < list2.length; j++) {
                                if (date.teamid === list2[j].value) {
                                    this.teamList = [list[i].value, date.teamid];
                                    return false;
                                }

                                if (list2[j].children) {
                                    if (list2[j].children.length > 0) {
                                        let list3 = list2[j].children;
                                        for (let k = 0; k < list3.length; k++) {
                                            if (date.teamid === list3[k].value) {
                                                this.teamList = [list[i].value, list2[j].value, date.teamid];
                                                return false;
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                }


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
            },
            UploadSuccess(res, file, fileList) {//文件上传成功
                console.log(res);
                this.formData.picture = res.data.url;
            } ,
            UploadSuccess2(res, file, fileList) {//文件上传成功
                console.log(res);
                // this.formData.picture = res.data.url;
                // 获取富文本组件实例
                let quill = this.$refs.myTextEditor.quill;
                // 如果上传成功
                if (res.data.url) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片，res为服务器返回的图片链接地址
                    quill.insertEmbed(length, 'image', res.data.url);
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    // 提示信息，需引入Message
                    this.$message.error('图片插入失败')
                }
            }
        }
    };

</script>
<style>
    .el-upload__tip {
        line-height: 1.2;
    }

    .el-upload--text {
        border: none;
        width: 100%;
        height: 100%;
        text-align: left;
    }
</style>
