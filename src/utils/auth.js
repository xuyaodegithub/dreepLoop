const TokenKey = 'user_Token'

export function getToken() {
  return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  // var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);//设置小于一天的时间
  // Cookies.set('foo', 'bar', {
  //   expires: inFifteenMinutes//不设置默认会话式储存，游览器关闭就删除
  // });
  return window.localStorage.setItem(TokenKey,token)
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}
