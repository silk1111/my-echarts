<template >
  <div :class="'default '+theme">
   <router-view></router-view>
  </div>
 
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  components: {
    
  },
  computed:{
    ...mapState(['theme'])
  },
}
</script>

<style lang="less">
a {
  text-decoration: none;

}
.default {
  @import "@/assets/lightTheme.less";
  background-color: @backGroundColor;
  .nav-wrapper {
    background-color:@navColor ;
    .nav {
      background-color:@navColor ;

    }
  }
  .login-wrapper {
    background-color: @backGroundColor;
    .login-form {
      background-color: @loginFormColor;
      .login-button {
        background-color: @loginButtonColor;
      }
    }
  }
  .theme-wrapper {
    color: @fontColor;
  }
}
   .light  {
  .default;
}

.dark{
  @import "@/assets/darkTheme.less";
  background-color: @backGroundColor;
  .nav-wrapper {
    background-color:@navColor ;
    .nav {
      background-color:@navColor ;

    }
  }
  .login-wrapper {
    background-color: @backGroundColor;
    .login-form {
      background-color: @loginFormColor;
      .login-button {
        background-color: @loginButtonColor;

      }
    }

  }
  .theme-wrapper {
    color: @fontColor;
  }
}
</style>
