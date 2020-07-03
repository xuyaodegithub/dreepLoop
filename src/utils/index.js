export const toRouter = (url) => {
    let urls = window.location.href.split( '#/' )[0]
    let urlss = urls.substring( 0, urls.lastIndexOf( '/' ) )
    window.location.href = urlss + '/' + url + '.html'
}
export const basrUrls = () => {
    let urls = window.location.href.split( '#/' )[0]
    let baseUrl = urls.substring( 0, urls.lastIndexOf( '/' ) )
    return baseUrl
}
export const myBrowser = () => {//判断浏览器类型
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf( "Opera" ) > -1) return "Opera"; //判断是否Opera浏览器
    if (userAgent.indexOf( "Firefox" ) > -1) return "FF";//判断是否Firefox浏览器
    if (userAgent.indexOf( "Chrome" ) > -1 && userAgent.indexOf( "Edge" ) < 0 && userAgent.indexOf( "QQBrowser" ) < 0) return "Chrome";//谷歌
    if (userAgent.indexOf( "Safari" ) > -1 && userAgent.indexOf( "Edge" ) < 0 && userAgent.indexOf( "QQBrowser" ) < 0) return "Safari"; //判断是否Safari浏览器
    if (userAgent.indexOf( "compatible" ) > -1 && userAgent.indexOf( "MSIE" ) > -1 && userAgent.indexOf( "Opera" ) < 0) return "IE"; //判断是否IE浏览器
    if (userAgent.indexOf( "Edge" ) > -1) return "Edge"; //判断是否Edge浏览器
    if (userAgent.indexOf( "QQBrowser" ) > -1) return "QQ"; //判断是否QQ浏览器
    else return 'IE'//不认识一律ie处理
}
export const BrowserInfo = {//目前主要支持 安卓 & 苹果 & ipad & 微信 & 支付宝 & 是否是手机端。
    isAndroid: Boolean( navigator.userAgent.match( /android/ig ) ),
    isIphone: Boolean( navigator.userAgent.match( /iphone|ipod/ig ) ),
    isIpad: Boolean( navigator.userAgent.match( /ipad/ig ) ),
    isWeixin: Boolean( navigator.userAgent.match( /MicroMessenger/ig ) ),
    isAli: Boolean( navigator.userAgent.match( /AlipayClient/ig ) ),
    isPhone: Boolean( /(iPhone|iPad|iPod|iOS|Android)/i.test( navigator.userAgent ) ),
    isMac: /macintosh|mac os x/i.test( navigator.userAgent ),
    isWindows: /windows|win32/i.test( navigator.userAgent )
}
//获取某一区间随机数
export const getrandom = (min, max) => {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

//深拷贝
export function shenCopy(obj) {
    var newObj = obj instanceof Array ? [] : {}
    for (var p in obj) {
        if (obj.hasOwnProperty( p )) {//hasOwnProperty  方法是去除其原型上的属性，只复制对象上的属性
            newObj[p] = typeof obj[p] === 'object' ? shenCopy( obj[p] ) : obj[p]
        }
    }
    return newObj
}

export function deepCopy(obj) {
    var result = Array.isArray( obj ) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty( key )) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = deepCopy( obj[key] );   //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

//requestAnimationFrame兼容写法
(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz', 'ms', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max( 0, 16.7 - (currTime - lastTime) );
            var id = window.setTimeout( function () {
                callback( currTime + timeToCall );
            }, timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout( id );
        };
    }
}());
//倒计时方法
export const overTime = (val, num) => {
    if (val < 0) {
        return {
            hours: 0,
            mint: 0,
            sec: 0
        }
    }
    let day = Math.floor( val / 1000 / 60 / 60 / 24 )
    let hoursD = Math.floor( val / 1000 / 60 / 60 % 24 )
    let hours = Math.floor( val / 1000 / 60 / 60 )
    let mint = Math.floor( val / 1000 / 60 % 60 )
    let sec = Math.floor( val / 1000 % 60 )
    if (day < 10) day = '0' + day
    if (hoursD < 10) hoursD = '0' + hoursD
    if (hours < 10) hours = '0' + hours
    if (mint < 10) mint = '0' + mint
    if (sec < 10) sec = '0' + sec
    return {
        day: day,
        hoursD: hoursD,
        mint: mint,
        sec: sec
    }
}
//canvas画文本自动换行原型方法
export const setCanvasText = () => {
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
            lineHeight = (canvas && parseInt( window.getComputedStyle( canvas ).lineHeight )) || parseInt( window.getComputedStyle( document.body ).lineHeight );
        }
        // 字符分隔为数组
        var arrText = text.split( '' );
        var line = '';
        for (var n = 0; n < arrText.length; n++) {
            var testLine = line + arrText[n];
            var metrics = context.measureText( testLine );
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText( line, x, y );
                line = arrText[n];
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText( line, x, y );
    };
}
//判断类型
export const JudgmentType = (val) => {
    return Object.prototype.toString.call( val ).split( ' ' )[1].split( ']' )[0]
}
//两数组的交集
export const intersection = (a, b) => {
    const s = new Set( b );
    return a.filter( x => s.has( x ) );
};
//生成两数之间指定长度的随机数组
export const randomIntArrayInRange = (min, max, n = 1) =>
    Array.from( {length: n}, () => Math.floor( Math.random() * (max - min + 1) ) + min );

// randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]
//每个单词首字母大写
export const capitalizeEveryWord = str => str.replace( /\b[a-z]/g, char => char.toUpperCase() );
//获取上月今天的日期
export const getlastDate = () => {
    let nowData = new Date();
    const [nowY, nowM, nowD] = [nowData.getFullYear(), nowData.getMonth() + 1, nowData.getDate()];//当前日期年月日
    nowData.setDate( 1 );//本月1号时间戳
    const nowOne = nowData.getTime();
    const lastY = nowM - 1 > 0 ? nowY : nowY - 1;//上月年份
    const lastM = nowM - 1 > 0 ? nowM - 1 : 12;//上月月份
    nowData.setFullYear( lastY );
    nowData.setMonth( lastM - 1 );
    const lastOne = nowData.getTime()//上月一号时间戳
    const days = Math.floor( (nowOne - lastOne) / (1000 * 60 * 60 * 24) );
    console.log( days );
    if (days >= nowD) return lastY + '-' + lastM + '-' + nowD;
    else return lastY + '-' + lastM + '-' + days;
}
//节流函数
export const throttle = (func, wait) => {
    var previous = 0;
    return function () {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply( context, args );
            previous = now;
        }
    }
}
//防抖函数
export const debounce = (func, wait, immediate) => {// wait 延迟执行毫秒数, immediate true 表立即执行，false 表非立即执行
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout( timeout );
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout( () => {
                timeout = null;
            }, wait )
            if (callNow) func.apply( context, args )
        } else {
            timeout = setTimeout( () => {
                func.apply( context, args )
            }, wait );
        }
    }
}
export const flat = (arr) => {//数组降维
    let result = []
    for (const item of arr) {
        item instanceof Array ? result = result.concat( flat( item ) ) : result.push( item )
    }
    return result
}
export const findLastIdx = (list, is, fun) => {//寻找数组中最后出现的对象，list整个数组，i从i位置往前找第一个
    const arr = JSON.parse( JSON.stringify( list ) ), len = list.length > is ? is : list.length - 1;
    for (let i = len - 1; i > -1; i--) {
        if (fun( arr[i], i )) return i;
    }
}
export const initSmallTag = (e, txt) => {//点击小动画
    let $i = $( '<span></span>' ).text( txt ), y = e.clientY - 30, x = e.clientX - 10;
    $i.css( {
        "z-index": 999,
        "top": y,
        "left": x,
        'fontSize': '14px',
        "position": "fixed",
        "color": "rgb(" + (255 * Math.random()) + "," + (255 * Math.random()) + "," + (255 * Math.random()) + ")"
    } );
    $( "body" ).append( $i );
    $i.animate( {
            "top": y - 80,
            "opacity": 0,
        },
        1500,
        function () {
            $i.remove();
        } );
}
export const compressImg = (files, k) => {
    return new Promise( (resolve, reject) => {
        let [can, reader] = [document.createElement( 'canvas' ), new FileReader()];
        let canTxt = can.getContext( '2d' );
        if (!k) {
            reader.readAsDataURL( files );
            reader.onloadend = (e) => {
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    can.width = oImg.width > oImg.height ? (oImg.width > 1024 ? 1024 : oImg.width) : (oImg.height > 1024 ? oImg.width * 1024 / oImg.height : oImg.width);
                    can.height = oImg.width > oImg.height ? (oImg.width > 1024 ? 1024 * oImg.height / oImg.width : oImg.height) : (oImg.height > 1024 ? 1024 : oImg.height);
                    canTxt.drawImage( oImg, 0, 0, can.width, can.height )
                    can.toBlob( (blob) => {
                        resolve( blob )
                    } )
                };
                oImg.src = reader.result;
            }
            reader.onerror = (err) => {
                reject( err )
            }
        } else {
            let oImg = new Image();
            oImg.crossOrigin = '';
            oImg.onload = () => {
                can.width = oImg.width > oImg.height ? (oImg.width > 1024 ? 1024 : oImg.width) : (oImg.height > 1024 ? oImg.width * 1024 / oImg.height : oImg.width);
                can.height = oImg.width > oImg.height ? (oImg.width > 1024 ? 1024 * oImg.height / oImg.width : oImg.height) : (oImg.height > 1024 ? 1024 : oImg.height);
                canTxt.drawImage( oImg, 0, 0, can.width, can.height )
                can.toBlob( (blob) => {
                    resolve( blob )
                } )
            };
            oImg.src = files + `?id=${Math.random()}`;
            oImg.onerror = (err) => {
                reject( err )
            }
        }
    } )
}
export const getTanDeg = (tan) => {//根据正切值返回角度
    let result = Math.acos( tan ) / (Math.PI / 180);
    result = Math.round( result );
    return result;
}
export const setRad=(angle)=>{//根据角度返回弧度
    return angle*Math.PI/180;
}
export const colorRgb=(colors)=>{//16进制转rgb
    // 16进制颜色值的正则
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写
    var color = colors.toLowerCase();
    if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
            var colorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        var colorChange = [];
        for (var i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return colorChange;
    } else {
        return color;
    }
}
