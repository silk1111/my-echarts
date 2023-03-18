<template>
    <div
     class="login-wrapper"
     >
     <div class="login-theme">
      <ChangeTheme></ChangeTheme>

     </div>
        <el-form  class="login-form" :model="loginFormValue"  :rules="rules" ref="loginForm">
          <el-form-item class="login-form-item" label="账号" prop="username" >
            <el-input  v-model="loginFormValue.username"/>
          </el-form-item>
          <el-form-item  class="login-form-item" label="密码"  prop="pass" >
            <el-input type="password" v-model="loginFormValue.pass" />
          </el-form-item>
        
          <el-form-item>
            <el-button type="primary" @click = "login()" class="login-button">
            登录
              
              </el-button>
          </el-form-item>
        </el-form>

    </div>
</template>

<script>
/* eslint-disable */
import { ref,reactive } from 'vue'
import { useStore,mapState } from 'vuex' // 引入useStore 方法
import {useRouter} from 'vue-router'
import ChangeTheme from './ChangeTheme.vue'
export default {
    name: 'MyLogin',
  setup(){
    let loginFormValue = reactive( {
         username : '',
          pass : ''
      } 
      )
      let loginForm = ref(null)
    let rules =  {	
      username : [ 
        { 
          type: 'string',
          required: true,
          message: "用户名不能为空", 
          trigger: 'change'
        }, {
          max: 15,
          message: "用户名长度不能超过15位" ,
          trigger: 'change'
        },{ 
          pattern: /^[a-zA-Z0-9_-]+$/, 
          required: true,
          message: "用户名只能包含字母，数字，下划线，减号", 
          trigger: "change" 
        }
      ],
      pass : [ 
        { 
          type: 'string',
          required: true,
          message: "密码不能为空", 
          trigger: 'change'
        }, {
          max: 30,
          message: "密码长度不能超过30位" ,
          trigger: 'change'

        }, {
          min: 6,
          message:"密码长度不能小于6位",
          trigger: 'blur'

        }
      ]
      }
     
    
    const store = useStore()  // 该方法用于返回store 实例
    const router = useRouter();

    const login =  function (){
      //console.log('this',this);
      
      // username = username.value;
      // pass = pass.value;

      let username = loginForm.value.username;
      let pass = loginForm.value.pass;
      this.loginForm.validate(async (valid) => {//valid为rules验证是否通过
        //console.log('valid',valid);
        if(valid){
            await store.dispatch('getLogin',username,pass);
            let token = localStorage.getItem('token');
            if(token){
              store.commit('changeLogin',token)
              console.log('router',router);
              router.replace('/echarts');
            }else{
              alert('登录失败')
            }
        }else {
          return false

        }
        
      })
      //console.log("password",pass);
      
     


    }
    return {
      loginFormValue,
      login,
      rules,
      loginForm
      //theme
    }
  },
  computed:{
    ...mapState(['theme'])
  },

    components:{
      ChangeTheme
    },
    mounted() {
        
    },

   
};
</script>

<style lang="less" scoped>
 .login-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    .login-theme {
      padding: 10px;
      float: right;
    }
    //background-color: #fff;
    .login-form {
        width: 400px;
        height: 200px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        padding: 50px;
        //background-color: #bbb;
        border-radius: 20px;
        box-shadow: 0 0 20px rgb(0 0 0 / 70%);
        
      .login-form-item {
        padding: 10px;
      }
      .login-button {
        margin: auto;
        width: 200px;
        height: 40px;
        font-size: 17px;
        border-radius: 20px;
        border: none;
        box-shadow:  5px 5px 5px rgb(0 0 0 / 40%);;
      }
        
    
    }
 }
</style>