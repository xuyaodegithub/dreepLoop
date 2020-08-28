<template>
    <div class="Subscribe">
        <h3><!--My Subscription-->我的账户</h3>
        <div class="createTime">
            <!--Created at-->创建时间：{{mySubPlans.createdAt | changeTime(1)}}
        </div>
        <div v-if="mySubPlans" class="subplay">
            <h5>图片抠图</h5>
            <div class="flex">
                <div style="margin-right: 100px;"  v-if="mySubPlans.monthExpireDate && mySubPlans.monthExpireDate>noeTime">
                    <div class="items">
                        <!--Free remaining-->包月剩余次数：{{mySubPlans.monthRemaining}} <!--points--></div>
                    <p>
                        {{mySubPlans.monthStartDate | changeTime}} 到 {{mySubPlans.monthExpireDate | changeTime}}</p>
                </div>
                <div class="items"><!--Free remaining-->永久剩余次数：{{mySubPlans.freeRemaining}} <!--points--></div>
            </div>
            <h5>视频抠图</h5>
            <div class="items">剩余时间：{{mySubPlans.videoRemaining | minsfilter}}</div>
            <div class="btn flex">
                <el-button type="primary" round><!--Upgrade <Subscription--><a href="userVip.html"
                                                                               style="display: block;color: #fff;">立即购买</a>
                </el-button>
                <el-button type="primary" round><!--Cancel Subscription-->取消订阅</el-button>
            </div>
            <div class="oldUse">
                <h5><!--Points Usage History-->使用记录</h5>
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
        <div class="nodata" v-else>
            <div>
                No subscription found
            </div>
            <el-button type="primary" round @click="toBuy()">Go to subscript</el-button>
        </div>

    </div>
</template>

<script>
    import {userSubscribe, userPlansHistory} from "../../apis";
    import {basrUrls, toRouter} from "../../utils";

    export default {
        name: 'Subscribe',
        data() {
            return {
                mySubPlans: {},
                plansHistory: '',
                tableHeader: [
                    // {label:'Date',str:'createdAt',width:''},
                    {label: '时间', str: 'createdAt', width: ''},
                    // {label:'Points',str:'credits',width:''},
                    {label: '消耗次数', str: 'credits', width: ''},
                    // {label:'Description',str:'comment',width:''},
                    {label: '描述', str: 'comment', width: ''},
                ],
                rows: 10,
                page: 1,
                basrUrls: basrUrls()
            }
        },
        computed: {
            noeTime() {
                return new Date().getTime()
            }
        },
        filters:{

        },
        components: {},
        methods: {
            getPlansmsg() {
                userSubscribe().then( res => {
                    if (!res.code) {
                        this.mySubPlans = res.data
                    }
                } )
            },
            getHistory() {
                let data = {
                    page: this.page,
                    pageSize: this.rows
                }
                userPlansHistory( data ).then( res => {
                    if (!res.code) {
                        this.plansHistory = res.data
                    }
                } )
            },
            handleSizeChange(val) {
                this.rows = val
                this.getHistory()
            },
            handleCurrentChange(val) {
                this.page = val
                this.getHistory()
            },
            toBuy() {
                toRouter( 'userVip' )
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
    .Subscribe {
        min-height: 500px;
        .subplay h5{
            font-size: 14px;
            margin: 30px 0 6px;
            color: #333;
            &:first-child{
                margin-top: 0;
            }
        }
        h3 {
            font-size: 28px;
            color: #333;
            font-weight: 500;
            margin-bottom: 5px;
        }

        .createTime {
            margin-bottom: 30px;
            color: #999;
        }

        .items {
            font-size: 18px;
            color: #333;
        }

        h4 {
            font-size: 16px;
            color: #333;
            margin-bottom: 14px;
        }

        & p {
            font-size: 12px;
            color: #999;
            margin-bottom: 10px;
        }

        .btn {
            margin-top: 35px;
            margin-bottom: 56px;
            justify-content: space-between;

            .el-button {
                margin-right: 12px;
                font-size: 14px;
                line-height: 40px;
                padding: 0 15px;
                border-color: #e82255;
                color: #fff;
                background-color: #e82255;
                min-width: 120px;
            }

            .el-button:last-child {
                background-color: #fff;
                border: none;
                color: #dcdcdc;
            }

            .el-button + .el-button {
                margin: 0;
            }
        }

        .oldUse {
            h5 {
                font-weight: 500;
                font-size: 16px;
                margin-bottom: 22px;
            }

            .block {
                margin-top: 15px;
                text-align: right;
            }
        }
    }

    .nodata {
        font-size: 14px;
        text-align: center;
        padding: 50px 0;
        color: #979797;

        .el-button {
            background-color: #e82255;
            border-color: #e82255;
            margin-top: 50px;
            /*width: 120px;*/
        }
    }
</style>
