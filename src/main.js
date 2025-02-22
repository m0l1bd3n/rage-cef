import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/global.css';

// Проверяем, работает ли код в Rage MP
const isRageMP = typeof window.mp !== 'undefined' && typeof window.mp.trigger === 'function';

// Создаём объект RPC с заглушкой для разработки
const rpc = {
    call: (method, data) => {
        return new Promise((resolve, reject) => {
            if (isRageMP) {
                // Уникальный ID для отслеживания ответа
                const requestId = Date.now() + Math.random().toString(36).substr(2);
                // Отправляем запрос на клиент Rage MP
                window.mp.trigger('rpc:client:call', requestId, method, JSON.stringify(data));

                // Ожидаем ответа от клиента
                const handler = (id, response) => {
                    if (id === requestId) {
                        resolve(JSON.parse(response));
                        mp.events.remove('rpc:cef:response', handler);
                    }
                };
                mp.events.add('rpc:cef:response', handler);

                // Таймаут на случай, если ответа нет
                setTimeout(() => {
                    reject(new Error(`RPC call "${method}" timed out`));
                    mp.events.remove('rpc:cef:response', handler);
                }, 5000); // 5 секунд
            } else {
                // Заглушка для разработки
                console.warn(`RPC mock: Calling "${method}" with data:`, data);
                resolve({ success: false, message: 'Running outside Rage MP' });
            }
        });
    }
};

const app = createApp(App);
app.config.globalProperties.$rpc = rpc;
app.use(router);
app.mount('#app');