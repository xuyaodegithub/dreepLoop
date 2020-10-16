<template>
    <div class="helloFirst">
        <header-sub></header-sub>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import headerSub from '@/components/header/index.vue'
    import {getToken, getSecImgs, setSecImgs} from "../../utils/auth";
    import {initSmallTag} from '@/utils'
    import {Message, Notification} from 'element-ui'
    import * as StackBlur from 'stackblur-canvas';
    export default {
        name: 'HelloWorld',
        data() {
            return {
            }
        },
        filters: {},
        watch: {},
        mounted() {
            window._self=this;
            window.showloginDialog = this.showloginDialog;
            window.Notification = this.showNotification;
            window.initSmallTag = initSmallTag;
            window.confirm = this.$confirm;
            window.StackBlur = StackBlur;
            // var showloginDialog= this.showLoginDilogAction()
            // $('.hisimgs').niceScroll({cursorcolor :'#999999',boxzoom:true});
        },
        destroyed() {
        },
        computed: {
            ...mapGetters([]),
        },
        components: {
            headerSub,
        },
        methods: {
            ...mapActions([
                'userGetscribe', 'showLoginDilogAction'
            ]),
            showNotification(str) {
                Notification({
                    type: 'error',
                    message: str
                })
            },
            showloginDialog() {
                this.showLoginDilogAction()
            },
            upLoadimg() {//点击上传
                this.showLoginDilogAction()
                // this.$refs.upImg.value = '';
                // this.$nextTick( () => {
                //     this.$refs.upImg.click()
                // } )
            },
            stopPrevent() {//阻止游览器默认打开图片
                let _self = this
                document.addEventListener("drop", function (e) {  //拖离
                    e.preventDefault();
                });
                document.addEventListener("dragleave", function (e) {  //拖后放
                    e.preventDefault();
                });
                document.addEventListener("dragenter", function (e) {  //拖进
                    e.preventDefault();
                });
                document.addEventListener("dragover", function (e) {  //拖来拖去
                    e.preventDefault();
                });
                let oDrops = document.getElementsByClassName('drops');
                for (let i = 0; i < oDrops.length; i++) {
                    oDrops[i].addEventListener("drop", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        // e.cancelable=true
                        let files = e.dataTransfer.files;
                        // console.log(files)
                        if (!files.length) return;
                        if (!getToken() && files.length > 1) {
                            console.log(files)
                            _self.$message({type: 'error', message: '登录后可批量上传'})
                            return
                        }
                        _self.toscroll();
                        for (let i = 0; i < files.length; i++) {
                            console.log(files)
                            _self.files.unshift({
                                url: files[i],
                                name: parseInt(Math.random() * 100000000000),
                                type: 'file',
                                filename: files[i].name
                            })
                        }
                        _self.imgUrlss(files)
                    })
                }
            },

        },
        created() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .helloFirst {
        background-color: #f5f5f6;
    }

</style>
