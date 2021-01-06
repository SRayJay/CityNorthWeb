
export function isExternal(path) {
  return /^(http?:|mailto:|tel:)/.test(path)
}

// export function validUsername(str) {
//   const valid_map = ['admin', 'editor']
//   return valid_map.indexOf(str.trim()) >= 0
// }

export function isNameOver10(str) {
  return str.length > 10
}
export function isNameHasSpecialChar(str) {
  const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
  return pattern.test(str)
}
export function isPwdOver15(str) {
  return str.length > 15
}
export function isPwdLess6(str) {
  return str.length < 6
}
export function isPwdTwoKinds(str) {
  const pattern = new RegExp('/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,15}$/')
  return !pattern.test(str)
}
export function isTwoPwdSame(str1, str2) {
  return str1 !== str2
}
