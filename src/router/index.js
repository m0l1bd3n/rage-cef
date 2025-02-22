import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    { path: '/', component: () => import('@/views/InventoryView.vue') },
    { path: '/sign-up', component: () => import('@/views/SignUpView.vue') },
    { path: '/login', component: () => import('@/views/LoginView.vue') },
    { path: '/inventory', component: () => import('@/views/InventoryView.vue') },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;