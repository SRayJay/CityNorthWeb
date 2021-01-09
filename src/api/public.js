import request from '@utils/request'
export function getIndex() {
  return request({
    url: 'user/index',
    method: 'post',
    headers: {
      'token': $store.state.user.token
    }
  })
}
