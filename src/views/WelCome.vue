<template>
	<div>
	<el-card class="welcome-card">
      <!-- 柱状图+折线图 -->
      <v-chart class="chart3" :options="barOptions" />
      <!-- 饼状图 -->
      <el-row class="chart4" type="flex" justify="space-between">
        <el-col :span="8" class="chart">
          <v-chart class="chart4_1" :options="piesOptions" />
        </el-col>
      </el-row>
    </el-card>
	</div>
</template>

<script>
export default {
  data() {
    return {
      barOptions: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          top: "15%",
          bottom: "20%",
          right: "5%",
          left: "5%"
        },
        tooltip: {},
        legend: {
          data: ["合格数", "超标数", "合格率", "超标率"],
          top: "0"
        },
        xAxis: {
          type: "category",
          data: ["04-13", "04-14", "04-15", "04-16", "04-17", "04-18", "04-19"]
        },
        yAxis: {
          // name: '合格率(%)',
          // nameLocation: 'middle',
          type: "value"
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: "合格数",
            type: "bar",
            barWidth: "15%",
            barGap: "5%",
            data: [20, 232, 441, 654, 770, 530, 410]
          },
          {
            name: "超标数",
            type: "bar",
            barWidth: "15%",
            data: [120, 482, 791, 834, 590, 930, 710]
          },
          {
            name: "合格率",
            type: "line",
            data: [420, 332, 291, 654, 590, 330, 810]
          },
          {
            name: "超标率",
            type: "line",
            data: [120, 232, 391, 854, 590, 730, 410]
          }
        ]
      },
      piesOptions: {
   color: ["#5094FF", "#64DAAC", "#FAC84A"],
        title: {
          text: "汽油柴油分布",
          top: "5%",
          left: "5%",
          textStyle: {
			fontSize: "10px",
            color: "#333333",
            fontStyle: "normal"
          }
        },
        grid: {
          top: "15%",
          bottom: "15%",
          right: "15%",
          left: "15%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
      series: [
          {
            name: "气体值",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: [
              { value: 50, name: "NOx超标" },
              { value: 30, name: "PM2.5超标" },
              { value: 20, name: "超标污染物" }
            ],
            label: {
              position: "inside",
              formatter: "{b} \n {c}({d}%)"
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  }
};
</script>

<style>
</style>
