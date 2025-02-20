import { createRouter, createWebHashHistory } from 'vue-router'; // Импортируем createWebHashHistory
import Intro from '@/views/Intro.vue';

const routes = [
    { path: '/', component: Intro }
];

const router = createRouter({
    history: createWebHashHistory(), // Используем hash mode
    routes,
});

export default router;