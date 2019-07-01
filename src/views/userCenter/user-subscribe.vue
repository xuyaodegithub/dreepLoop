<template>
  <div class="Subscribe">
    <h3>我的订阅</h3>
    <h4>订阅计划-每月500学分</h4>
    <p>预定时间：2016-06-26</p>
    <p>本月剩余：450学分</p>
    <div class="btn">
      <el-button type="primary" round>升级订阅</el-button>
      <el-button type="primary" round>取消订阅</el-button>
    </div>
    <div class="oldUse">
        <h5>使用记录</h5>
      <el-table
        :header-row-style="{color:'#333','font-weight':600}"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          v-for="(item,index) in tableHeader"
          :key="index"
          :prop="item.str"
          :label="item.label"
          :width="item.width">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

export default {
  name: 'Subscribe',
  data () {
    return {
        tableHeader:[
          {label:'日期',str:'data',width:''},
          {label:'金额',str:'money',width:''},
          {label:'描述',str:'des',width:''},
        ],
      tableData:[
        {data:'2019-06-28',money:3000,des:'这是一个描述'},
        {data:'2019-06-26',money:300,des:'这是一个描述'},
        {data:'2019-06-24',money:2000,des:'这是一个描述'},
      ]
    }
  },
  computed:{

  },
  components:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Subscribe{
  h3{
    font-size: 28px;
    color: #333;
    margin-bottom: 38px;
    font-weight: 500;
  }
  h4{
    font-size: 16px;
    color: #333;
    margin-bottom: 14px;
  }
  & > p{
    font-size: 12px;
    color: #b1b1b1;
    margin-bottom: 13px;
  }
  .btn{
    margin-top: 25px;
    margin-bottom: 56px;
    .el-button{
      margin-right: 12px;
      font-size: 14px;
      line-height: 40px;
      padding: 0;
      border-color:#27adf6 ;
      color: #fff;
      background-color: #27adf6;
      width: 120px;
    }
    .el-button:last-child{
      background-color: #fff;
      color: #27adf6;
    }
    .el-button+.el-button{
      margin: 0;
    }
  }
  .oldUse{
    h5{
      font-size: 14px;
      margin-bottom: 22px;
    }
  }
}
</style>
