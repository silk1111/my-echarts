<template>
    <!-- <div> -->
        <el-row class="echarts-wrapper">
        <!-- 24布局，将宽度分为24份 -->
    <el-col :span="4"         class="nav-wrapper">
    <div class="echarts-theme">
          <ChangeTheme></ChangeTheme>          
        </div>
      <el-menu
        active-text-color="#ffd04b"
        class="nav"
        text-color="#fff"
      >
         <router-link v-for="(item,index) of store.state.routers[0].children" :to="item.meta.path" :key="index">
         <el-menu-item :index="index+'child'" >
          <el-icon></el-icon>
          <span>{{ item.meta.navName }}</span>
        </el-menu-item>
         </router-link>
        
       
      
        <el-menu-item index="5" @click = "exitLogin">
            <el-icon></el-icon>
            <span >退出登录</span>
          
        </el-menu-item>
       

      </el-menu>
      
    </el-col>
    <el-col :span="10" class="my-echarts">
      <router-view ></router-view>
 </el-col>
    <el-col :span="10">
        <div id="my-echart1" class="my-echarts"></div>
 </el-col>
  </el-row>
  
    <!-- </div> -->
</template>

<script >
import * as echarts from "echarts";
import { useStore,mapState } from 'vuex' // 引入useStore 方法
import {useRouter} from 'vue-router'
import ChangeTheme from './ChangeTheme.vue'

export default {
    name: 'MyEcharts',
    setup(){
        const store = useStore();
        const router = useRouter();
        let echartDom = ''
        let option = {
              tooltip: {
              trigger: 'axis',
              axisPointer:{
                type:'none'
              }
                
            },
            toolbox: {
              feature: {
                magicType: { show: true, type: ['line', 'bar'] },
              }
            },
            legend: {
              data: ['蒸发量', '降水量', '温度']
            },
            xAxis: [
              {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLine:{
                  show:true,//坐标轴,
                },
                axisTick:{
                  show: false//坐标轴刻度
                },
                minorTick: {
                  show: false
                },
                splitLine: {
                  show:false
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '降水量',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                  formatter: '{value} ml'
                }
              },
              {
                type: 'value',
                name: '温度',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                  formatter: '{value} °C'
                }
              }
            ],
            series: [
              {
                name: '蒸发量',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' ml';
                  }
                },
                data: [
                  2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                ]
              },
              {
                name: '降水量',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' ml';
                  }
                },
                data: [
                  2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                ]
              },
              {
                name: '温度',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' °C';
                  }
                },
                // color:'rgb(10, 61, 97)',
                areaStyle: {
                  color:{
                    type:'linear',//线性
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgb(150,100,50)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(10, 61, 97,0)' // 100% 处的颜色
                    }],
                  }
                },
                
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
              }
            ]
            }
        const setEchart = function(){    
            this.echartDom = echarts.init(document.getElementById("my-echart1"),this.theme)
            this.echartDom.setOption(this.option);
        }
        const exitLogin = function(){
          store.commit('exitLogin');
          if(!localStorage.getItem('token')){
            router.replace('/login')
          }else{
            alert('退出登录失败')
          }
        }
        return {
            echartDom,
            option,
            setEchart,
            exitLogin,
            store
        }
    },
    
    mounted() {
       this.setEchart();
    },
    components:{
      ChangeTheme
    },
    computed:{
    ...mapState(['theme'])
  },
  watch:{
    theme(){
    //实现 echarts图表与主题的联动    
        this.echartDom.dispose();
         this.echartDom = echarts.init(document.getElementById("my-echart1"),this.theme)
            this.echartDom.setOption(
                this.option,true
            );
        
    }
  }

    
};
</script>

<style lang="less" scoped>
.echarts-wrapper {
    height: 90vh;
    // background-color: @backGroundColor;
  .nav {
    height: auto;
    overflow: hidden;
    //background-color: aqua;
    :hover {
      color: #000;
    }
  }
  .echarts-theme {
    width: auto;
    margin-left: 20px;

  }
}
.my-echarts {
  width: auto;
  height: 100%;
}
</style>