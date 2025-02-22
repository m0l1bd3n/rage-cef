import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import RPC from 'rage-rpc'; // Импортируем rage-rpc
import './assets/styles/global.css';

// Проверяем, работает ли код в Rage MP
if (typeof window.mp === 'undefined' || typeof window.mp.trigger !== 'function') {
    console.error('This application is designed to run only in Rage MP environment.');
} else {
    // Инициализируем RPC для Rage MP
    const rpc = new RPC();

    const app = createApp(App);
    app.config.globalProperties.$rpc = rpc; // Делаем RPC доступным через $rpc
    app.use(router);
    app.mount('#app');
}