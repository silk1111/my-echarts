export default {
    //在登录成功后改变token
    changeLogin(state, token){ 
        console.log('mutations',token);
        
        state.token = token;
        localStorage.setItem('token',token)
    },
    exitLogin(state){
        console.log('exitLogin');
        
        state.token = '';
        localStorage.removeItem('token')
    },
    changeRouters(state, routers){
        console.log('获取路由后更新动态路由');
        
        state.routers = routers;
    },
    changeisRoutersGet(state,isGet){
        state.isRoutersGet = isGet;
    },
    changeTheme(state, theme){
        state.theme = theme;
        localStorage.setItem('theme',theme)

        console.log('theme修改为'+theme);
        
    }

}