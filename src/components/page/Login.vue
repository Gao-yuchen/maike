<template>
    <div class="login-wrap">
        <div class="ms-login" >
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="name">
                    <el-input v-model="param.name" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                
            </el-form>
        </div>
    </div>
</template>

<script>
import {logincheck} from "../../api/index"
export default {
    data: function() {
        return {
            param: {
                name: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            logincheck(this.param).then(returndata=>{
                if(returndata.code=="200"){

                    localStorage.setItem("token",returndata.info.token)
                    setTimeout(function(){ 
                        localStorage.removeItem("token")
                     }, 86400000);
                    this.$refs.login.validate(valid => {
                    // console.log(valid)
                    if (valid) {
                        this.$message.success('登录成功');
                        localStorage.setItem('ms_username', this.param.name);
                        this.$router.push('/');
                } 
            });
                }else {
                    this.$message.error('账号名密码错误');
                    console.log('error submit!!');
                    
                }
            }) 
            
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/loginbg.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.el-button{
    font-size: 20px;
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
    background: rgba(42, 65, 75, 0.6) ;
    background-size:100% 100% ;
    
    
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