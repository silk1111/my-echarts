<template>
        <div id="my-bing1" class="my-bing" style="height: 50%;"></div>
        <div id="my-bing2" class="my-bing" style="height: 50%;"></div>

</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";
export default {
    name: 'BingPic',

    setup(){
        let echartObjects = []
        let echartDoms = []
         let option = {
                    title: {
                        text: '默认饼图',
                        subtext: '副标题',//副标题
                        left: 'center'
                    },
                    // color:['#e4e412', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
                    legend: {
                        orient: 'horizontal',//图例横向或是纵向，
                        bottom: '5%'
                    },
                    tooltip:{
                            show:true,
                            trigger:'item',
                            formatter:'{a0}\n'+'名称：{b0}\n'+'数值：{c0}',
                        },
                    series: [
                        {
                        name: '饼图',
                        type: 'pie',
                        radius: '70%',
                        data: [
                            { value: 1048.11, name: 'Search Engine' },
                            { value: 735.63478, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ],
                        label: {//文字标签
                                show: true,
                                fontSize: 10,
                                margin: 20,

                                position:'inside',
                                fontWeight: 'bold',
                                formatter: function(params) {//格式修改
                                    // console.log("params",params);
                                    //  return `'<div class="showBox">111'/n'</div>'`
                                    return `名称: `+params.data.name+`\n  数值: `+params.data.value.toFixed(2)
                                }
                        },
                        labelLine: {
                            show: false
                        },
                        
                        emphasis: {//强调，指鼠标划过的效果
                            itemStyle: {
                            shadowBlur: 20,//图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                            shadowOffsetX: 0,//阴影往x轴方向移动距离
                            shadowColor: 'rgba(0, 0, 0, 0.5)'//阴影颜色
                            },
                            label: {
                                show: true,
                                fontSize: 20,
                                fontWeight: 'bold'
                                }


                        }
                        }
                    ]
                };
        const setEchart = function(){
            this.echartDoms = document.getElementsByClassName('my-bing');
            for(let item of this.echartDoms){
                 this.echartObjects.push(echarts.init(item,this.theme));
            }
            for (let key in this.echartObjects){
                if(this.echartDoms[key].id === "my-bing1"){
                    const _option =  {
                        title: {
                            text: '环图',
                            subtext: '副标题',//副标题
                            left: 20,
                            top:10,
                        },
                        // color:['#e4e412', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
                        legend: {
                            orient: 'vertical',//图例横向或是纵向，
                            bottom: '5%',
                            right: 0
                        },
                        tooltip:{
                                show:true,
                                trigger:'item',
                                formatter:'{a0}\n'+'名称：{b0}\n'+'数值：{c0}',
                            },
                        series: [
                            {
                            name: '饼图-示意',
                            type: 'pie',
                            radius: ['40%','60%'],
                            data: [
                                { value: 1048.11, name: 'Search Engine' },
                                { value: 735.63478, name: 'Direct' },
                                { value: 580, name: 'Email' },
                                { value: 484, name: 'Union Ads' },
                                { value: 300, name: 'Video Ads' }
                            ],
                            label: {//文字标签
                                    show: true,
                                    fontSize: 10,
                                    margin: 20,

                                    position:'outside',
                                    fontWeight: 'bold',
                                    formatter: function(params) {//格式修改
                                        // console.log("params",params);
                                        //  return `'<div class="showBox">111'/n'</div>'`
                                        return `名称: `+params.data.name+`\n  数值: `+params.data.value.toFixed(2)
                                    }
                            },
                            labelLine: {
                                show: true
                            },
                            
                            emphasis: {//强调，指鼠标划过的效果
                                itemStyle: {
                                shadowBlur: 20,//图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                                shadowOffsetX: 0,//阴影往x轴方向移动距离
                                shadowColor: 'rgba(0, 0, 0, 0.5)'//阴影颜色
                                },
                                label: {
                                    show: true,
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                    }


                            }
                            }
                        ]
                    }
                    this.echartObjects[key].setOption(_option);
                    continue;

                }
                this.echartObjects[key].setOption(this.option);

            }
            
            //  this.echartDoms = echarts.init(document.getElementsByClassName('my-bing'),this.theme);        
            //  this.echartDoms.setOption(this.option)
        }
        return {
            setEchart,
            echartObjects,
            echartDoms,
            option
        }
    },
    mounted() {
        this.setEchart()
        
        
    },
    updated(){
        console.log('updqate',this.theme);
        
    },
    computed:{
    ...mapState(['theme'])
  },
  watch:{
    theme(){
    //实现 echarts图表与主题的联动    
    for(let key in this.echartObjects){
                this.echartObjects[key].dispose();
                 const itemEchart = echarts.init(this.echartDoms[key],this.theme);  
                 this.echartObjects[key] =   itemEchart
                itemEchart.setOption(this.option);
            }
         
        
    }
  }

};
</script>

<style lang="less" scoped>

</style>