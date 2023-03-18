import {createRouter,createWebHashHistory} from 'vue-router';
import Login from '../components/Login.vue'
import MyEcharts from '../components/MyEcharts.vue'
import MyError from '../components/Error'
import store from '@/store';


// console.log('token',token);
let token = localStorage.getItem('token');//获取登录token
let routers = store.state.routers;
const router = new createRouter({
    history:createWebHashHistory(),
    routes: [
        {
            path:'/',
            redirect: token?'/echarts':'/login'//未登录默认路径是登录页面，登录后默认路径是echarts页面
        },
        {
            path:'/login',
            component:Login,    
            meta:{
                roles:['1','2']
            }
        },{
            path:'/echarts',
            component:MyEcharts,
            children:[
                {
                    path:'zhu',
                    component:() => import ('@/components/echarts/ZhuPic')
                }
            ],
            meta:{
                roles:['1','2']
            }
        },{
            path:'/error',
            component:MyError,
            meta:{
                roles:['1','2']
            }
        },
    ]
})

// // 检查是否存在于免登陆白名单
// function inWhiteList (toPath) {
//     const whiteList = ['/login', '/error']
//     const path = whiteList.find((value) => {
//       // 使用正则匹配
//       const reg = new RegExp('^' + value)
//       return reg.test(toPath)
//     })
//     return !!path
//   }
  
const role = '2'

router.beforeEach(async (to, from, next) => {
//to到哪个路由去，from从哪个路由离开，next决定是否展示你要看到的路由界面
    token = localStorage.getItem('token');//更新token

    console.log(to.path);
    if (!token && to.path !== '/login') {
            // 判断是否已经登录，未登录则重定向到登录页（通过query传参记录原来的路径）   
            next('/login')
            console.log('未登录，且路径不为登录，直接跳转到/login');

    } else if(to.path.includes('echarts') && token){
        if(!store.state.isRoutersGet){//当动态路由为空时，获取动态路由
            console.log('更新路由名单');
            await store.dispatch('getRouters',token);
            routers = store.state.routers;
            console.log('动态路由routers',routers);
            for(let item of routers){
                router.addRoute(item)
            }
            store.commit('changeisRoutersGet',true)//使用isRouterGet约束页面是否需要再次加载
            next({ ...to, replace: true })//再执行一次
            console.log('跳转到下一次',to.path);
        }else{
            store.commit('changeisRoutersGet',false)
            next()
        }
    }else if (to.matched.length ===0) {  //如果未匹配到路由
        console.log('无匹配路由');
        next('/')
        console.log('跳转到/');
        
    } else if( to.meta.roles &&!to.meta.roles.includes(role) )  {
        next({path:'/error'})
        console.log('无'+to.path+'权限，跳转到error');

    } else {
            next()
            console.log('跳转到原来的路径');
    }
    

        //   console.log('store',Array.isArray(store.state.routers)  );

        



    // // 检查to.path是否存在于免登陆白名单
    // if (inWhiteList(to.path)) {
    //     if (to.path === '/login' && token) {
    //       // 避免重复登录
    //       next({ path: '/' })
    //     } else {
    //       next()
    //     }
    //     return false
    //   }


    

})
export default router