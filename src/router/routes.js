
import store from 'src/store/index'
let Store = new store
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Index.vue'), meta: { title: 'Weather Check'} },
      { path: 'counter', name: 'Counter', component: () => import('pages/Counter.vue'), meta: { title: 'Character Counter' },
        beforeEnter: (to, from, next) => {
        if (Store.state.user.result_show) {
          next()
        }
        else {
          next('/')
        }
      } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
