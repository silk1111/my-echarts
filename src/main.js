import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus  from 'element-plus'
import store from './store'
import 'echarts-liquidfill'
import 'element-plus/dist/index.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/defaultStyle/reset.css'
import '@/assets/defaultStyle/border.css'
import '@/assets/echarts/dark'
const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.mount('#app');
