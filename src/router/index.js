import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../components/Welcome.vue'
import AcceptChallenge from '../components/AcceptChallenge.vue'
import CompleteChallenge from '../components/CompleteChallenge.vue'
import Interview from '../components/Interview.vue'

const routes = [
  {
    path: '/',
    redirect: '/welcome' 
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
  },
{
    path: '/accept-challenge',
    name: 'AcceptChallenge',
    component: AcceptChallenge,
  },
{
    path: '/complete-challenge',
    name: 'CompleteChallenge',
    component: CompleteChallenge,
  },
  {
    path: '/interview',
    name: 'Interview',
    component: Interview,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router