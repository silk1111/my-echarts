<template>
    <div id="my-other1" class="my-other" style="height: 50%;"></div>
    <div id="my-other2" class="my-other" style="height: 50%;"></div>

</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";
export default {
name: 'OtherPic',

setup(){
    let echartObjects = []
    let echartDoms = []
     let option =   {
    series: [{
        // outline: {
        //     show: false
        // },
        outline: {
            borderDistance: 10,//内边框宽度
            itemStyle: {
                borderWidth: 10,//边框宽度
                borderColor: 'gray',//边框颜色
                shadowBlur: 15,//边框阴影模糊距离
                shadowColor: 'rgb(255, 0, 0)'
            }
        },
        shape: 'container',
        type: 'liquidFill',
        radius:'50%',
        data: [0.9, 0.5]

        }]

    };
    const setEchart = function(){
        this.echartDoms = document.getElementsByClassName('my-other');
        for(let item of this.echartDoms){
             this.echartObjects.push(echarts.init(item,this.theme));
        }
        for (let key in this.echartObjects){
            if(this.echartDoms[key].id === "my-other1"){
                const _option =  {
                    series: [{
                        radius: '90%',
                        type: 'liquidFill',
                        shape: 'diamond',
                        backgroundStyle: {
                            shadowColor: 'rgba(0, 0, 0, 0.4)',
                            shadowBlur: 20
                        },
                        data: [0.6, 0.5, 0.4, 0.3]

                    }]

                    };
                this.echartObjects[key].setOption(_option);
                continue;

            }
            this.echartObjects[key].setOption(this.option);

        }
        
        //  this.echartDoms = echarts.init(document.getElementsByClassName('my-other'),this.theme);        
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