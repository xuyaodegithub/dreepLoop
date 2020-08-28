// import state from "../store/state";
import axios from "axios";

const filters = {
    changeTime(val, num) {
        if (val) {
            let data = new Date( val );
            let year = data.getFullYear();
            let month = data.getMonth() + 1;
            let day = data.getDate();
            let hour = data.getHours();
            let min = data.getMinutes();
            let sec = data.getSeconds();
            if (month.length < 2) month = "0" + month;
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            if (hour < 10) hour = "0" + hour;
            if (min < 10) min = "0" + min;
            if (sec < 10) sec = "0" + sec;
            if (num)
                return (
                    year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
                );
            else return year + "-" + month + "-" + day;
        } else return "";
    },
    Calculation(val, k) {
        let price = val.price;
        let creditsPerMonth = val.num;
        return k === 12
            ? ((price / creditsPerMonth) * 0.9).toFixed( 3 )
            : (price / creditsPerMonth).toFixed( 3 );
    },
    imgtitle(i) {
        //图片title
        if (i === 0) return "背景透明";
        else if (i === 1) return "纯色背景";
        else if (i === 2) return "背景黑白";
        else if (i === 3) return "背景模糊";
    },
    getLastMonth() {
        var now = new Date();
        var year = now.getFullYear(); //getYear()+1900=getFullYear()
        var month = now.getMonth() + 1; //0-11表示1-12月
        var day = now.getDate();
        var dateObj = {};
        if (parseInt( month ) < 10) {
            month = "0" + month;
        }
        if (parseInt( day ) < 10) {
            day = "0" + day;
        }

        dateObj.now = year + "-" + month + "-" + day;

        if (parseInt( month ) == 1) {
            //如果是1月份，则取上一年的12月份
            dateObj.last = parseInt( year ) - 1 + "-12-" + day;
            return dateObj;
        }

        var preSize = new Date( year, parseInt( month ) - 1, 0 ).getDate(); //上月总天数
        if (preSize < parseInt( day )) {
            //上月总天数<本月日期，比如3月的30日，在2月中没有30
            dateObj.last = year + "-" + month + "-01";
            return dateObj;
        }

        if (parseInt( month ) <= 10) {
            dateObj.last = year + "-0" + (parseInt( month ) - 1) + "-" + day;
            return dateObj;
        } else {
            dateObj.last = year + "-" + (parseInt( month ) - 1) + "-" + day;
            return dateObj;
        }
    },
    reduceDimension(arr) {
        //数组降维//
        let ret = [];
        let toArr = function (arr) {
            arr.forEach( function (item) {
                item instanceof Array ? toArr( item ) : ret.push( item );
            } );
        };

        toArr( arr );

        return ret;
    },
    minsfilter(s){
        const n=s ? s : 0;
        const sec=Math.floor(n/60),min=n % 60;
        return `${sec}分${min}秒`
    }
    // saveActions(funUrl){
    //   axios({
    //     method: 'post',
    //     url:funUrl.url,
    //     dataType: 'JSON',
    //     data: funUrl.data
    //   }).then(function(res){
    //     // if(res.data.code==10000){
    //       // context.commit(funUrl[1],res)
    //       funUrl.callback(res)
    //     // }else{
    //     //   Toast({message: res.data.message, duration: 1500})
    //     // }
    //   }).catch(function(err){
    //     console.log(err)
    //   })
    // },
};
export default filters;
