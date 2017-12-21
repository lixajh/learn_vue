import axios from 'axios'
import Qs from 'qs'
var server_url="http://192.168.1.37:8004/"
export function fetchIndex () {
  return axios.get('/api/index').then(response => Promise.resolve(response.data))
}

export function fetchDaily (objectId) {
  return axios.get('/api/daily/' + objectId ).then(response => Promise.resolve(response.data))
}

export function fetchTest (objectId) {
  return axios.get(server_url + 'demo/getList').then(response => {
    return Promise.resolve(response.data)
  }).catch(e => console.error("____error:" + e))
  
}

export function fetchContent (objectId) {
  return axios.get(server_url + 'demo/getDateRecord?date=' + objectId).then(response => {
    return Promise.resolve(response.data)
  }).catch(e => console.error("____error:" + e))
  
}

export function fetchNews (mdate) {
  let data = Qs.stringify({date:mdate})
  return axios({
    method:"post",
    headers : {
      "Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'
  },
    url:server_url + 'news/detail',
    data:data,
    
    // headers:{'Content-Type':'application/x-www-form-urlencoded'}  
  }).then(response => {
    return Promise.resolve(response.data)
  }).catch(e => console.error("____error:" + e))
}