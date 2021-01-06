import request from '@utils/request'

export function publishReview() {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: [function(data) {
      data = JSON.stringify(data)
      return data
    }],
    url: 'write/review',
    method: 'post'
    // data: { review }
  })
}
