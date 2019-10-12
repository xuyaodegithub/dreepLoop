const [TokenKey,imgsKey,imgsKey2,userAccount] = ['user_Token','secImgs','objectImgs','userAccount'];
// const imgsKey='secImgs';
// const imgsKey2='objectImgs';
// const userAccount='userAccount';

export const getAccount=()=>{
  return JSON.parse(window.localStorage.getItem(userAccount))
}
export const setAccount=(data)=>{
  console.log(userAccount)
  return window.localStorage.setItem(userAccount,JSON.stringify(data))
}
export const reAccount=()=>{
  return window.localStorage.removeItem(userAccount)
}

export function getToken() {
  // return window.localStorage.getItem(TokenKey)
  return window.sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  // var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);//设置小于一天的时间
  // Cookies.set('foo', 'bar', {
  //   expires: inFifteenMinutes//不设置默认会话式储存，游览器关闭就删除
  // });
  // return window.localStorage.setItem(TokenKey,token)
  return window.sessionStorage.setItem(TokenKey,token)
}

export function removeToken() {
  // return window.localStorage.removeItem(TokenKey)
  return window.sessionStorage.removeItem(TokenKey)
}
export const setCookie = (name, cvalue, clearDay = 3650) => {
  const d = new Date();
  d.setTime(d.getTime() + Number(clearDay) * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  const value = encodeURI(cvalue);
  document.cookie = name + '=' + value + ';' + expires;
};

export const getCookie = name => {
  const cname = name + '=';
  var carr = document.cookie.split(';');
  for (let i = 0; i < carr.length; i++) {
    let cvalue = carr[i];
    while (cvalue.charAt(0) === ' ') cvalue = cvalue.substring(1);
    if (cvalue.indexOf(cname) !== -1) {
      return decodeURI(cvalue.substring(cname.length, cvalue.length));
    }
  }
};

export const clearCookie = name => {
  setCookie(name, '', -1);
};

export function getSecImgs(k) {
  const a= k===1 ? imgsKey : imgsKey2;
  return window.sessionStorage.getItem(a)
}
export function setSecImgs(imgs,k) {
  const a= k===1 ? imgsKey : imgsKey2;
  return window.sessionStorage.setItem(a,imgs)
}
export function removeSecImgs(imgs,k) {
  const a= k===1 ? imgsKey : imgsKey2;
  return window.sessionStorage.removeItem(a,imgs)
}
