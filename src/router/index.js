import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Memo from '@/pages/Memo'
import House from '@/pages/HouseholdAccountBook'
import Health from '@/pages/Health'
import KPT from '@/pages/KPT'
import VideoPlayer from '@/pages/VideoPlayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/memo',
      name: 'Memo',
      component: Memo
    },
    {
      path: '/health',
      name: 'Health',
      component: Health
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
    },
    {
      path: '/video-player',
      name: 'VideoPlayer',
      component: VideoPlayer
    }
  ]
})
