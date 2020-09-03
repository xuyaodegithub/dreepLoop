<template>
        <div class="widthPhone">
            <h3 class="mb-50">{{title}}</h3>
            <el-input v-model="username" placeholder="手机号" type="number" :maxlength="11" class="mb-15"></el-input>
            <sliderYz @success="toShowCode" :visible.sync="showCode"></sliderYz>
            <div class="flex dxzz a-i">
                <el-input v-model="userpass" placeholder="短信验证码" type="number"
                          @keyup.enter.native="regestUser()">
                </el-input>
                <el-button type="primary" @click="sendMobileCode">{{timer ? timer : '发送验证码'}}
                </el-button>
            </div>
        </div>
</template>

<script>
    import sliderYz from '@/components/sliderYz/index.vue'
    import { sendCode} from "../../apis";
    export default {
        name: 'login',
        props:{
            title:String,
        },
        data() {
            return {
                username: '',
                userpass: '',
                showCode: false,
                timer: 0
                // moveMsg:'请按住滑块拖动到最右边'
            }
        },
        computed: {
        },
        methods: {
            toShowCode(item) {
                this.showCode = false;
                const data = {
                    mobile: this.username,
                    image_code: item,
                }
                sendCode( data ).then( res => {
                    if (!res.code) {
                        this.$message( {type: 'success', message: '短信发送成功'} )
                        this.timer = 60;
                        let timer = setInterval( () => {
                            this.timer--
                            if (!this.timer) clearInterval( timer )
                        }, 1000 )
                    }
                } )
            },
            regestUser() {
                this.$emit('bindPhone','')
            },
            sendMobileCode() {
                if (this.timer) return;
                if (!this.username || this.username.length !== 11) {
                    this.$message( {type: 'error', message: '手机号格式不正确'} )
                    return
                }
                this.showCode = true
            }
        },
        components: {
            sliderYz
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
        .widthPhone{
            line-height: 1;
            text-align: center;
            color: #333333;
            font-size: 14px;
            h3{
                font-size: 28px;
                color: #333333;
            }
        }

        .dxzz {
            .el-button {
                border-radius: 0;
                border-left: 0;
            }
        }
</style>
