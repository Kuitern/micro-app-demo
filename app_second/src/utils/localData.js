const tokenKey = 'accessToken'

// sessionStorage 存储
function setSessionStorage (key, value) {
  return sessionStorage.setItem(key, value)
}
function getSessionStorage (key, parseFlag = false) {
  const value = sessionStorage.getItem(key)
  if (parseFlag) {
    return JSON.parse(value)
  }
  return value
}
function removeSessionStorage (key) {
  return sessionStorage.removeItem(key)
}

// token 相关操作
export function getToken () {
  return getSessionStorage(tokenKey)
}
export function setToken (token) {
  return setSessionStorage(tokenKey, token)
}
export function removeToken () {
  return removeSessionStorage(tokenKey)
}
