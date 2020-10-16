<template>
    <div class="invitation">
        <h3>邀请好友，获取免费次数</h3>
        <div class="seclabel">
            邀请好友注册，填写邀请码，你和好友都获赠5次大图
        </div>
        <div class="smally">
            将下面邀请码复制给好友，分享越多，获得次数越多
        </div>
        <div class="flex">
            <div>邀请码：{{yqma}}</div>
            <span @click="copyUrl2">点击复制</span>
        </div>
        <p style="color:#e82255;font-size: 14px;margin-top: 10px;">手机号注册才有邀请码可填</p>
        <div class="oldUse">
            <h5><!--Points Usage History-->邀请记录</h5>
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
</template>

<script>
    import { userGetInvitation, userGetInvitationLogPage } from "../../apis";

    export default {
        name: 'invitation',
        data () {
            return {
                yqma:'cuk34',
                plansHistory:'',
                tableHeader:[
                    // {label:'Date',str:'createdAt',width:''},
                    // {label:'好友',str:'createdAt',width:''},
                    // {label:'Points',str:'credits',width:''},
                    {label:'日期',str:'createdAt',width:''},
                    // {label:'Description',str:'comment',width:''},
                    {label:'邀请奖励',str:'num',width:''},
                ],
                rows:10,
                page:1,
            }
        },
        computed:{
        },
        components:{
        },
        methods:{
            handleSizeChange(val) {
                this.rows=val
                this.getLogPage()
            },
            handleCurrentChange(val) {
                this.page=val
                this.getLogPage()
            },
            copyUrl2(){
                let Url2=`还在看PS教程？一键抠图神器来了，一定要收藏哦，复制邀请码：${this.yqma}，打开www.picup.ai注册填入邀请码，即可获赠20次大图`;
                let oInput = document.createElement('input');
                oInput.value = Url2;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                // oInput.className = 'oInput';
                oInput.style.display='none';
                this.$message({
                    type:'success',
                    message:'复制成功'
                })
            },
             getYqma(){//获取邀请码
                userGetInvitation().then(res=>{
                    this.yqma=res.data
                })
            },
            getLogPage(){//获取邀请记录
                let data={
                    page:this.page,
                    limit:this.rows
                }
                userGetInvitationLogPage(data).then(res=>{
                    this.plansHistory=res.data
                })
            }

        },
        mounted() {
            this.getYqma()
            this.getLogPage()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .invitation{
        min-height: 500px;
        .seclabel{
            font-size: 18px;
            color: $co;
            line-height: 32px;
        }
        .smally{
            font-size:14px ;
            color: rgb(168,168,168);
            line-height: 26px;
            margin-bottom: 18px;
        }
        h3{
            font-size: 28px;
            color: #333;
            margin-bottom: 30px;
            font-weight: 500;
        }
        .flex{
            font-size: 16px;
            line-height: 38px;
            border: 1px solid #333;
            padding:0 15px 0 30px ;
            width: 220px;
            justify-content: space-between;
            align-items: center;
            span{
                font-size: 14px;
                color: $to;
                cursor: pointer;
            }
        }
        .oldUse{
            margin-top: 95px;
            h5{
                font-weight: 500;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .block{
                margin-top: 15px;
                text-align: right;
            }
        }
    }
</style>
