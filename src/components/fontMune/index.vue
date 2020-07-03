<template>
    <!--    文字组件-->
    <div class="fmune">
        <el-select v-model="fValue" placeholder="请选择" @change="changeFont">
            <el-option
                    v-for="item in fList"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                    :style="{fontFamily:item.value,fontWeight:item.h ? 'bold' : ''}"
            >
            </el-option>
        </el-select>
        <el-input-number v-model="fontSize" controls-position="right" :min="1" :max="60"
                         @input="setFont({fontSize})"></el-input-number>
        <div class="flex a-i colors">
            <span>字体颜色</span>
            <el-color-picker v-model="color" @change="setFont({color})"></el-color-picker>
        </div>
        <div class="flex a-i colors">
            <span>背景颜色</span>
            <el-color-picker v-model="backgroundColor" show-alpha
                             @change="setFont({backgroundColor})"></el-color-picker>
        </div>
        <!--        <el-popover-->
        <!--                placement="left"-->
        <!--                width="290"-->
        <!--                trigger="click">-->
        <!--            <div class="popovers flex f-w">-->
        <!--                <div class="cu" style="font-size: 14px;">无样式</div>-->
        <!--                <div v-for="(item,idx) in fontStyleList" :key="idx" :style="{textShadow:item.shadow}" class="cu">样式-->
        <!--                </div>-->
        <!--            </div>-->
        <!--            <div class="flex a-i colors fstyle cu" slot="reference">-->
        <!--                <span>字体样式</span>-->
        <!--                <i :class="showFontStyle ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>-->
        <!--            </div>-->
        <!--        </el-popover>-->
        <div class="fontFa flex lineStyle">
            <el-tooltip :content="item.mean" placement="top" v-for="(item,idx) in firstList" :key="idx">
                <span class="cu"
                      :class="{'active' : selectCom.includes(item.type),'down_line' : idx===2,'del_line' : idx===3}"
                      @click="addLine(idx)">{{item.text}}</span>
            </el-tooltip>
        </div>
        <div class="fontFa flex">
            <el-tooltip :content="item.mean" placement="top" v-for="(item,idx) in secondList" :key="idx">
                <el-popover
                        v-if="item.type!==6"
                        placement="bottom"
                        :width="!idx ? 80 : 220"
                        trigger="manual"
                        v-model="styleType===item.type"
                        :popper-class="[7,8].includes(item.type) ? 'te' : ''">
                    <ul class="liList" v-if="item.type===5">
                        <li>文字对齐</li>
                        <li v-for="(it,ix) in item.itemList" :key="ix" class="cu flex a-i" @click="setAlign(it.sonType)"
                            :class="{'active' : alignType===it.sonType}"><i class="icon iconfont" :class="it.icon"></i>
                            {{it.text}}
                        </li>
                    </ul>
                    <div v-if="[7,8].includes(item.type)" class="flex a-i slids">
                        <label>{{item.type===7 ? '字间距' : '行高'}}</label>
                            <el-slider :show-tooltip="false" v-model="letterSpace" :min="0" :max="50"  v-show="item.type===7"
                                       @input="setFont({letterSpace})"></el-slider>
                            <el-slider :show-tooltip="false" v-model="lineHeight" :min="0" :max="150"  v-show="item.type===8"
                                       @input="setFont({lineHeight})"></el-slider>
                            {{item.type===7? letterSpace : lineHeight}}px

                    </div>
                    <div class="flex" slot="reference">
                        <i class="icon iconfont cu" :class="item.icon" @click="styleType=item.type"></i>
                    </div>
                </el-popover>
                <i class="icon iconfont cu" :class="item.icon" v-else></i>
            </el-tooltip>
        </div>

    </div>
</template>

<script>
    import {mixins} from '@/minxins/edit.js'

    export default {
        name: "index",
        mixins: [mixins],
        data() {
            return {
                fValue: {label: '思源黑体 粗体', value: 'Arial', h: 1},
                fList: [
                    {label: '演示佛系体', value: 'foxi'},
                    {label: '思源黑体 粗体', value: 'Arial', h: 1},
                    {label: '思源宋体 常规', value: 'systi'},
                    {label: '思源宋体 粗体', value: 'systc', h: 1},
                    {label: '小可黄油体', value: 'xkhy'},
                    {label: '贤二体', value: 'xer'},
                ],
                fontSize: 24,
                color: '#333333',
                backgroundColor: 'rgba(250,250,250,1)',
                showFontStyle: false,
                styleList: [
                    {text: 'B', type: 1, mean: '加粗', val: 'bold', key: 'fontWeight'},
                    {text: 'I', type: 2, mean: '倾斜', val: 'italic', key: 'fontStyle'},
                    {text: 'U', type: 3, mean: '下划线', val: 'underline', key: 'textDecoration'},
                    {text: 'A', type: 4, mean: '删除线', val: 'line-through', key: 'textDecoration'},
                    {
                        icon: 'icon-juzhongduiqi',
                        type: 5,
                        mean: '对齐方式',
                        itemList: [{text: '左对齐', icon: 'icon-juzuoduiqi', sonType: 1}, {
                            text: '居中对齐',
                            icon: 'icon-juzhongduiqi',
                            sonType: 2
                        }, {text: '右对齐', icon: 'icon-juyouduiqi', sonType: 3},]
                    },
                    {icon: 'icon-wenzigongju-shupai', type: 6, mean: '文字方向'},
                    {icon: 'icon-zijianju', type: 7, mean: '字间距'},
                    {icon: 'icon--zitihanggao', type: 8, mean: '行高'},
                ],
                styleType:-1,
                selectCom: [],//当前选中的组件
                alignType: 1,
                letterSpace: 0,//字间距
                lineHeight: 0,//字间距
            }
        },
        mounted() {
            // this.filterUrl()
        },
        computed: {
            firstList() {
                return this.styleList.filter( item => item.type < 5 )
            },
            secondList() {
                return this.styleList.filter( item => item.type > 4 )
            },
        },
        filters: {},
        methods: {
            changeFont(item) {
                let oInput = document.querySelector( '.el-select .el-input__inner' );
                oInput.style.fontFamily = item.value;
                oInput.style.fontWeight = item.h ? 'bold' : 'normal';
                this.$emit( 'initFont', {fontFamily: item.value, fontWeight: item.h ? 'bold' : 'normal'} )
            },
            setFont(data) {
                this.$emit( 'initFont', data );
            },
            addLine(idx) {
                const ix=this.selectCom.indexOf(this.firstList[idx].type);
                if(ix>-1)this.selectCom.splice(ix,1);
                else this.selectCom.push(this.firstList[idx].type);
                const [ix2,ix3]=[this.selectCom.indexOf(3),this.selectCom.indexOf(4)];
                if(ix2>-1 && ix3>-1){
                    const i=ix3>ix2 ? ix2 : ix3;
                    this.selectCom.splice(i,1)
                }
                let data=this.selectCom.reduce((pre,item,idx)=>{
                    const val=this.firstList.find(it=>it.type===item);
                    pre[val.key]=val.val;
                    return pre
                },{fontWeight:'initial',fontStyle:'initial',textDecoration:'initial'})
                this.$emit( 'initFont', data )
            },
            setAlign(type){
                if(this.alignType===type)return;
                this.alignType=type;
                const a=['left','center','right'];
                this.$emit( 'initFont', {textAlign:a[this.alignType-1]} )
                this.styleType=-1;
            },
            changeColor() {
                this.$refs.colorSelect.click()
            }
        }
    }
</script>

<style scoped lang="scss">
    .fmune {
        padding-top: 20px;

        .el-select, .el-input-number {
            width: 100%;
            margin-bottom: 12px;
        }

        .colors {
            margin-bottom: 12px;
            font-size: 14px;
            padding: 10px;
            border: 1px solid #e9e9e9;
            border-radius: 5px;
            line-height: 1;

            span {
                margin-right: 40px;
                color: #9C9C9C;
            }

            .el-color-picker {
                flex: 1;
                height: 20px;
            }
        }

        .fstyle {
            font-size: 16px;
            justify-content: space-between;
            padding: 22px 10px;
            margin-bottom: 55px;

            span {
                color: #333;
            }
        }

        .lineStyle {
            margin-top: 100px;
        }

        .fontFa {
            line-height: 1;
            padding: 20px 25px;
            font-size: 18px;
            font-weight: bold;
            color: #333;
            border: 1px solid #e9e9e9;
            border-radius: 5px;
            justify-content: space-between;
            margin-bottom: 15px;

            span:nth-child(2) {
                font-style: italic;
            }

            .active {
                color: $co;
            }
        }
    }

    .slids {
        font-size: 12px;
        .el-slider {
            width: 40%;
            margin: 0 20px;
        }
    }

    .liList {
        font-size: 12px;
        color: #333;
        line-height: 30px;

        i {
            display: inline-block;
            margin-right: 15px;
            font-size: 18px;
        }

        li:first-child {
            color: #9c9c9c;
            border-bottom: 1px solid #e9e9e9;

            & ~ li:hover {
                background-color: #eee;
            }
        }

        .active {
            color: $co;
        }
    }

    .popovers {
        padding: 10px;
        font-size: 24px;

        & > div {
            width: 80px;
            height: 60px;
            line-height: 60px;
            border-radius: 10px;
            margin: 0 12px 14px 0;
            text-align: center;
            border: 1px solid #e9e9e9;

            &:nth-child(3n) {
                margin-right: 0;
            }
        }
    }

</style>
