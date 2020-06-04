<template>
    <div>
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入姓名" clearable :style="{ width: '100%' }"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input v-model="formData.account" placeholder="请输入账号" clearable :style="{ width: '100%' }"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    v-model="formData.password"
                    placeholder="请输入密码"
                    clearable
                    show-password
                    :style="{ width: '100%' }"
                ></el-input>
            </el-form-item>
            <el-form-item label="所属部门" prop="teamid">
                <el-cascader
                    style="width: 100%;"
                    placeholder="请选择部门"
                    v-model="teamList"
                    :options="teamidOptions"
                    :props="{ checkStrictly: true }"
                    clearable
                ></el-cascader>

                <!--                <el-select v-model="formData.teamid" placeholder="请选择所属team" clearable :style="{width: '100%'}">-->
                <!--                    <el-option v-for="(item, index) in teamidOptions" :key="index" :label="item.label"-->
                <!--                               :value="item.value" :disabled="item.disabled"></el-option>-->
                <!--                </el-select>-->
            </el-form-item>
            <el-form-item label="权限角色">
                <el-select :style="{ width: '100%' }" v-model="formData.power" placeholder="请选择">
                    <el-option v-for="(item, index) in authList" :key="index" :label="item.authgroup" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="large">
                <el-button :loading="loading" type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
//接口
import main from '@/api/creater';
import auth from '@/api/authority';
import team from '@/api/team';

export default {
    components: {},
    props: {
        type: Number,
        close: Function,
        teamidOptions: Array
    },
    data() {
        return {
            loading: false,
            teamList: [],
            authList: [],
            formData: {
                id: '',
                name: undefined,
                account: undefined,
                password: undefined,
                teamid: undefined,
                power: undefined
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }
                ],
                account: [
                    {
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ],
                teamid: [
                    {
                        required: true,
                        message: '请选择所属部门',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    computed: {},
    watch: {
        teamList(nv, ov) {
            this.formData.teamid = nv[nv.length - 1];
        }
    },
    created() {
        // this.getTeam();//获取部门
        this.getAuth();
    },
    mounted() {},
    methods: {
        getAuth() {
            auth.list({ page: 1, limit: 1000000 })
                .then(res => {
                    console.log('权限是-------', res.data);
                    this.authList = res.data;
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        clearForm() {
            //清空表单
            this.formData.id = '';
            this.formData.name = '';
            this.formData.account = '';
            this.formData.password = '';
            this.formData.teamid = '';
            this.teamList = [];
        },
        setForm(date) {
            //赋值表单
            for (const key in this.formData) {
                if (this.formData.hasOwnProperty(key)) {
                    this.formData[key] = date[key];
                }
            }

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
