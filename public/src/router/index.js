import Vue from 'vue'
import Router from 'vue-router'
import List from '../pages/List.vue'
import Content from '../pages/Content.vue'
import Calendar from '../pages/Calendar.vue'
import ContentManage from '../pages/ContentManage.vue'

Vue.use(Router)

export function createRouter () {
  return new Router ({
    mode: 'history',
    linkActiveClass: 'current',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/d/:day', name: 'list', component: Content },
      { path: '/calendar', name: 'calendar', component: Calendar },
      { path: '/contentmanage', name: 'contentmanage', component: ContentManage },
      { path: '*', redirect: '/d/today' }
    ]
  })
}
