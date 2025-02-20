import { createRouter, createWebHashHistory } from 'vue-router'; // Импортируем createWebHashHistory
import Intro from '@/views/Intro.vue';
import SignUp from '@/views/SignUp.vue';
import Login from '@/views/Login.vue';

const routes = [
    { path: '/', component: Intro },
    { path: '/sign-up', component: SignUp },
    { path: '/login', component: Login },
];

const router = createRouter({
    history: createWebHashHistory(), // Используем hash mode
    routes,
});

export default router;