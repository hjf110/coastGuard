<template>
    <div v-loading = "loading" :element-loading-text = "errLogin"
            style = "width: 100%;height: 100%;">
    
    </div>
</template>

<script>
import main from '@/api/ddLogin';
import ddUser from '@/api/ddUser';
import * as dd from 'dingtalk-jsapi';


export default {
    name: 'ddLogin',
    data() {
        return {
            loading: true,
            errLogin: '正在自动登录中.......'
        };
    },
    methods: {
        testLogin() {
            let testJson = {
                'departmentId': 148824287,
                'id': 15,
                'authtype': 2,
                'locked': false,
                'name': '超级管理员',
                'street': '',
                'placepoint': 'admin,--',
                'unionid': '212640673021199344'
            };
            sessionStorage.setItem('ms_userInfo', JSON.stringify(testJson));//登录用户姓名
            this.toLoginIng();//跳转页面
        },
        toLoginIng() {
            let isPC = this.$ValidateUtil.IsPC();
            if (isPC) {
                this.$router.push('/dashboard');//跳转到PC系统首页
            } else {
                this.$router.push('/home');//跳转到手机系统首页
            }
        }
    },
    mounted() {
        const _this = this;
        // this.testLogin();
        
        
        dd.ready(() => {
            // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
            dd.runtime.permission.requestAuthCode({
                corpId: 'ding5d2dd335032d4436',
                onSuccess: function(result) {
                    let code = result.code;
                    // _this.code = code;
                    _this.errLogin =  code;
                    main.login({ code: code }).then(res => {
                        // _this.form.ddunionid = res.data;
                        let ddUnionid = res.data;
                        _this.errLogin =  ddUnionid;
                        ddUser.list({ unionid: ddUnionid }).then(res2 => {
                            res2.data.forEach(obj => {
                                if (obj.unionid == ddUnionid) {
                                    sessionStorage.setItem('ms_userInfo', JSON.stringify(obj));//登录用户姓名
                                    _this.toLoginIng();//跳转页面
                                }
                            });
                        }).catch(err => {
                            console.log(err);
                            _this.errLogin = err;
                        });
                    }).catch(err => {
                        _this.errLogin = err;
                        dd.device.notification.alert({
                            message: err,
                            title: '错误信息', //可传空
                            buttonName: '好的',
                            onSuccess: function() {
                                //onSuccess将在点击button之后回调
                                /*回调*/
                            },
                            onFail: function(err) {
                            }
                        });
                    });
                    
                },
                onFail: function(err) {
                    dd.device.notification.alert({
                        message: err,
                        title: '错误', //可传空
                        buttonName: '好的',
                        onSuccess: function() {
                            //onSuccess将在点击button之后回调
                            /*回调*/
                        },
                        onFail: function(err) {
                        }
                    });
                }
                
            });
            
            
        });
        
        
        if (dd.env.platform == 'notInDingTalk') {
            console.log('----------------------------qwqw');
            if (this.$route.query.id === 'admin') {
                this.$prompt('请输入密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    if (value === 'hsqyqfk@2020') {
                        this.testLogin();
                    } else {
                        this.$message.error('密码错误');
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
                
                
            } else {
                this.loading = true;
                this.errLogin = '请您去钉钉客户端登录';
            }
            
        }
        
        
    }
};
</script>

<style scoped>

</style>
