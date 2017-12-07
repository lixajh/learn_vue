const AV = require('../bootstrap');
const load = require('./load');


// var ENTRIES = AV.Object.extend('ENTRIES');

// var testObject = new TestObject();
// var query = new AV.Query('TestObject');

// 第一个参数是 className，第二个参数是 objectId

const URL_PERFIX = 'http://blog.fanfou.com/digest/json/';
const URL_SURFIX = '.json';

const ENTRIES_URL = URL_PERFIX + 'index' + URL_SURFIX;
let dataAll = Object.create(null)

function delay(t) {
  return new Promise(resolve => setTimeout(resolve, t));
}

// let array = ['2017-05-19.daily', '2017-05-18.daily', '2017-05-17.daily'];
// ,'2017-05-16.daily', '2017-05-15.daily', '2017-05-14.daily','2017-05-13.daily', '2017-05-12.daily', '2017-05-11.daily'

// 1.
// load all url from 'http://blog.fanfou.com/digest/json/index.json'
// JSON.parse(string) => json
// format [..., './json/2017-05-16.daily.json', './json/2017-05-15.weekly.json', ...]
// to [..., '2017-05-16.daily', '2017-05-15.weekly', ...]
function loadAllURls() {
  return load(ENTRIES_URL)
    .then(
      data => JSON.parse(data)
    )
    .then(
      entries => entries.map(entry => entry.replace(/^\.\/json\/|\.json$/ig, ''))
    )
    .then(
      entries => entries.filter(e => e.indexOf('daily') > 0)
    )
    // .then(entries => {
    //   entries.map(function(n){  
    //     console.log(n.indexOf('2017-12-06'))
    //  });
    // })
    // .then(
    //   entries => {
    //     return entries.filter(e => e.indexOf('2016') >= 0)
    // }
    // )
}

function save_entry (key, value) {
  
  return new Promise((resolve, rejcet) => {
    let ENTRY = AV.Object.extend('ENTRY');
    let entry = new ENTRY()
    entry.set(key, value)
    entry.save().then(obj => resolve(obj.id)).catch(err => reject(err))
  })
}

function AV_query_promise(class_name, object_id,data) {
  return new Promise((resolve, reject) => {
    let query = new AV.Query(class_name);
    query.greaterThanOrEqualTo('date', '2013-12-06')
    query.find()
    .then(obj => resolve(obj)).catch(err => reject(data))
  })
}

function save_entry_index (value) {
  let ENTRIES = AV.Object.createWithoutData('ENTRIES', '5a2801ba2f301e00631bb1b4');

  console.log("__________________" + JSON.stringify(dataAll))
  ENTRIES.set('entries', JSON.stringify(dataAll))
  ENTRIES.save().catch(
   error => console.error("______________" + error)
  )
  console.log('__________________save at: ' + (new Date()).toLocaleString());
}

function fetchURLsDetail(URLs) {
  var count = 0 
  return URLs.reduceRight((promise, url) => {
    return promise.then(() => delay(1 * 1000).then(() => {
        console.log(++count)
        return load(URL_PERFIX + url + URL_SURFIX).then(data => save_entry('entry', data).then(id => {
          console.log(url + ': ' + id)
          dataAll[url] = id
        }))
    }))
  }, Promise.resolve())
}

function SAVE_TO_LEANCLOUD () {
  console.log("aaaa")
  loadAllURls()
  .then(
    data => {
    return AV_query_promise('ENTRIES', '5a2801ba2f301e00631bb1b4',data).then(obj => {
      // dataAll = obj.get('entries'));
      let exists = obj;
      return data.filter(d => !exists.includes(d))
    })
  })
  .then(n => {
    if (!n.length) { 
      console.log('Nothing new!'); 
      return 
    }
    fetchURLsDetail(n).then(urls_obj => save_entry_index(urls_obj))
  })
  // .catch(n => {
  //   if (!n.length) { 
  //     console.log('Nothing new!'); 
  //     return 
  //   }
  //   fetchURLsDetail(n).then(urls_obj => save_entry_index(urls_obj))
  // })
  
}

module.exports = SAVE_TO_LEANCLOUD;
//.then(entry_urls => fetchURLsDetail(entry_urls).then(urls_obj => save_entry_index(urls_obj)))