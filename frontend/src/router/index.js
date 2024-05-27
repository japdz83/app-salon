import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppointmentsLayout from '../views/appointments/AppointmentsLayout.vue'
import AuthAPI from '@/api/AuthAPI'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppointmentsLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'my-appointment',
          component: () => import('../views/appointments/MyAppointmentView.vue')
        },
        {
          path: 'nueva',
          component: () => import('../views/appointments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('../views/appointments/ServicesView.vue')
            },
            {
              path: 'detalles',
              name: 'appointment-details',
              component: () => import('../views/appointments/AppointmentView.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue')
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        },
        {
          path: 'olvide-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordView.vue')
        },
        {
          path: 'olvide-password/:token',
          name: 'new-password',
          component: () => import('../views/auth/NewPasswordView.vue')
        }

      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if (requiresAuth) {
    try {
      const { data } = await AuthAPI.auth()
      console.log(data)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  } else {
    next()
  }
})



export default router
