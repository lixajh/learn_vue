import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
// import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: { 
      day     : [],
      today   : null,
      dailys  : {/* [id: number]: Item */},
      calendar: null,   
      date:'2017-12-10',                      /* {} */
      songs:[      
          {
            title: '2015-01-01',
            author: '陶杰',      
            url: 'http://198.46.248.122:8888/2015-01-01.mp3', 
            pic: 'https://cn.vuejs.org/images/logo.png'
          } 
        ]
      
      
    },
    actions,
    mutations
  })
}