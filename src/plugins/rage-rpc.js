import RPC from 'rage-rpc';

// Проверяем наличие mp в глобальной области видимости
const isRageMP = typeof window.mp !== 'undefined' && typeof window.mp.trigger === 'function';

// Инициализируем RPC только если мы в Rage MP, иначе используем заглушку
const rpc = isRageMP ? new RPC() : {
    call: (method, data) => {
        console.warn(`Rage RPC mock: Calling "${method}" with data:`, data);
        return Promise.resolve({ success: false, message: 'Rage RPC is not available in this environment' });
    },
    register: () => {
        console.warn('Rage RPC mock: Register is not supported in this environment');
    }
};

export default rpc;