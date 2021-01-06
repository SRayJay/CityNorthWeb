import request from '@utils/request'

export function login(userName, userPassword) {
  return request({
    url: 'user/login',
    method: 'post',
    params: { userName, userPassword }
  })
}

export function register(userName, userPassword) {
  return request({
    url: 'user/register',
    method: 'post',
    params: { userName, userPassword }
  })
}
// export function uploadAvatar(fd){
//   return request({
//     url:'user/space/'+
//   })
// }
