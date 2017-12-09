import axios from 'axios'

export function fetchIndex () {
  return axios.get('/api/index').then(response => Promise.resolve(response.data))
}

export function fetchDaily (objectId) {
  return axios.get('/api/daily/' + objectId ).then(response => Promise.resolve(response.data))
}

export function fetchTest (objectId) {
  return axios.get('http://localhost:8080/CabinetLock/demo/getList').then(response => {
    return Promise.resolve(response.data)
  }).catch(e => console.error("____error:" + e))
  
}