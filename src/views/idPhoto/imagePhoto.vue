<template>
    <div class="helloFirst">
        <header-sub></header-sub>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import headerSub from '@/components/header/index.vue'
    import {getToken, getSecImgs, setSecImgs} from "../../utils/auth";

    export default {
        name: 'HelloWorld',
        data() {
            return {

            }
        },
        filters: {

        },
        watch: {},
        mounted() {

            // $('.hisimgs').niceScroll({cursorcolor :'#999999',boxzoom:true});
        },
        destroyed() {
        },
        computed: {
            ...mapGetters( [] ),
        },
        components: {
            headerSub,
        },
        methods: {
            ...mapActions( [
                'userGetscribe'
            ] ),

        },
        created() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .helloFirst{
        background-color: #f5f5f6;
    }

</style>
