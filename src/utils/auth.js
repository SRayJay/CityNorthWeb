// import Cookies from 'js-cookie'
/*global Cookies */
const TokenKey = 'chengbei_token'
const UserInfo = 'chengbei_user'
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getUserInfo() {
  return Cookies.getJSON(UserInfo)
}
export function setUserInfo(user) {
  return Cookies.set(UserInfo, user)
}
export function removeUserInfo() {
  return Cookies.remove(UserInfo)
}
