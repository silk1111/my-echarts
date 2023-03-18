import myAxios from '../axios/http'
export default {
    async getLogin(state, username, password){
        console.log('actions',username,password);
         await myAxios.get('/api/loginResponse.json').then((res) => {
            const {token} = res.data;
            // console.log('登录json',token);
            state.commit('changeLogin',token)

            
        })
        // const token = 'nxdasjhd'
        // router.replace('/echarts')
    },
    async getRouters(store,token){
        console.log('通过token获取动态路由表',token);
        let willAdd = [] ;
        await myAxios.get('/api/routers.json').then((res) => {
            const {data} = res;
            willAdd = data.routers;

            function componentUrl(url){//改变地址格式，注意import内的参数写法
                return () => import(`@/components/${url}.vue`);
            }

             //将格式转换为addRouter需要的路由格式
            function tranRouters(routers) {
                for (let item of routers) {                    
                    item.component = componentUrl(item.component)
                    if (item.children && item.children.length > 0) {
                        tranRouters(item.children);
                    }
                }
            }

            tranRouters(willAdd)
            console.log( 'willAdd',willAdd);  
            store.commit('changeRouters',willAdd)


        })
        // console.log( 'willAdd',willAdd);


        
       
        // const willAdd = [{
           
        //             path:'/echarts/bing',
        //             component:() => import ('@/components/echarts/BingPic'),
        //             meta:{
        //                 roles:['2']
        //             }
                
        // }]
        // store.commit('changeRouters',willAdd)

    }
}