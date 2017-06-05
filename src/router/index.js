import Vue from 'vue'
import Router from 'vue-router'
import Memo from '@/pages/Memo'
import House from '@/pages/HouseholdAccountBook'
import MineCraft from '@/pages/MineCraft'
import KPT from '@/pages/KPT'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Memo',
      component: Memo
    },
    {
      path: '/minecraft',
      name: 'MineCraft',
      component: MineCraft
    },
    {
      path: '/house',
      name: 'HouseholdAccountBook',
      component: House
    },
    {
      path: '/kpt',
      name: 'KPT',
      component: KPT
    }
  ]
})
