import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Search'
import Contact from '@/components/pages/Contact'
import About from '@/components/pages/About'
import Legal from '@/components/pages/Legal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Home
    },
    {
      path: '/contacto',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/nosotros',
      name: 'About',
      component: About
    },
    {
      path: '/terminosycondiciones',
      name: 'Legal',
      component: Legal
    }
  ]
})
