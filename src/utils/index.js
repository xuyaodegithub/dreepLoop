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
