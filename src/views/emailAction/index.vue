<template>
    <div>
        <div class="section" v-if="emailType=='changePass'">
            <div class="margin">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAA8CAYAAABYfzddAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA2NDdFRTIwQjc1MTExRTlCODA1OEIyRjBDQTE2NEE1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA2NDdFRTIxQjc1MTExRTlCODA1OEIyRjBDQTE2NEE1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDY0N0VFMUVCNzUxMTFFOUI4MDU4QjJGMENBMTY0QTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDY0N0VFMUZCNzUxMTFFOUI4MDU4QjJGMENBMTY0QTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz51/pj1AAANf0lEQVR42uxd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" />
                <p>Dear <span>{{email}}!</span></p>
                <p>Someone request to reset the password, you can click the following button to reset your password</p>
                <div class="btn" @click="sureUpdata()" >Go to</div>
                <p>You can ignore this email if you do not want to change your password</p>
            </div>
        </div>
        <div class="register" v-if="emailType=='register'">
            <div class="margin ">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAA8CAYAAABYfzddAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA2NDdFRTIwQjc1MTExRTlCODA1OEIyRjBDQTE2NEE1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA2NDdFRTIxQjc1MTExRTlCODA1OEIyRjBDQTE2NEE1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDY0N0VFMUVCNzUxMTFFOUI4MDU4QjJGMENBMTY0QTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDY0N0VFMUZCNzUxMTFFOUI4MDU4QjJGMENBMTY0QTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz51/pj1AAANf0lEQVR42uxd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" />
                <p>Dear <span>{{email}}!</span></p>
                <p>Thanks for registering Picup.AI</p>
                <p>Confirm your account by clicking the following button</p>
                <div class="btn" @click="actionEmail()">Activate</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { userActivationEmail } from "../../apis";
    import { basrUrls } from "../../utils";
    // http://localhost:8080/emailAction.html#/?type=changePass&token=1c4f18bc35e5427085e1d000e689dc3b&email=845275351%40qq.com//找回密码链接
    // http://localhost:8080/emailAction.html#/?type=register&token=1c4f18bc35e5427085e1d000e689dc3b&email=845275351%40qq.com//注册链接
    export default {
        name: 'emailAction',
        data () {
            return {
                basrUrls:basrUrls()
            }
        },
        computed:{
            emailType(){
                return this.$route.query.type
            },
            userToken(){
                return this.$route.query.token
            },
            email(){
                return this.$route.query.email
            }
        },
        watch:{

        },
        mounted(){

        },
        methods:{
            sureUpdata(){
                window.open(`${this.basrUrls}/updataPass.html#/?token=${this.userToken}`)
            },
            actionEmail(){
                // let urls = window.location.href.split('#/')[0]
                // let baseUrl = urls.substring(0,urls.lastIndexOf('/'))
                userActivationEmail({token:this.userToken}).then(res=>{
                    if(!res.code){
                        window.open(`${this.basrUrls}/resBackMsg.html#/?type=2`)
                    }
                })
            }
        },
        components:{

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .margin{
        margin-top: 50px;
        line-height: 1;
        padding: 60px;
        background-color: #fff;
    }
    .margin img{
        display: block;
        width: 240px;
        margin-bottom: 32px;
    }
    .margin p{
        font-size: 14px;
        color: #333;
    }
    .margin p span{
        color: #e82255;
    }
    .margin p:nth-child(2){
        margin-bottom: 25px;
    }
    .margin p:nth-child(3){
        margin-bottom: 32px;
    }
    .margin .btn{
        cursor: pointer;
        width: 160px;
        line-height: 50px;
        font-size: 16px;
        text-align: center;
        background-color: #e82255;
        margin-bottom: 25px;
        border-radius: 25px;
        color: #fff;
    }
    .register .margin p:nth-child(2){
        margin-bottom: 10px;
    }
    .register .margin p:nth-child(3){
        margin-bottom: 32px;
    }
    .register .margin p:nth-child(4){
        margin-bottom: 36px;
    }

</style>
