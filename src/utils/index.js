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
    if ((this.data.productType == 4 && num == 1) || (this.data.productType == 4 && num == 5)){
        return {
            day:day,
            hoursD: hoursD,
            mint: mint,
            sec: sec
        }
    }else{
        return {
            hours: hours,
            mint: mint,
            sec: sec
        }
    }
}
