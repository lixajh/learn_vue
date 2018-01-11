import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

const router = createRouter()
const store = createStore()

document.getElementById("index_load").innerHTML="loaded";ss
alert("aab"+document.getElementById("index_load").innerHTML);
document.getElementById("index_load").style.display="none";

Vue.use(ElementUI)

const app = new Vue({
  store,
  router,
  render: h => h(App)
})

app.$mount('#app')