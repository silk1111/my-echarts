<template>
    <div class="theme-wrapper">
    <span class="iconfont">&#xe60f;</span>
        <el-switch
        v-model="isThemeDark"
        class="change-theme"
        size="large"
        style="--el-switch-on-color: #bbb; --el-switch-off-color: #111"
        @click = "change"
    /> 
    <span class="iconfont">&#xe63e;</span>

    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue'

export default {
    name: 'ChangeTheme',

    data() {
        let store = useStore();
        let theme = store.state.theme;
        let isThemeDark = ref(false);
        
        if(theme === 'dark'){
             isThemeDark = true;
        }
        
        let change= () =>{
            console.log(this.isThemeDark);
            
                if(this.isThemeDark){
                    store.commit('changeTheme','dark');
                }else {
                    store.commit('changeTheme','light');

                }     
        }
       

        return {
           
           
                isThemeDark,
                change
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="less" scoped>
.theme-wrapper {
    height:40px;
    position: relative;

    .iconfont {
        font-size: 25px;
        position: relative;
        top: -3px;
    }
    .change-theme {
        padding-left: 2px;
        padding-right: 2px;
    }
}
</style>