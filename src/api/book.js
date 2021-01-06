import request from '@utils/request'

export function getBookInfo(bookid) {
  return request({
    url: '/book/' + bookid,
    method: 'post'
    // params: bookid
  })
}
export function getReviewContent(reviewid) {
  return request({
    url: '/review/' + reviewid,
    method: 'post'
  })
}
