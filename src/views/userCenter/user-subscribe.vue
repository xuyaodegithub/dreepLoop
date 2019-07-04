<template>
  <div class="Subscribe">
    <h3>我的订阅</h3>
    <div v-if="mySubPlans">
      <h4>订阅计划-每月{{mySubPlans.monthRemaining}}能量</h4>
      <p>预定时间：{{mySubPlans.createdAt | changeTime}}</p>
      <p>免费剩余：{{mySubPlans.freeRemaining}}能量</p>
      <p>订阅剩余：{{mySubPlans.monthRemaining}}能量</p>
      <div class="btn">
        <el-button type="primary" round>升级订阅</el-button>
        <el-button type="primary" round>取消订阅</el-button>
      </div>
      <div class="oldUse">
        <h5>使用记录</h5>
        <el-table
                :header-cell-style="{color:'#333',fontWeight:500}"
                :data="plansHistory.content"
                style="width: 100%">
          <el-table-column
                  v-for="(item,index) in tableHeader"
                  :key="index"
                  :label="item.label"
                  :width="item.width"
                  :show-overflow-toolti="item.str==='comment'"
                  tooltip-effect="light">
            <template slot-scope="scope">
              <span style="margin-left: 10px" v-if="item.str==='createdAt'">{{ scope.row[item.str] | changeTime(1) }}</span>
              <span style="margin-left: 10px" v-else>{{ scope.row[item.str] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="page"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="rows"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="plansHistory.totalElements">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-else class="nodata">
      <div>
        暂无订阅，赶紧去订阅吧
      </div>
      <el-button type="primary" round @click="toBuy()">去订阅</el-button>
    </div>

  </div>
</template>

<script>
 import { userSubscribe, userPlansHistory } from "../../apis";
 import { basrUrls,toRouter } from "../../utils";

 export default {
  name: 'Subscribe',
  data () {
    return {
        mySubPlans:null,
        plansHistory:'',
        tableHeader:[
          {label:'日期',str:'createdAt',width:''},
          {label:'消耗',str:'credits',width:''},
          {label:'描述',str:'comment',width:''},
        ],
      rows:10,
      page:1,
      basrUrls:basrUrls()
    }
  },
  computed:{

  },
  components:{

  },
   methods:{
    getPlansmsg(){
      userSubscribe().then(res=>{
        if(!res.code){
          this.mySubPlans=res.data
        }
      })
    },
     getHistory(){
      let data={
        page:this.page,
        pageSize:this.rows
      }
       userPlansHistory(data).then(res=>{
         if(!res.code){
           this.plansHistory=res.data
         }
       })
     },
     handleSizeChange(val) {
       this.rows=val
       this.getHistory()
     },
     handleCurrentChange(val) {
       this.page=val
       this.getHistory()
     },
     toBuy(){
       toRouter('userVip')
     }
   },
   mounted() {
   this.getPlansmsg()
   this.getHistory()
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
  &  p{
    font-size: 12px;
    color: #b1b1b1;
    margin-bottom: 10px;
  }
  .btn{
    margin-top: 28px;
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
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 22px;
    }
    .block{
      margin-top: 15px;
      text-align: right;
    }
  }
}
  .nodata{
    font-size: 14px;
    text-align: center;
    padding: 50px 0;
    color: #979797;
    .el-button{
      background-color: #27adf6;
      border-color:#27adf6 ;
      margin-top: 50px;
      width: 120px;
    }
  }
</style>
