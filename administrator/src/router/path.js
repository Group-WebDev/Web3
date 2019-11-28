import store from '../store'
export default [
  {
    path: '*',
    meta: {
      name: '',
      requiresAuth: true
    },
    redirect: {
      path: '/dashboard'
    }
  },
  // This  allows you to have pages apart of the app but no rendered inside the dash
  {
    path: '/admin/login',
    meta: {
      name: '',
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "routes" */ `@/components/Login.vue`),
    // redirect if already signed in
    beforeEnter: (to, from, next) => {
      if (store.getters.authorized) {
        next('/dashboard')
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        component: () => import(`@/components/Login.vue`)
      }
    ]
  },
  // add any extra routes that you want rendered in the dashboard as a child below. Change toolbar names here
  {
    path: '/dashboard',
    meta: {
      name: 'Dashboard View',
      requiresAuth: true
    },
    component: () => import(`@/views/Dashboard.vue`),
    children: [
      {
        path: '',
        name: 'AddEvent',
        component: () => import(`@/components/AddEvent.vue`)
      },
      {
        path: 'subscriber',
        meta: {
          name: 'Subscriber',
          requiresAuth: true
        },
        component: () => import(`@/components/SubscriberTable.vue`)
      },
      
    ]
  }
]