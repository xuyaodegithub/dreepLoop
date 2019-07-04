<template>
  <div class="Subscribe">
    <h3>我的能量</h3>
    <h4>当前可用能量</h4>
    <p>1能量</p>
    <div class="btn">
      <el-button type="primary" round>购买能量</el-button>
    </div>
    <div class="oldUse">
      <h5>使用记录</h5>
      <el-table
              :header-cell-style="{color:'#333',fontWeight:500}"
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
    min-height: 500px;
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
      margin-bottom: 10px;
    }
    .btn{
      margin-top: 38px;
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
      .el-button+.el-button{
        margin: 0;
      }
    }
    .oldUse{
      h5{
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 22px;
      }
    }
  }
</style>
