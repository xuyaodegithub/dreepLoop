export const toRouter=(url)=>{
    let urls = window.location.href.split('#/')[0]
    let urlss = urls.substring(0,urls.lastIndexOf('/'))
    window.location.href=urlss+'/'+ url + '.html'
}
export const basrUrls=()=>{
    let urls = window.location.href.split('#/')[0]
    let baseUrl = urls.substring(0,urls.lastIndexOf('/'))
    return baseUrl
}
export const myBrowser=()=>{//判断浏览器类型
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf("Opera") > -1) return "Opera"; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1)  return "FF";//判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Edge") <0 && userAgent.indexOf("QQBrowser") <0) return "Chrome";//谷歌
    if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Edge") <0 && userAgent.indexOf("QQBrowser") <0) return "Safari"; //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && userAgent.indexOf("Opera") < 0) return "IE"; //判断是否IE浏览器
    if (userAgent.indexOf("Edge") > -1) return "Edge"; //判断是否Edge浏览器
    if (userAgent.indexOf("QQBrowser") > -1) return "QQ"; //判断是否QQ浏览器
    else return 'IE'//不认识一律ie处理
}
export const BrowserInfo = {//目前主要支持 安卓 & 苹果 & ipad & 微信 & 支付宝 & 是否是手机端。
    isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
    isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
    isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
    isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
    isAli: Boolean(navigator.userAgent.match(/AlipayClient/ig)),
    isPhone: Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent))
}
//获取某一区间随机数
export const getrandom=(min, max)=> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//深拷贝
export function shenCopy(obj){
    var newObj = obj instanceof Array?[]:{}
    for(var p in obj){
        if(obj.hasOwnProperty(p)){//hasOwnProperty  方法是去除其原型上的属性，只复制对象上的属性
            newObj[p] = typeof obj[p] === 'object'?shenCopy(obj[p]):obj[p]
        }
    }
    return newObj
}

export function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key]!==null) {
                result[key] = deepCopy(obj[key]);   //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

//requestAnimationFrame兼容写法
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz', 'ms', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
//倒计时方法
export const overTime=(val,num) =>{
    if(val<0){
        return {
            hours: 0,
            mint: 0,
            sec: 0
        }
    }
    let day = Math.floor(val / 1000 / 60 / 60/24)
    let hoursD = Math.floor(val / 1000 / 60 / 60 % 24)
    let hours = Math.floor(val / 1000 / 60 / 60)
    let mint = Math.floor(val / 1000 / 60 % 60)
    let sec = Math.floor(val / 1000 % 60)
    if (day < 10) day = '0' + day
    if (hoursD < 10) hoursD = '0' + hoursD
    if (hours < 10) hours = '0' + hours
    if (mint < 10) mint = '0' + mint
    if (sec < 10) sec = '0' + sec
        return {
            day:day,
            hoursD: hoursD,
            mint: mint,
            sec: sec
        }
}
//canvas画文本自动换行原型方法
export const setCanvasText=()=>{
    CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
        if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
            return;
        }
        var context = this;
        var canvas = context.canvas;
        if (typeof maxWidth == 'undefined') {
            maxWidth = (canvas && canvas.width) || 300;
        }
        if (typeof lineHeight == 'undefined') {
            lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight);
        }
        // 字符分隔为数组
        var arrText = text.split('');
        var line = '';
        for (var n = 0; n < arrText.length; n++) {
            var testLine = line + arrText[n];
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = arrText[n];
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    };
}
//判断类型
export const JudgmentType=(val)=>{
  return Object.prototype.toString.call(val).split(' ')[1].split(']')[0]
}
//两数组的交集
export const intersection = (a, b) => {
    const s = new Set(b);
    return a.filter(x => s.has(x));
};
//生成两数之间指定长度的随机数组
export const randomIntArrayInRange = (min, max, n = 1) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);

// randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]
//每个单词首字母大写
export const capitalizeEveryWord  = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
//获取上月今天的日期
export const getlastDate=()=>{
    let nowData=new Date();
    const [nowY,nowM,nowD]=[nowData.getFullYear(),nowData.getMonth()+1,nowData.getDate()];//当前日期年月日
    nowData.setDate(1);//本月1号时间戳
    const nowOne=nowData.getTime();
    const lastY= nowM-1 > 0 ? nowY : nowY-1;//上月年份
    const lastM=nowM-1 > 0 ? nowM-1 : 12;//上月月份
    nowData.setFullYear(lastY);
    nowData.setMonth(lastM-1);
    const lastOne=nowData.getTime()//上月一号时间戳
    const days=Math.floor((nowOne-lastOne) / (1000*60*60*24));
    console.log(days);
    if(days>=nowD) return lastY+'-'+lastM+'-'+nowD;
    else return lastY+'-'+lastM+'-'+days;
}
//节流函数
export const throttle=(func, wait) =>{
    var previous = 0;
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
//防抖函数
export const debounce=(func,wait,immediate) =>{// wait 延迟执行毫秒数, immediate true 表立即执行，false 表非立即执行
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait);
        }
    }
}
