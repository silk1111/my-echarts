<template>
        <div id="my-echart" style="height: 100%;"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";
//import { ref } from "vue";
export default {
    name: 'TiaoPic',

    setup(){
        let echartDom = null
        let option = {
                //标题
                title: {
                    text: 'World Population',
                    subtext:'世界人口总数',
                    padding:[5,20]
                },
                
                //位置
                grid: {
                    left: '3%',
                    right: '19%',
                    bottom: '3%',
                    containLabel: true
                },
                //提示框
                tooltip: {
                     trigger: 'axis',
                     show:true,
                    showContent:true,
                    axisPointer: {//坐标轴指示器配置项。即划过时的样式
                        show:false,
                        type:'none'
                    },
                    formatter:(params) => {
                        let tool = ""
                         for (let item of params){
                            tool += "<div>"+item.seriesName + "&nbsp&nbsp&nbsp&nbsp人口数目：<span style=\"color:"+item.color+";\">"+item.data/1000 + "</span>&nbsp亿 </div>"
                         }
                         return tool;
                    }
                },
                //图例
                legend: {
                    show:true,
                    top:'5%',
                    right:'10%'
                },
                //标签
                label:{
                    show: true,
                    fontSize: 11,
                    position:'outside',
                    precision:2,
                    formatter:(params) => {
                        if(params.data)
                        return  params.data/10000+'亿'
                        else
                        return 'null'
                    }
                },
                //x轴
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    splitLine: {
                        show: false
                    },
                    axisLabel:{
                        formatter:(labelNum) => {
                            return labelNum && labelNum/10000+' (亿)'
                    }
                    }
                    
                },
                //y轴
                yAxis: {
                    type: 'category',
                    splitLine: {
                        show: false
                    },
                    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
                },
                emphasis: {
                    disabled: true
                },
                //显示数据
                series: [
                    {
                    name: '2011',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230],
                    itemStyle:{
                            color:{
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "#24cdf7", // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#01183b',// 100% 处的颜色
                                    },
                                ],
                            }
                        
                    }
                    },
                    {
                    name: '2012',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807],
                    itemStyle:{
                            color:{
                                colorStops: [
                                {
                                    offset: 0,
                                    color: "#90EE90", // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "#023113",// 100% 处的颜色
                                },
                            ],
                            }
                        
                    }
                    }
                ]
            };
        const setEchart = function(){
            this.echartDom = echarts.init(document.getElementById("my-echart"),this.theme);  
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