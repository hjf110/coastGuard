<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.account" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
import main from '@/api/creater';
import auth from '@/api/authority';

export default {
    data() {
        return {
            param: {
                account: '',
                password: ''
            },
            rules: {
                account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    // this.$message.success('登录成功');
                    Promise.all([main.login({ ...this.param }), auth.list({ page: 1, limit: 2000000 })])
                        .then(res => {
                            // console.log(res.data);
                            console.log(res);
                            let { data: userInfo } = res[0];
                            let { data: authInfo } = res[1];
                            let { authmodule } = authInfo.find(j => j.id == userInfo.power);
                            // console.log(power);
                            let power = authmodule.split(',');
                            let moudelP = power
                                .filter(j => j.indexOf('auth-') > -1)
                                .map(j => j.replace(/auth-/, ''))
                                .join('&');

                            let menuP = power.filter(j => !(j.indexOf('auth-') > -1));
                            if (moudelP) {
                                menuP.push('新闻管理');
                            }

                            console.log(menuP);
                            console.log(moudelP);
                            sessionStorage.setItem('menuP', menuP.join('&'));
                            sessionStorage.setItem('moudelP', moudelP);
                            sessionStorage.setItem('ms_userInfo', JSON.stringify(userInfo));
                            this.$router.push('/dashboard');
                        })
                        .catch(err => {
                            this.$message.error(err);
                        });

                    //
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
/* 进度条颜色 */
#nprogress .bar {
    /* //自定义颜色 */
    background: #409eff !important;
    height: 50px !important;
    opacity: 0.2 !important;
}

.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
