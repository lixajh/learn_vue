import axios from 'axios'
var server_url="http://192.168.1.108:8004/"
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