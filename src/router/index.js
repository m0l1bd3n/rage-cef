import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    { path: '/', component: () => import('@/views/Intro.vue') },
    { path: '/sign-up', component: () => import('@/views/SignUp.vue') },
    { path: '/login', component: () => import('@/views/Login.vue') },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;