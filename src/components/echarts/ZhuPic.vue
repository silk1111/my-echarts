<template>
        <div id="my-echart" style="height: 100%;"></div>

</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
    name: 'ZhuPic',

    setup(){
        let echartDom = '';
        let option = {
            title: {
                text: '柱图示意'
            },
            tooltip: {},
            xAxis: {
                axisLabel:{
                    margin:18,
                },
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                name: '头部圆',
                type: 'pictorialBar',
                symbol:'circle',
                symbolSize: [40, 10],
                symbolOffset: [0, -6],
                symbolPosition: 'end',
                color: '#3ae3fd',
                label:{
                    show:true,
                    position:'outside',
                    formatter: (params) => {
                        return ''+params.data+'件'
                    }
                },
                z:1,
                data: [5, 20, 36, 10, 10, 20]
                },
                {
                name: '销量',
                type: 'bar',
                barWidth:'40',
                itemStyle:{
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                                offset: 0,
                                color: '#3ae3fd',
                            },
                            {
                                offset: 1,
                                color: "#3498ba"
                            }
                            ]),
                        
                    },
                data: [5, 20, 36, 10, 10, 20]
                },
                {
                name: '底部圆',
                type: 'pictorialBar',
                symbol:'circle',
                symbolSize: [40, 10],
                symbolOffset: [0, 3],
                symbolPosition: 'start',
                color: '#3ae3fd',
                z:10,
                data: [5, 20, 36, 10, 10, 20]
                },
                {
                name: '底部涟漪',
                type: 'effectScatter',
                symbol:'circle',
                symbolSize: [40, 10],
                symbolOffset: [0, 3],
                color: '#3ae3fd',
                z:10,
                data: [0, 0, 0, 0, 0, 0]
                },
            ]
            };
        const setEchart = function(){
            
            this.echartDom = echarts.init(document.getElementById("my-echart"),this.theme)
            this.echartDom.setOption(this.option);
        }
        return {
            echartDom,
            option,
            setEchart
        }
    },
    mounted() {
        this.setEchart()
    },
    computed:{
    ...mapState(['theme'])
  },
  watch:{
    theme(){
    //实现 echarts图表与主题的联动    
        this.echartDom.dispose();
         this.echartDom = echarts.init(document.getElementById("my-echart"),this.theme)
            this.echartDom.setOption(
                this.option,true
            );
        
    }
  }

};
</script>

<style lang="less" scoped>

</style>